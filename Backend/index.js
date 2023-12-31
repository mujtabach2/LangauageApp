const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.post('/generate-chat', async (req, res) => {
  try {
    const { role, name, session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, name, session_length, language, proficiency, topic, mode, starter, input);

    // Assuming gptChat.js is now your Node.js script
    const gpt_chat_wrapper = new GPTChatWrapper(role, name, session_length, language, proficiency, topic, mode, starter, input);
    const response = gpt_chat_wrapper.run();

    nodeProcess.on('close', (code) => {
      console.log(`Node.js process exited with code ${code}`);

      if (code === 0) {
        console.log(`Node.js process output: ${response}`);
        res.json({ chat: response });
      } else {
        console.error(`Node.js process error: ${nodeError}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${baseUrl}`);
});
