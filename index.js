const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { fibonacci, primeFilter, hcf, lcm } = require('./util');

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL = 'akshit0274.be23@chitkara.edu.in';

app.use(express.json({ strict: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// Main API
app.post('/bfhl', async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
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
          const aiResponse = await axios.post(
            'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
            {
              contents: [
                {
                  parts: [{ text: req.body.AI }]
                }
              ]
            },
            {
              params: { key: process.env.GEMINI_API_KEY },
              timeout: 7000
            }
          );

          data =
            aiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            'No response generated';
        } catch (err) {
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

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      official_email: EMAIL,
      message: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});