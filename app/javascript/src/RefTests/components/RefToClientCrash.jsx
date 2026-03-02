// Test: Can we pass ref from a Server Component to a Client Component?
//
// The Flight serializer checks ref BEFORE determining if the target is
// a client or server component. So this should also crash with:
//   "Refs cannot be used in Server Components, nor passed to Client Components."

import React from 'react';
import Modal from '../../CartPage/components/Modal';

const RefToClientCrash = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const myRef = React.createRef();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <h1>Ref to Client Component Crash Test</h1>

      <div style={{
        background: '#ffebee',
        border: '1px solid #ef9a9a',
        borderRadius: 8,
        padding: 12,
        marginBottom: 24,
        fontSize: '0.85em',
      }}>
        This page attempts to pass a <code>ref</code> from a Server Component to a
        Client Component (<code>Modal</code>). The Flight serializer should throw the
        same error — it checks ref <strong>before</strong> it checks whether the target
        is a client reference.
      </div>

      {/* This should crash — ref check happens before client component detection */}
      <Modal ref={myRef}>
        <p>I should not render</p>
      </Modal>

      <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
        If you see this text, passing ref to a Client Component did NOT crash.
      </p>
    </div>
  );
};

export default RefToClientCrash;
