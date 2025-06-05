import express from 'express';
import { createLink, trackVisit, saveLocation } from '../controllers/trackerController.js';

const router = express.Router();

router.post('/create-link', createLink);
router.get('/:linkId', trackVisit);
router.post('/save-location', saveLocation);

export default router;
