import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      style={{
        padding: '8px 10px',
        borderRadius: 8,
        border: '1px solid var(--border)',
        background: 'transparent',
        cursor: 'pointer'
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
