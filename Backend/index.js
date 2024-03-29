import express from 'express';
import bodyParser from 'body-parser';
import {GPTChatWrapper} from './gptChat.js';

const app = express();
import cors from 'cors';
const corsOptions ={
    origin:'https://intelli-chat.netlify.app',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const port = process.env.PORT || 3000;



app.post('/generate-chat', async (req, res) => {
  try {
    console.log(req.body);
    const { role, name, session_length, language, proficiency, topic, mode, starter, input } = req.body;
    console.log(role, name, session_length, language, proficiency, topic, mode, starter, input);

    // Assuming GPTChatWrapper is an ES module
    const gpt_chat_wrapper = new GPTChatWrapper('User', name, session_length, language, proficiency, topic, mode, starter, input);
    const response = await gpt_chat_wrapper.run();

    if (response === null) {
      res.status(500).json({ error: 'shii not working' });
    }else{
      res.status(200).json({ chat: response.text });
    }
    // Return the response directly
    res = response.text;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at ${baseUrl}`);
});
