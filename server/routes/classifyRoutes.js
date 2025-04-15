import express from 'express';
import multer from 'multer';
import path from 'path';
import { classifyImage } from '../controllers/classifyControllers.js'
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('image'), classifyImage);

export default router;
