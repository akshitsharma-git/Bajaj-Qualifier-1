import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getFibonacci, getPrimes, getHCF, getLCM } from './utils.js';

dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GET
app.get('/health', (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL
    });
});

// POST
app.post('/bfhl', async (req, res) => {
    try {
        const { fibonacci, prime, lcm, hcf, AI } = req.body;
        const email = process.env.OFFICIAL_EMAIL;
        let responseData;

        // Mapping
        if (fibonacci !== undefined) responseData = getFibonacci(fibonacci);
        else if (prime) responseData = getPrimes(prime);
        else if (lcm) responseData = getLCM(lcm);
        else if (hcf) responseData = getHCF(hcf);
        else if (AI) {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(`Answer in exactly one word: ${AI}`);
            responseData = result.response.text().trim();
        } else {
            return res.status(400).json({ is_success: false, message: "Invalid Input" });
        }

        res.status(200).json({
            is_success: true,
            official_email: email,
            data: responseData
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));