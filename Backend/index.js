import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import cors from 'cors';

import {GPTChatWrapper} from './gptChat.js';

const app = express();
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const port = process.env.PORT || 3000;

app.use(cors());

app.options('/generate-chat', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.send();
});


app.post('/generate-chat', async (req, res) => {
  try {
    console.log(req.body);
    const { role, name, session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, name, session_length, language, proficiency, topic, mode, starter, input);

    // Assuming GPTChatWrapper is an ES module
    const gpt_chat_wrapper = new GPTChatWrapper(role, name, session_length, language, proficiency, topic, mode, starter, input);
    const response = await gpt_chat_wrapper.run();

    // Return the response directly
    res.json({ chat: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at ${baseUrl}`);
});
