import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});
const url = 'https://localhost/itstop/wp-json/wp/v2/';
const username = 'ITSTOPSTORE';
const password = 'p9ED 4w8v WWRv 3FXP KCbW nbGn';
const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

export const draftPost = async (req, res) => {
    const { label, confidence, imagePath } = req.body;
    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(imagePath));

        const imageResponse = await axios.post(`${url}media`, form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Disposition': 'attachment; filename="upload.jpg"',
            },
            httpsAgent: agent,
        });

        const imageId = imageResponse.data.id;
        const imageUrl = imageResponse.data.source_url;

        const postData = {
            title: `Classified Image: ${label}`,
            content: `<p>Confidence: ${confidence}%</p><p>Classification Result: ${label}</p>`,
            status: 'draft',
            "featured_media": `${imageId}`
        };

        const postHeaders = {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
        };

        await axios.post(`${url}posts`, postData, { 
            headers: postHeaders,        
            httpsAgent: agent
        }
        );

        res.json({
            message: 'WordPress post created successfully',
            imageUrl,
            label,
            confidence,
        });
    } catch (err) {
        console.error('WordPress post creation failed:', err);
        res.status(500).json({ error: 'Failed to create post in WordPress' });
    }
};
