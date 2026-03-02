// Test: Can Server Components use React.memo and React.forwardRef?
//
// Claim from rsc-third-party-libs.md: Server Components "cannot use"
// forwardRef and memo. This page tests whether that's actually true
// by using both in Server Components and seeing if they render or crash.

import React from 'react';

// --- Test 1: React.memo wrapping a Server Component ---
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return (
    <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 4 }}>{item}</li>
      ))}
    </ul>
  );
});

// --- Test 2: React.forwardRef on a Server Component ---
const FancyInput = React.forwardRef(function FancyInput(props, ref) {
  return (
    <div
      ref={ref}
      style={{
        padding: '12px 16px',
        border: '2px solid #90caf9',
        borderRadius: 8,
        background: '#e3f2fd',
        fontFamily: 'monospace',
      }}
    >
      {props.label}: <strong>{props.value}</strong>
    </div>
  );
});

// --- Test 3: React.memo + React.forwardRef combined ---
const MemoForwardRefBox = React.memo(
  React.forwardRef(function MemoForwardRefBox(props, ref) {
    return (
      <div
        ref={ref}
        style={{
          padding: '12px 16px',
          border: '2px solid #a5d6a7',
          borderRadius: 8,
          background: '#e8f5e9',
        }}
      >
        {props.children}
      </div>
    );
  })
);

const MemoForwardRefTest = async () => {
  // Simulate server-side data fetch
  await new Promise((resolve) => setTimeout(resolve, 100));

  const items = [
    'Server Components render on the server only',
    'memo() prevents re-renders (pointless for SC, but should not crash)',
    'forwardRef() is deprecated in React 19 (ref is a regular prop now)',
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <div style={{
        background: '#fff3e0',
        border: '1px solid #ffcc80',
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        fontSize: '0.85em',
      }}>
        <strong>Issue #2502 Test: memo and forwardRef in Server Components</strong> —
        The docs claim Server Components &quot;cannot use&quot; <code>React.memo</code> and{' '}
        <code>React.forwardRef</code>. If this page renders without errors, that claim is wrong.
      </div>

      <h1>memo / forwardRef in Server Components</h1>

      {/* Test 1 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#1565c0' }}>Test 1: React.memo</h2>
        <p>This list is wrapped in <code>React.memo()</code> and rendered as a Server Component:</p>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          background: '#fafafa',
        }}>
          <ExpensiveList items={items} />
        </div>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          If you see the list above, React.memo works in Server Components.
        </p>
      </section>

      {/* Test 2 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#6a1b9a' }}>Test 2: React.forwardRef</h2>
        <p>This element uses <code>React.forwardRef()</code> as a Server Component:</p>
        <FancyInput label="Server-rendered value" value="Hello from forwardRef!" />
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          If you see the box above, React.forwardRef works in Server Components.
        </p>
      </section>

      {/* Test 3 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#e65100' }}>Test 3: React.memo + React.forwardRef combined</h2>
        <p>This element uses both <code>React.memo(React.forwardRef(...))</code>:</p>
        <MemoForwardRefBox>
          This box is wrapped in both memo and forwardRef, rendered on the server.
        </MemoForwardRefBox>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          If you see the box above, the combination works too.
        </p>
      </section>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />

      <div style={{ fontSize: '0.9em', color: '#555' }}>
        <strong>Verdict:</strong> If all three tests render, then listing <code>memo</code> and{' '}
        <code>forwardRef</code> as things Server Components &quot;cannot use&quot; is inaccurate.
        They work — <code>memo</code> is just pointless (SCs don't re-render) and{' '}
        <code>forwardRef</code> is deprecated in React 19 (use <code>ref</code> as a prop instead).
      </div>

      <p style={{ marginTop: 16 }}>
        <a href="/" style={{ color: '#1976d2' }}>Back to home</a>
      </p>
    </div>
  );
};

export default MemoForwardRefTest;
