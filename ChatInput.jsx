import React, { useState, useRef } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');
  const taRef = useRef();

  // auto-resize textarea
  const adjustHeight = () => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(240, ta.scrollHeight) + 'px';
  };

  const submit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    // reset height
    if (taRef.current) {
      taRef.current.style.height = 'auto';
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div style={{display:'flex', gap:10, width:'100%'}}>
      <textarea
        ref={taRef}
        value={text}
        onChange={e => { setText(e.target.value); }}
        onInput={adjustHeight}
        onKeyDown={onKeyDown}
        className="textarea"
        placeholder="Send a message..."
        rows={1}
      />
      <button onClick={submit} className="btn-send">Send</button>
    </div>
  );
}
