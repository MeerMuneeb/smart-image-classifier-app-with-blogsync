import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// const resultsPath = path.join(__dirname, '..', 'results.json');

export const classifyImage = async (req, res) => {
  const imagePath = req.file.path;
  const scriptPath = path.join(__dirname, '..' , '..', 'ml_model', 'classify.py');

  try {
    const result = await new Promise((resolve, reject) => {
      execFile('python', [scriptPath, imagePath], { encoding: 'utf8' }, (err, stdres, stderr) => {
        if (err) {
          console.error('Python error:', stderr);
          return reject(err);
        }
      
        try {
          const result = JSON.parse(stdres);
          resolve(result);
        } catch (jsonErr) {
          console.error('Raw stdout from Python:', stdres);
          reject(new Error('Invalid JSON from Python script'));
        }
      });
    });

    // Read and update results.json
    // let results = [];
    // try {
    //   await access(resultsPath, constants.F_OK);
    //   const fileData = await readFile(resultsPath, 'utf-8');
    //   results = JSON.parse(fileData);
    // } catch (readErr) {
    //   results = [];
    // }

    // results.push({ ...result, imagePath });

    // await writeFile(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
    let label = result.label
    let confidence = result.confidence
    console.log({imagePath})   //uploads\1744683080110-dog.jpg
    let url = `${imagePath.replace(/\\/g, '/')}`;


    res.json({
      label,
      confidence,
      imageUrl: `http://localhost:5000/${imagePath}`,
    });

    axios.post('http://localhost:5000/draft', {
      label,
      confidence,
      imagePath: url,
    }).catch(err => {
      console.error('Failed to create draft post:', err.response?.data || err.message);
    });

  } catch (err) {
    console.error('Cl error:', err);
    res.status(500).json({ error: 'Failed classification' });
  }
};

