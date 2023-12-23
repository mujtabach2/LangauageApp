import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Difficulty from "./pages/Difficulty";
import Flags from "./pages/Flags";
import ChatGenerator from "./pages/ChatGenerator";
import "bootstrap/dist/css/bootstrap.min.css";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/difficulty" element={<Difficulty />} />
                <Route path="/flags" element={<Flags/>} />
                <Route path="/chatgenerator" element={<ChatGenerator/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;