import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { MOCK_CODING_QUESTION } from './coding-question.mock';
import {
  buildSubmissionPayload,
  getBatchResults,
  languagesMap,
} from './helpers';

dotenv.config();

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env['JUDGE0_API_KEY'];
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/execute', async (req, res) => {
  try {
    const payload = {
      source_code: req.body.code,
      language_id: languagesMap[req.body.language],
      stdin: req.body.input,
    };

    const response = await axios.post(
      `${JUDGE0_API_URL}/submissions/?base64_encoded=false&wait=true`,
      payload,
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

app.post('/submit', async (req, res) => {
  try {
    const submissions = MOCK_CODING_QUESTION.testCases.map((testCase) => {
      return buildSubmissionPayload(
        req.body.code,
        req.body.language,
        testCase.input,
        testCase.expectedOutput,
      );
    });

    const batchResponses = await axios.post(
      `${JUDGE0_API_URL}/submissions/batch/?base64_encoded=false&wait=true`,
      {
        submissions: submissions,
      },

      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      },
    );
    res.json(await getBatchResults(batchResponses));
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/questions/mock', async (req, res) => {
  res.json(MOCK_CODING_QUESTION);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
