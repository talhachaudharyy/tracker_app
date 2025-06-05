import Link from '../models/linkModel.js';
import Visit from '../models/visitModel.js';
import { nanoid } from 'nanoid';
import useragent from 'useragent';

// Create tracking link
export const createLink = async (req, res) => {
  const randomId = nanoid(60);
  const newLink = new Link({ linkId: randomId });
  await newLink.save();
  res.json({ trackingLink: `http://localhost:5000/api/track/${randomId}` });
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
              await fetch('http://localhost:5000/api/save-location', {
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

// Save exact lat/lng visit
export const saveLocation = async (req, res) => {
  try {
    const { linkId, latitude, longitude, userAgent } = req.body;
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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
    res.json({ message: 'Exact location saved', mapsLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save location' });
  }
};
