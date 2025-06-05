import express from 'express';
import { createLink, trackVisit } from '../controllers/trackerController.js';
const router = express.Router();

router.get('/generate', createLink);
router.get('/track/:linkId', trackVisit);

export default router;
