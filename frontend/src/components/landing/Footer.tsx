import Link from "next/link";

export default function Footer() {
  return (
    <footer className="tv-footer">
      <div className="tv-wrap">
        <div className="tv-footer-main">
          <div className="tv-footer-brand">
            <Link href="/" className="tv-brand">
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
            <p>Understand the structure.<br/>See the connections. Change with confidence.</p>
          </div>

          <div className="tv-footer-column">
            <span className="tv-eyebrow">EXPLORE</span>
            <Link href="/features">Capabilities</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href="/graph">Code graph</Link>
          </div>

          <div className="tv-footer-column">
            <span className="tv-eyebrow">WORKSPACE</span>
            <Link href="/repositories">Repositories</Link>
            <Link href="/impact">Impact analysis</Link>
            <Link href="/search">Search code</Link>
          </div>

          <div className="tv-footer-column">
            <span className="tv-eyebrow">RESOURCES</span>
            <Link href="/docs">Documentation</Link>
            <Link href="/api-docs">API reference</Link>
            <Link href="/settings">Settings</Link>
          </div>
        </div>

        <div className="tv-footer-bottom">
          <span>© 2026 TENVOR. Built for curious engineers.</span>
          <span className="tv-footer-note"> Codebase intelligence, made visible.</span>
        </div>
      </div>
    </footer>
  );
}
