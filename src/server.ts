const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const JUDGE0_API_URL =
  'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=false&wait=true';
const JUDGE0_API_KEY = process.env['JUDGE0_API_KEY']; // Optional, if needed

app.post('/submit', async (req, res) => {
  console.log(req);
  try {
    const { source_code, language_id, stdin } = req.body;

    const response = await axios.post(
      JUDGE0_API_URL,
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
