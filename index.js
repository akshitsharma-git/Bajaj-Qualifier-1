const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const { getFibonacci, getPrimes, getHCF, getLCM } = require('./util');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EMAIL = process.env.OFFICIAL_EMAIL;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
        data = getFibonacci(req.body.fibonacci);
        break;

      case 'prime':
        data = getPrimes(req.body.prime);
        break;

      case 'lcm':
        data = getLCM(req.body.lcm);
        break;

      case 'hcf':
        data = getHCF(req.body.hcf);
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
          const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
          const result = await model.generateContent(
            `Answer in exactly one word: ${req.body.AI}`
          );
          data = result.response.text().trim();
        } catch {
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