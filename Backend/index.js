import express from 'express';
import bodyParser from 'body-parser';
import {GPTChatWrapper} from './gptChat.js';
import cors from 'cors';


const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseUrl = 'https://intelli-chat-e9vv.onrender.com';
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('IntelliChat API is running');
});

// Generate chat route
app.post('/generate-chat', async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const { role, name, session_length, language, proficiency, topic, mode, starter, input } = req.body;

    console.log('Creating GPTChatWrapper with:', role, name, session_length, language, proficiency, topic, mode, starter, input);
    const gpt_chat_wrapper = new GPTChatWrapper(role, name, session_length, language, proficiency, topic, mode, starter, input);
    
    const response = await gpt_chat_wrapper.run();
    console.log('GPTChatWrapper response:', response);

    if (!response || !response.text) {
      console.log('No response text, returning error');
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    res.status(200).json({ chat: response.text });
  } catch (error) {
    console.error('Error in /generate-chat:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Catch-all route
app.use((req, res) => {
  console.log('Received request for:', req.url);
  res.status(404).send('Route not found');
});

// Add this line just before app.listen()
console.log(`Server starting on port ${port}`);

app.listen(port, () => {
  console.log(`Server is running at ${baseUrl}`);
  console.log('Routes:');
  app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  });
});
