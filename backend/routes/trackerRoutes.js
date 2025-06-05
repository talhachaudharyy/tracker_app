import express from 'express';
import { createLink, trackVisit, trackExactLocation } from '../controllers/trackerController.js';

const router = express.Router();

router.post('/create-link', createLink);
router.get('/track/:linkId', trackVisit);
router.post('/track-location', trackExactLocation);

export default router;
