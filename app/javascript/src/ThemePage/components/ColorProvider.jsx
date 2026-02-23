'use client';

// ColorProvider - Client Component (state wrapper)
//
// This component holds theme state and wraps its children with
// the appropriate styles. The children (Header, MainContent, Footer)
// are Server Components — they pass through without becoming client code.

import React, { useState } from 'react';

const THEMES = {
  light: {
    background: '#ffffff',
    color: '#1a1a1a',
    label: 'Light',
  },
  dark: {
    background: '#1a1a2e',
    color: '#e0e0e0',
    label: 'Dark',
  },
  ocean: {
    background: '#0d1b2a',
    color: '#c9d6df',
    label: 'Ocean',
  },
};

const ColorProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  const theme = THEMES[themeName];

  return (
    <div style={{
      background: theme.background,
      color: theme.color,
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #ccc',
    }}>
      <div style={{
        padding: '8px 24px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottom: `1px solid ${theme.color}33`,
      }}>
        <span style={{ fontSize: '0.85em', marginRight: 8 }}>Theme:</span>
        {Object.entries(THEMES).map(([key, t]) => (
          <button
            key={key}
            type="button"
            onClick={() => setThemeName(key)}
            style={{
              padding: '4px 12px',
              cursor: 'pointer',
              borderRadius: 4,
              border: key === themeName ? '2px solid #4fc3f7' : '1px solid #666',
              background: key === themeName ? '#4fc3f733' : 'transparent',
              color: theme.color,
              fontSize: '0.85em',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Server-rendered children pass through */}
      {children}
    </div>
  );
};

export default ColorProvider;
