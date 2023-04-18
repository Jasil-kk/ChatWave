import React from "react";
import "./App.css";
import ChatPage from "./ChatPage/ChatPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./ChatPage/Register";
import Login from "./ChatPage/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
