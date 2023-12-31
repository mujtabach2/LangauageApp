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
    const nodeProcess = spawn('node', ['gptChat.js', role, name, session_length, language, proficiency, topic, mode, starter, input]);

    let nodeOutput = '';
    let nodeError = '';

    nodeProcess.stdout.on('data', (data) => {
      nodeOutput += data.toString();
    });

    nodeProcess.stderr.on('data', (data) => {
      nodeError += data.toString();
    });

    nodeProcess.on('close', (code) => {
      console.log(`Node.js process exited with code ${code}`);

      if (code === 0) {
        console.log(`Node.js process output: ${nodeOutput}`);
        res.json({ chat: nodeOutput });
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
