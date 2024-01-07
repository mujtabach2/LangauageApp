import React from 'react';
import './App.css';
import AppRouter from './AppRouter.js';
import { FlagProvider } from "./pages/components/FlagContext.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <FlagProvider>
        <AppRouter/>
      </FlagProvider>
    </div>
  );
}

export default App;
