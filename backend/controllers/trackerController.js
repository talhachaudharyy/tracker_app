import Link from '../models/linkModel.js';
import Visit from '../models/visitModel.js';
import geoip from 'geoip-lite';
import { nanoid } from 'nanoid';
import useragent from 'useragent';

export const createLink = async (req, res) => {
  try {
    const randomId = nanoid(60); // 60-char long random link
    const newLink = new Link({ linkId: randomId });
    await newLink.save();
    res.json({ trackingLink: `https://tracker-app-eung.onrender.com/track/${randomId}` });
  } catch (err) {
    res.status(500).json({ error: 'Could not create link' });
  }
};

export const trackVisit = async (req, res) => {
  try {
    const { linkId } = req.params;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.includes(',')) ip = ip.split(',')[0];
    if (ip === '::1' || ip === '127.0.0.1') ip = '8.8.8.8'; // fallback for localhost testing

    const geo = geoip.lookup(ip) || {};
    const mapsLink = geo.ll ? `https://www.google.com/maps?q=${geo.ll[0]},${geo.ll[1]}` : 'Not Available';

    const agent = useragent.parse(req.headers['user-agent']);
    const deviceName = `${agent.family} ${agent.os.family}`;

    const visit = new Visit({
      linkId,
      ip,
      location: geo,
      mapsLink,
      userAgent: req.headers['user-agent'],
      deviceName
    });

    await visit.save();

    res.send(`<h2>Your visit has been tracked successfully!</h2>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error tracking visit');
  }
};
