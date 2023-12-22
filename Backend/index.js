import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3001; // Choose a port that is not in use

app.use(bodyParser.json());
app.use(cors());

// Define an endpoint for handling chat requests
app.post('/generate-chat', async (req, res) => {
  try {
    // Extract parameters from the request body
    const { role, user_role, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, user_role, language, proficiency, topic, mode, starter, input);
    // Spawn a Python process
    const pythonProcess = spawn('python3', ['gptChat.py', role, JSON.stringify(user_role), language, proficiency, topic, mode, starter, input]);

    let pythonOutput = '';

    // Handle data from the Python process
    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // Process has finished, parse the output or handle any additional logic
      console.log(`Python process exited with code ${code}`);
      console.log(`Python process output: ${pythonOutput}`);

      // Send the generated chat back to the frontend
      res.json({ chat: pythonOutput });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
