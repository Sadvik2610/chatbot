import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';

export default function ChatView() {
  const { sessionId } = useParams();
  const [history, setHistory] = useState([]);
  const endRef = useRef();

  // Load conversation history from backend
  useEffect(() => {
    if (!sessionId) return;

    fetch(`http://localhost:5000/api/session/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        // Convert backend format → UI format
        const converted = data.flatMap(entry => [
          {
            role: "user",
            content: entry.question
          },
          {
            role: "assistant",
            content: entry.response.text,
            table: entry.response.table
          }
        ]);

        setHistory(converted);
      })
      .catch(console.error);

  }, [sessionId]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);


  // Send new question
  const sendQuestion = async (q) => {

    // 1. Show user question immediately
    setHistory(prev => [...prev, { role: "user", content: q }]);

    try {
      // 2. Send to backend
      const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q })
      });

      const data = await res.json();

      // 3. Show assistant response
      setHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.text,
          table: data.table
        }
      ]);

    } catch (err) {
      console.error(err);

      setHistory(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not get response from server."
        }
      ]);
    }
  };


  return (
    <div className="chat-container" role="main">
      <div className="messages">

        {history.length === 0 ? (
          <div style={{ color: "#999", padding: 12 }}>
            No messages yet — Ask something.
          </div>
        ) : history.map((msg, i) => (
          <div key={i} className={`message-row ${msg.role}`}>
            
            {/* Chat Bubble */}
            <div className={`bubble ${msg.role}`}>
              <ChatBubble role={msg.role} content={msg.content} />

              {/* Assistant table output */}
              {msg.table && (
                <div style={{ marginTop: 8 }}>
                  <TableResponse rows={msg.table} />
                </div>
              )}
            </div>

          </div>
        ))}

        <div ref={endRef} />
      </div>

      {/* Input area */}
      <div className="input-area">
        <ChatInput onSend={sendQuestion} />
      </div>
    </div>
  );
}
