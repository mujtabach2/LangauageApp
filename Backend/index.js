import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate-chat', async (req, res) => {
  try {
    const { role, user_role,session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, user_role,session_length, language, proficiency, topic, mode, starter, input);

    const pythonProcess = spawn('python3', ['gptChat.py', role, JSON.stringify(user_role),session_length, language, proficiency, topic, mode, starter, input]);

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
  console.log(`Server is running at http://localhost:${port}`);
});
