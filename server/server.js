import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import classifyRoutes from './routes/classifyRoutes.js'
import draftRoutes from './routes/draftRoutes.js'; 


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/classify', classifyRoutes);
app.use('/draft', draftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Port: http://localhost:${PORT}`);
});
