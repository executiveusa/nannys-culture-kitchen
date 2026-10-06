import { useState, type ReactNode } from 'react';

const NAV_ITEMS = [
  { href: '/menu', label: 'Menu' },
  { href: '/worksites', label: 'Worksites' },
  { href: '/events', label: 'Pop-ups & Events' },
  { href: '/garden', label: 'The Dome' },
  { href: '/story', label: 'Story' },
];

export function NannyPublicLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nck-site">
      <a className="nck-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="nck-header">
        <a className="nck-wordmark" href="/" aria-label="Nanny's Culture Kitchen home">
          <span className="nck-wordmark-main">Nanny’s</span>
          <span className="nck-wordmark-sub">Culture Kitchen</span>
        </a>

        <nav className="nck-desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nck-header-cta" href="/worksites#book-worksite">
          Book a worksite lunch
        </a>

        <button
          type="button"
          className="nck-menu-button"
          aria-expanded={menuOpen}
          aria-controls="nck-mobile-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="nck-menu-button-label">Menu</span>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>

        {menuOpen && (
          <nav id="nck-mobile-nav" className="nck-mobile-nav" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="nck-mobile-primary" href="/worksites#book-worksite" onClick={() => setMenuOpen(false)}>
              Book a worksite lunch
            </a>
          </nav>
        )}
      </header>

      <main id="main-content">{children}</main>

      <footer className="nck-footer">
        <div>
          <p className="nck-footer-name">Nanny’s Culture Kitchen</p>
          <p>Puerto Vallarta · 100% plant-based · Worksites · Pop-ups · Events</p>
        </div>
        <div className="nck-footer-links">
          <a href="/worksites">Worksites</a>
          <a href="/events">Events</a>
          <a href="/story">Story</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
}
