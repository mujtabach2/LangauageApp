import React, { useState } from 'react';
import axios from 'axios';
import { useFlag } from "../components/FlagContext";



const ChatGenerator = () => {
  const [input, setInput] = useState('');
  const [generatedChat, setGeneratedChat] = useState('');
  const [error, setError] = useState(null);

  const { selectedFlag, selectedDifficulty, selectedMode } = useFlag();

  const handleGenerateChat = async () => {
    try {
      // Replace with your actual API endpoint
      const apiUrl = 'http://localhost:3001/generate-chat';

      // Replace with the desired input and other parameters
      const requestBody = {
        role: 'User',
        user_role: { name: 'John' },
        session_length: 'Short',
        language: selectedFlag,
        proficiency: selectedDifficulty,
        topic: 'Sports',
        mode: selectedMode,
        starter: true,
        input: input,
      };
      console.log(requestBody);

      const response = await axios.post(apiUrl, requestBody);

      console.log(response);

      // Update the state with the generated chat
      setGeneratedChat(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error generating chat'); // Provide a single string here
    }
  };

  return (
    <div>
      <h1>Chat Generator</h1>
      <div>
        <label htmlFor="input">Input:</label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateChat}>Generate Chat</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedChat && (
        <div>
          <h2>Generated Chat:</h2>
          <p>{JSON.stringify(generatedChat)}</p>
        </div>
      )}

      <div>
      </div>

    </div>
  );
};

export default ChatGenerator;
