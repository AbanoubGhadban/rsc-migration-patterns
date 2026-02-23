// Pattern 2: The Donut Pattern (Children as Props)
//
// The Modal is a Client Component that needs state (isOpen toggle).
// The Cart content is a Server Component that fetches data on the server.
// By using the `children` prop, Cart passes through the Modal without
// becoming client code — the "donut hole" pattern.

import React from 'react';
import Modal from './Modal';

async function getCartItems() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    { id: 1, name: 'Mechanical Keyboard', price: 149.99, qty: 1 },
    { id: 2, name: 'USB-C Cable', price: 12.99, qty: 2 },
    { id: 3, name: 'Monitor Stand', price: 34.99, qty: 1 },
  ];
}

async function Cart() {
  const items = await getCartItems();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h3 style={{ margin: '0 0 16px' }}>Your Cart</h3>
      {items.map((item) => (
        <div key={item.id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: '1px solid #eee',
        }}>
          <span>{item.name} x{item.qty}</span>
          <span style={{ fontWeight: 'bold' }}>${(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        fontWeight: 'bold',
        fontSize: '1.1em',
      }}>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <p style={{ color: '#666', fontSize: '0.85em', margin: '8px 0 0' }}>
        This cart content was rendered on the server — zero JS shipped for it.
      </p>
    </div>
  );
}

const CartPage = async () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <div style={{
        background: '#e3f2fd',
        border: '1px solid #90caf9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: '0.85em',
      }}>
        <strong>Pattern 2: The Donut Pattern</strong> — The Modal below is a Client Component
        (it needs useState for open/close). But the Cart content inside it is a Server Component
        passed via children — it never becomes client code!
      </div>

      <h1>Shopping</h1>
      <p>Click the button below to see the donut pattern in action.</p>

      {/* Modal is client (has state), Cart is server (passed as children) */}
      <Modal>
        <Cart />
      </Modal>
    </div>
  );
};

export default CartPage;
