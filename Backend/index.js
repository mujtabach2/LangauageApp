import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate-chat', async (req, res) => {
  try {
    const { role, name,session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, name,session_length, language, proficiency, topic, mode, starter, input);

    const pythonProcess = spawn('python3', ['gptChat.py', role, name, session_length, language, proficiency, topic, mode, starter, input],
      {env: { PATH: '/Library/Frameworks/Python.framework/Versions/3.11/bin/python3'}}
    );

    let pythonOutput = '';
    let pythonError = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);

      if (code === 0) {
        console.log(`Python process output: ${pythonOutput}`);
        res.json({ chat: pythonOutput });
      } else {
        console.error(`Python process error: ${pythonError}`);
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
