'use client';

// Comments - Client Component
//
// This component receives a promise that was started on the server
// and resolves it using React's `use()` hook. The fetch begins early
// (on the server, close to the data source) but doesn't block the
// server render. The comments stream in when the promise resolves.

import React, { use, useState } from 'react';

const Comments = ({ commentsPromise }) => {
  const comments = use(commentsPromise);
  const [likes, setLikes] = useState({});

  const toggleLike = (commentId) => {
    setLikes((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment.id} style={{
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
            <strong>{comment.author}</strong>
            <span style={{ color: '#999', fontSize: '0.85em' }}>{comment.time}</span>
          </div>
          <p style={{ margin: '0 0 8px' }}>{comment.text}</p>
          <button
            type="button"
            onClick={() => toggleLike(comment.id)}
            style={{
              padding: '4px 12px',
              cursor: 'pointer',
              borderRadius: 4,
              border: '1px solid #ccc',
              background: likes[comment.id] ? '#e3f2fd' : '#fff',
              fontSize: '0.85em',
            }}
          >
            {likes[comment.id] ? 'Liked' : 'Like'}
          </button>
        </div>
      ))}
      <p style={{ color: '#666', fontSize: '0.85em', marginTop: 16 }}>
        These comments were fetched via a promise started on the server
        and resolved on the client with <code>use()</code>.
        The like buttons are interactive Client Component features.
      </p>
    </div>
  );
};

export default Comments;
