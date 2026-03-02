// Test: What works with ref in Server Components
//
// React 19 made ref a regular prop and deprecated forwardRef.
// But the Flight serializer explicitly REJECTS non-null refs.
// This page shows what DOES work.

import React from 'react';

// Test 1: createRef() is available in the server runtime
// (even though using the result as a ref prop would crash)
const refObject = React.createRef();

// Test 2: forwardRef wrapper works (as long as no ref is actually passed)
const ForwardRefBox = React.forwardRef(function ForwardRefBox(props, ref) {
  return (
    <div
      ref={ref}
      style={{
        padding: 16,
        border: '2px solid #90caf9',
        borderRadius: 8,
        background: '#e3f2fd',
      }}
    >
      <strong>forwardRef component:</strong> {props.label}
    </div>
  );
});

// Test 3: ref as a regular prop name (NOT React's special ref handling)
// If you name the prop something other than "ref", it's just a normal prop
function DisplayWithCustomRefProp({ myRef, children }) {
  return (
    <div style={{
      padding: 16,
      border: '2px solid #a5d6a7',
      borderRadius: 8,
      background: '#e8f5e9',
    }}>
      <strong>Custom ref-like prop:</strong> myRef = {JSON.stringify(myRef)}
      <div>{children}</div>
    </div>
  );
}

const RefWorking = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h1>Ref in Server Components: What Works</h1>

      <div style={{
        background: '#e8f5e9',
        border: '1px solid #a5d6a7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        fontSize: '0.85em',
      }}>
        These tests show ref-related features that <strong>do work</strong> in Server Components.
        See the companion page for what <strong>crashes</strong>.
      </div>

      {/* Test 1 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#1565c0' }}>Test 1: React.createRef() is available</h2>
        <p>
          <code>React.createRef()</code> is exported from the server React runtime.
          Calling it produces a ref object:
        </p>
        <pre style={{
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 8,
          overflow: 'auto',
        }}>
          {`React.createRef() = ${JSON.stringify(refObject)}`}
        </pre>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          createRef is available. But passing it as a ref prop to any element would crash.
        </p>
      </section>

      {/* Test 2 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#6a1b9a' }}>Test 2: forwardRef component (no ref passed)</h2>
        <p>
          A <code>React.forwardRef()</code> wrapper works as a Server Component, as long as
          no actual <code>ref</code> is passed. The Flight serializer unwraps the forwardRef
          and calls the inner render function directly.
        </p>
        <ForwardRefBox label="Rendered on the server without a ref" />
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          Works. forwardRef is just unwrapped — the inner function renders normally.
        </p>
      </section>

      {/* Test 3 */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#e65100' }}>Test 3: Custom prop named something other than &quot;ref&quot;</h2>
        <p>
          Only the literal prop name <code>ref</code> is special to React.
          A prop named <code>myRef</code> is just a regular serializable prop.
        </p>
        <DisplayWithCustomRefProp myRef="some-string-id">
          This works because &quot;myRef&quot; is not React&apos;s special ref prop.
        </DisplayWithCustomRefProp>
        <p style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '0.9em' }}>
          Works. Only the literal name &quot;ref&quot; is checked by the Flight serializer.
        </p>
      </section>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />

      <div style={{ fontSize: '0.9em', color: '#555' }}>
        <strong>Summary:</strong> <code>createRef()</code> and <code>forwardRef()</code> are
        available in the server runtime, but actually passing a non-null <code>ref</code> prop
        to any element throws: <em>&quot;Refs cannot be used in Server Components, nor passed
        to Client Components.&quot;</em>
      </div>

      <p style={{ marginTop: 16 }}>
        <a href="/patterns/ref_crash" style={{ color: '#c62828' }}>
          See what crashes →
        </a>
        {' | '}
        <a href="/" style={{ color: '#1976d2' }}>Back to home</a>
      </p>
    </div>
  );
};

export default RefWorking;
