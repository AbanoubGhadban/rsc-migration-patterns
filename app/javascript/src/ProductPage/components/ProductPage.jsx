// Pattern 1: Pushing State to Leaf Components
//
// This Server Component fetches product data directly on the server.
// The interactive "Add to Cart" functionality is pushed down to a
// dedicated Client Component leaf (AddToCartButton).
//
// Result: ProductSpecs, ReviewList, and all product data rendering
// stay on the server. Only the add-to-cart interaction ships JS.

import React from 'react';
import AddToCartButton from './AddToCartButton';

async function getProduct(productId) {
  // Simulate server-side data fetch
  await new Promise((resolve) => setTimeout(resolve, 150));

  const products = {
    1: {
      id: 1,
      name: 'Mechanical Keyboard',
      description: 'A premium mechanical keyboard with Cherry MX switches, RGB backlighting, and hot-swappable sockets.',
      price: 149.99,
      specs: [
        { label: 'Switch Type', value: 'Cherry MX Brown' },
        { label: 'Layout', value: '75% Compact' },
        { label: 'Connectivity', value: 'USB-C / Bluetooth 5.0' },
        { label: 'Battery', value: '4000mAh (wireless mode)' },
      ],
      reviews: [
        { id: 1, author: 'Alice', rating: 5, text: 'Best keyboard I have ever used! The tactile feedback is amazing.' },
        { id: 2, author: 'Bob', rating: 4, text: 'Great build quality. Wish it had more color options.' },
        { id: 3, author: 'Charlie', rating: 5, text: 'Perfect for both coding and gaming.' },
      ],
    },
  };

  return products[productId] || products[1];
}

function ProductSpecs({ specs }) {
  return (
    <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, margin: '16px 0' }}>
      <h3 style={{ margin: '0 0 12px' }}>Specifications</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label} style={{ borderBottom: '1px solid #e9ecef' }}>
              <td style={{ padding: '8px 0', fontWeight: 'bold', width: '40%' }}>{spec.label}</td>
              <td style={{ padding: '8px 0' }}>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewList({ reviews }) {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div style={{ margin: '16px 0' }}>
      <h3>Reviews ({reviews.length}) - Average: {'*'.repeat(Math.round(avgRating))} {avgRating}/5</h3>
      {reviews.map((review) => (
        <div key={review.id} style={{
          border: '1px solid #e9ecef',
          borderRadius: 8,
          padding: 12,
          marginBottom: 8,
        }}>
          <strong>{review.author}</strong> - {'*'.repeat(review.rating)}
          <p style={{ margin: '4px 0 0' }}>{review.text}</p>
        </div>
      ))}
    </div>
  );
}

const ProductPage = async ({ productId = 1 }) => {
  const product = await getProduct(productId);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <div style={{
        background: '#e8f5e9',
        border: '1px solid #a5d6a7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: '0.85em',
      }}>
        <strong>Pattern 1: Pushing State to Leaf Components</strong> - This entire page is a
        Server Component. Only the &quot;Add to Cart&quot; button below ships JavaScript to the browser.
        The product data, specs, and reviews are rendered entirely on the server.
      </div>

      <h1>{product.name}</h1>
      <p style={{ fontSize: '1.5em', color: '#2e7d32', fontWeight: 'bold' }}>${product.price}</p>
      <p>{product.description}</p>

      {/* These stay on the server - zero JS shipped */}
      <ProductSpecs specs={product.specs} />
      <ReviewList reviews={product.reviews} />

      {/* Only this ships JS to the client */}
      <AddToCartButton productId={product.id} productName={product.name} />
    </div>
  );
};

export default ProductPage;
