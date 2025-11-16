import React from 'react';

export default function ChatBubble({ role, content }) {
  // content may be plain text or JSX; keep it simple
  if (!content) return null;
  return (
    <div style={{whiteSpace: 'pre-wrap'}}>
      {content}
    </div>
  );
}
