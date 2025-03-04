import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const languagesMap: { [key: string]: number } = {
  python: 71,
  java: 62,
};

const JUDGE0_API_URL =
  'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true';
const JUDGE0_API_KEY = process.env['JUDGE0_API_KEY'];

app.post('/execute', async (req, res) => {
  try {
    const payload = {
      source_code: req.body.code,
      language_id: languagesMap[req.body.language],
      stdin: req.body.input,
    };
    const response = await axios.post(JUDGE0_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
