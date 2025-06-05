import Link from '../models/linkModel.js';
import Visit from '../models/visitModel.js';
import geoip from 'geoip-lite';
import { nanoid } from 'nanoid';
import useragent from 'useragent';

// Create tracking link
export const createLink = async (req, res) => {
  try {
    const randomId = nanoid(60);
    const newLink = new Link({ linkId: randomId });
    await newLink.save();
    res.json({ trackingLink: `https://tracker-app-eung.onrender.com/track/${randomId}` });
  } catch (err) {
    res.status(500).json({ error: 'Could not create link' });
  }
};

// Serve tracking page with geolocation request
export const trackVisit = async (req, res) => {
  const { linkId } = req.params;
  res.send(`
    <html>
      <body>
        <h2>Your visit is being tracked...</h2>
        <script>
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              await fetch('/api/track-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  linkId: "${linkId}",
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  userAgent: navigator.userAgent
                })
              });
            });
          } else {
            console.log('Geolocation not supported');
          }
        </script>
      </body>
    </html>
  `);
};

// Receive exact location and save visit
export const trackExactLocation = async (req, res) => {
  try {
    const { linkId, latitude, longitude, userAgent } = req.body;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.includes(',')) ip = ip.split(',')[0];
    if (ip === '::1' || ip === '127.0.0.1') ip = '8.8.8.8';

    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const agent = useragent.parse(userAgent);
    const deviceName = `${agent.family} ${agent.os.family}`;

    const visit = new Visit({
      linkId,
      ip,
      location: { latitude, longitude },
      mapsLink,
      userAgent,
      deviceName
    });

    await visit.save();
    res.json({ message: 'Exact location tracked' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to track location' });
  }
};
