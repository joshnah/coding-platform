import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = process.env['JUDGE0_API_KEY'];

export const languagesMap: { [key: string]: number } = {
  python: 71,
  java: 62,
  javascript: 102
};

export async function getBatchResults(batchResponses) {
  const tokens = extractTokensFromResponse(batchResponses);
  const resultUrl = `${JUDGE0_API_URL}/submissions/batch?tokens=${tokens.join(',')}`;
  let results = [];
  let submissions = [];
  let isFinished = false;
  // check every 2 minute, normally this should not check more than once because we set cpu_time_limit 2s
  while (!isFinished) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.get(resultUrl, {
        headers: {
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      });

      submissions = response.data.submissions || [];
      results = submissions.map((submission) => ({
        ...submission,
        isFinished: submission.status.id !== 1 && submission.status.id !== 2, // 1: in queue, 2: processing
      }));

      isFinished = results.every((result) => result.isFinished);
    } catch (error) {
      console.error('Error fetching batch results:', error);
      throw new Error('Error fetching batch results');
    }
  }
  return results;
}

export const buildSubmissionPayload = (
  code,
  language,
  input,
  expectedOutput,
) => {
  const payload: any = {
    source_code: code,
    language_id: languagesMap[language],
    stdin: input,
    cpu_time_limit: 2, // in seconds
    memory_limit: 256000, // in kilobytes
  };

  // If expectedOutput is provided, include it in the payload
  if (expectedOutput) {
    payload.expected_output = expectedOutput;
  }

  return payload;
};

const extractTokensFromResponse = (responseBody) => {
  return responseBody.data.map((submission) => submission.token);
};
