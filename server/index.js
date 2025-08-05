const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is working");
});

app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;
  console.log("📥 Received GitHub code:", code);
  console.log("🆔 Client ID:", process.env.GITHUB_CLIENT_ID);
  console.log("🔐 Client Secret exists:", process.env.GITHUB_CLIENT_SECRET ? '✅ Yes' : '❌ No');

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = response.data.access_token;
    console.log("✅ GitHub Token Response:", response.data);

    if (!accessToken) {
      return res.status(400).send("❌ GitHub did not return access_token");
    }

    res.redirect(`http://localhost:3000?token=${accessToken}`);
  } catch (error) {
    console.error("❌ Error during GitHub OAuth:", error.response?.data || error.message);
    res.status(500).send("Authentication failed: " + (error.response?.data?.error_description || error.message));
  }
});

// ✅ NEW: POST endpoint to generate test cases using OpenAI
app.post('/generate-test-cases', async (req, res) => {
  const { files } = req.body;

  try {
    const testCases = [];

    for (const file of files) {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: "You're a helpful assistant that writes test cases for code files.",
            },
            {
              role: 'user',
              content: `Generate test cases for this file:\n\n${file.content}`,
            },
          ],
          temperature: 0.2,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      testCases.push({
        filename: file.name,
        testCase: response.data.choices[0].message.content,
      });
    }

    res.json(testCases);
  } catch (err) {
    console.error("Error generating test cases:", err.message);
    res.status(500).json({ error: "Failed to generate test cases" });
  }
});

// ✅ Server start
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
