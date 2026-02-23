// Pattern 3: Extracting State into a Wrapper Component
//
// The ColorProvider is a Client Component that holds theme state.
// Header, MainContent, and Footer are Server Components passed as children.
// Because ThemePage (a Server Component) is the "owner" that imports and
// renders them, they stay on the server — even though they're visually
// nested inside the Client Component ColorProvider.

import React from 'react';
import ColorProvider from './ColorProvider';

async function getPageData() {
  await new Promise((resolve) => setTimeout(resolve, 80));

  return {
    headerTitle: 'RSC Migration Patterns',
    navItems: ['Home', 'Patterns', 'Docs', 'About'],
    content: {
      title: 'Pattern 3: State Extraction',
      body: 'This page demonstrates extracting state (theme toggle) into a wrapper component. The Header, MainContent, and Footer below are all Server Components — they ship zero JavaScript. Only the ColorProvider (which holds the theme state) and its toggle button are Client Components.',
      features: [
        'Theme state is isolated in ColorProvider (Client Component)',
        'Header, MainContent, Footer remain Server Components',
        'Children pass through the client boundary without becoming client code',
        'Heavy rendering logic stays on the server',
      ],
    },
    footerText: 'Built with React on Rails Pro RSC',
    year: new Date().getFullYear(),
  };
}

function Header({ title, navItems }) {
  return (
    <header style={{
      padding: '16px 24px',
      borderBottom: '1px solid currentColor',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      opacity: 0.9,
    }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <nav style={{ display: 'flex', gap: 16 }}>
        {navItems.map((item) => (
          <span key={item} style={{ cursor: 'pointer' }}>{item}</span>
        ))}
      </nav>
    </header>
  );
}

function MainContent({ content }) {
  return (
    <main style={{ padding: 24, minHeight: 300 }}>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
      <ul>
        {content.features.map((f) => (
          <li key={f} style={{ marginBottom: 8 }}>{f}</li>
        ))}
      </ul>
    </main>
  );
}

function Footer({ text, year }) {
  return (
    <footer style={{
      padding: '16px 24px',
      borderTop: '1px solid currentColor',
      textAlign: 'center',
      opacity: 0.7,
      fontSize: '0.9em',
    }}>
      {text} - {year}
    </footer>
  );
}

const ThemePage = async () => {
  const data = await getPageData();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <div style={{
        background: '#fce4ec',
        border: '1px solid #f48fb1',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: '0.85em',
        color: '#333',
      }}>
        <strong>Pattern 3: Extracting State into a Wrapper</strong> — The theme toggle
        is a Client Component wrapper. Header, MainContent, and Footer are Server Components
        passed as children — they stay on the server even though they appear inside the
        client-side ColorProvider.
      </div>

      <ColorProvider>
        <Header title={data.headerTitle} navItems={data.navItems} />
        <MainContent content={data.content} />
        <Footer text={data.footerText} year={data.year} />
      </ColorProvider>
    </div>
  );
};

export default ThemePage;
