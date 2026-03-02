// Test: What CRASHES with ref in Server Components
//
// The React Flight serializer explicitly throws:
//   "Refs cannot be used in Server Components, nor passed to Client Components."
//
// This page demonstrates the crash by passing a ref to a server component element.
// If you see this page render, the crash didn't happen (which would be surprising).
// Expected: the page shows an error.

import React from 'react';

function ServerChild({ ref, label }) {
  return (
    <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <strong>{label}</strong>
      <p>ref value: {JSON.stringify(ref)}</p>
    </div>
  );
}

const RefCrash = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  // This creates a ref object
  const myRef = React.createRef();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h1>Ref Crash Test</h1>

      <div style={{
        background: '#ffebee',
        border: '1px solid #ef9a9a',
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        fontSize: '0.85em',
      }}>
        This page attempts to pass a <code>ref</code> prop to a Server Component element.
        The Flight serializer should throw: <em>&quot;Refs cannot be used in Server
        Components, nor passed to Client Components.&quot;</em>
      </div>

      {/* This line should crash the Flight serializer */}
      <ServerChild ref={myRef} label="I should not render" />

      {/* If we get here, the crash didn't happen */}
      <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
        If you see this text, passing ref to a Server Component did NOT crash.
      </p>
    </div>
  );
};

export default RefCrash;
