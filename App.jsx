import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <div className="main">
          <header className="header">
            <h1 style={{margin:0, fontSize: '16px', fontWeight:700}}>Lumibyte — Chat</h1>
            <ThemeToggle />
          </header>

          <main className="chat-shell">
            <Routes>
              <Route path="/" element={
                <div className="chat-container">
                  <div className="messages" style={{display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--muted)'}}>
                    Select or create a conversation from the left.
                  </div>
                </div>
              } />
              <Route path="/chat/:sessionId" element={<ChatView />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
