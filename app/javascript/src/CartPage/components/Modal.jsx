'use client';

// Modal - Client Component (the "donut")
//
// This component needs client-side state to toggle visibility.
// Its content (children) can be Server Components — they pass through
// without becoming client code. This is the "donut pattern":
// the client component wraps around a server-rendered center.

import React, { useState } from 'react';

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: '1em',
          cursor: 'pointer',
          borderRadius: 8,
          border: '2px solid #1976d2',
          background: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        Open Cart
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 24,
              minWidth: 400,
              maxWidth: 500,
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Server-rendered content passes through here */}
            {children}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: 16,
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: 6,
                border: '1px solid #ccc',
                background: '#f5f5f5',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
