'use client';

// AddToCartButton - Client Component (interactive leaf)
//
// This is the ONLY component in Pattern 1 that ships JavaScript to the browser.
// It demonstrates "pushing state to leaf components" - the parent ProductPage
// fetches data on the server, and only this interactive piece runs on the client.

import React, { useState } from 'react';

const AddToCartButton = ({ productId, productName }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 16,
      padding: '16px',
      background: '#fff3e0',
      border: '1px solid #ffcc80',
      borderRadius: 8,
    }}>
      <label style={{ fontWeight: 'bold' }}>
        Qty:
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          style={{
            width: 60,
            marginLeft: 8,
            padding: '6px 8px',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1em',
          }}
        />
      </label>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={added}
        style={{
          padding: '10px 24px',
          fontSize: '1em',
          cursor: added ? 'default' : 'pointer',
          borderRadius: 6,
          border: 'none',
          background: added ? '#66bb6a' : '#ff9800',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {added ? 'Added!' : `Add to Cart`}
      </button>

      <span style={{ color: '#e65100', fontSize: '0.85em' }}>
        This button is a Client Component (only its JS is sent to the browser)
      </span>
    </div>
  );
};

export default AddToCartButton;
