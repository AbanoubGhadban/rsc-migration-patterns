// Pattern 5: Server-to-Client Promise Handoff
//
// The post data is awaited on the server (critical, needed for SEO).
// The comments promise is started on the server but NOT awaited —
// it's passed to the Comments Client Component which resolves it
// using React's `use()` hook. This avoids blocking the server render
// while still starting the fetch early (close to the data source).

import React, { Suspense } from 'react';
import Comments from './Comments';

async function getPost(id) {
  // Critical data — await it (needed for the initial render)
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id,
    title: 'Understanding React Server Components',
    author: 'Jane Developer',
    date: 'February 22, 2026',
    body: `React Server Components represent a fundamental shift in how we build React applications.
Unlike traditional SSR, where the server renders HTML but still ships all component JavaScript to
the client for hydration, RSC keeps server components entirely on the server. The client never
receives their code.

This means heavy dependencies used in server components — markdown parsers, date formatting
libraries, database clients — never end up in your client bundle. Only components marked with
'use client' ship JavaScript to the browser.

The migration guide covers five key patterns for restructuring your component tree to take
advantage of this architecture. This blog post page itself demonstrates Pattern 5: the
server-to-client promise handoff.`,
  };
}

function getComments(postId) {
  // Non-critical data — start the fetch but DON'T await
  // This promise will be passed to the client component
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, author: 'Alex', text: 'Great explanation! The donut pattern was new to me.', time: '2 hours ago' },
        { id: 2, author: 'Sam', text: 'We migrated our app using these patterns. Reduced client bundle by 40%.', time: '1 hour ago' },
        { id: 3, author: 'Jordan', text: 'The promise handoff pattern is clever. Love that the fetch starts on the server.', time: '45 min ago' },
        { id: 4, author: 'Taylor', text: 'Can you do a follow-up on Server Actions?', time: '20 min ago' },
      ]);
    }, 800); // Simulates slow comments API
  });
}

const BlogPost = async ({ postId = 1 }) => {
  // Await critical data (the post itself)
  const post = await getPost(postId);

  // Start but DON'T await non-critical data (comments)
  const commentsPromise = getComments(postId);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <div style={{
        background: '#fff8e1',
        border: '1px solid #ffcc80',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: '0.85em',
      }}>
        <strong>Pattern 5: Server-to-Client Promise Handoff</strong> — The blog post above
        is awaited on the server and renders immediately. The comments below are fetched via
        a promise that starts on the server but resolves on the client using React&apos;s{' '}
        <code>use()</code> hook. This avoids blocking the server render.
      </div>

      <article>
        <h1>{post.title}</h1>
        <div style={{ color: '#666', marginBottom: 16, fontSize: '0.9em' }}>
          By {post.author} | {post.date}
        </div>
        {post.body.split('\n\n').map((paragraph, i) => (
          <p key={i} style={{ lineHeight: 1.7 }}>{paragraph}</p>
        ))}
      </article>

      <hr style={{ margin: '32px 0' }} />

      {/* Comments stream in when the promise resolves */}
      <Suspense fallback={
        <div style={{
          padding: 24,
          textAlign: 'center',
          color: '#999',
          background: '#fafafa',
          borderRadius: 8,
        }}>
          Loading comments...
        </div>
      }>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
};

export default BlogPost;
