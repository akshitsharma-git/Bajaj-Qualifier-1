const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { fibonacci, primeFilter, hcf, lcm } = require('./util');

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL = 'akshit0274.be23@chitkara.edu.in';

app.use(express.json({ strict: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

app.post('/bfhl', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        message: 'Invalid request body'
      });
    }

    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        message: 'Request must contain exactly one key'
      });
    }

    const key = keys[0];
    let data;

    switch (key) {
      case 'fibonacci':
        data = fibonacci(req.body.fibonacci);
        break;

      case 'prime':
        data = primeFilter(req.body.prime);
        break;

      case 'lcm':
        data = lcm(req.body.lcm);
        break;

      case 'hcf':
        data = hcf(req.body.hcf);
        break;

      case 'AI':
        if (typeof req.body.AI !== 'string' || !req.body.AI.trim()) {
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            message: 'Invalid AI input'
          });
        }

        try {
          console.log('GROQ_API_KEY loaded:', !!process.env.GROQ_API_KEY);

          const aiResponse = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              model: 'llama3-8b-8192',
              messages: [
                {
                  role: 'user',
                  content: req.body.AI
                }
              ],
              temperature: 0.2
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
              },
              timeout: 7000
            }
          );

          data =
            aiResponse?.data?.choices?.[0]?.message?.content?.trim() ||
            'No response generated';
        } catch (err) {
          console.error(
            err.response?.status,
            err.response?.data || err.message
          );
          data = 'AI service unavailable';
        }
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: EMAIL,
          message: 'Invalid request key'
        });
    }

    return res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      is_success: false,
      official_email: EMAIL,
      message: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});