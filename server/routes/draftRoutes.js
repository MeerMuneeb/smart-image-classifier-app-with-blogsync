import express from 'express';
import { draftPost } from '../controllers/draftControllers.js';
const router = express.Router();

router.post('/', draftPost);

export default router;
