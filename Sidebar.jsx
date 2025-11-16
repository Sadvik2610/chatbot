import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5000/api/sessions')
      .then(r => r.json())
      .then(setSessions)
      .catch(console.error);
  }, []);

  const newChat = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/new-chat');
      const data = await res.json();
      navigate(`/chat/${data.sessionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="top">
        <button className="btn-new" onClick={newChat}>+ New Chat</button>
      </div>

      <div className="list">
        {sessions.length === 0 ? (
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>No conversations yet</div>
        ) : sessions.map(s => {
          const path = `/chat/${s.id}`;
          const active = location.pathname === path;
          return (
            <Link key={s.id} to={path} className={`chat-link ${active ? 'active' : ''}`}>
              <div className="title">{s.title || 'Untitled conversation'}</div>
              <div className="meta">{new Date(s.createdAt).toLocaleString()}</div>
            </Link>
          );
        })}
      </div>

      <div className="footer">Lumibyte — By Sadvik</div>
    </aside>
  );
}
