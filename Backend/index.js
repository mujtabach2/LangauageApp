import express from 'express';
import bodyParser from 'body-parser';
import {GPTChatWrapper} from './gptChat.js';
import cors from 'cors';


const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseUrl = process.env.BASE_URL || 'https://intelli-chat-e9vv.onrender.com';
const port = process.env.PORT || 3000;

app.post('/generate-chat', async (req, res) => {
  try {
    console.log(req.body);
    const { role, name, session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, name, session_length, language, proficiency, topic, mode, starter, input);

    const gpt_chat_wrapper = new GPTChatWrapper('User', name, session_length, language, proficiency, topic, mode, starter, input);
    const response = await gpt_chat_wrapper.run();

    if (response === null) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    res.status(200).json({ chat: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.listen(port, () => {
  console.log(`Server is running at ${baseUrl}`);
});
