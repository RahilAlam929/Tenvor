import Link from "next/link";

export default function Navbar() {
  return (
    <header className="tv-nav">
      <div className="tv-wrap tv-nav-inner">
        <Link href="/" className="tv-brand" aria-label="TENVOR home">
          <span className="tv-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 4V28M5 10L27 22M5 22L27 10" stroke="currentColor" strokeWidth="1.7"/>
              <circle cx="16" cy="16" r="4" fill="#d88c55" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="16" cy="4" r="2" fill="currentColor"/>
              <circle cx="5" cy="10" r="2" fill="currentColor"/>
              <circle cx="27" cy="10" r="2" fill="currentColor"/>
              <circle cx="5" cy="22" r="2" fill="currentColor"/>
              <circle cx="27" cy="22" r="2" fill="currentColor"/>
              <circle cx="16" cy="28" r="2" fill="currentColor"/>
            </svg>
          </span>
          <span className="tv-brand-word">TENVOR<span>.</span></span>
        </Link>

        <nav className="tv-nav-links" aria-label="Main navigation">
          <Link href="/features">Capabilities</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/docs">Documentation</Link>
        </nav>

        <div className="tv-nav-actions">
          <Link className="tv-nav-secondary" href="/repositories">Repositories</Link>
          <Link className="tv-button tv-button-dark tv-button-small" href="/overview">
            Open workspace <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
