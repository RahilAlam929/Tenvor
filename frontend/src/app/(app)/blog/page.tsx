import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const articles = [
  {
    number: "01",
    category: "CODE UNDERSTANDING",
    read: "6 MIN READ",
    title: "A repository is more than a collection of files",
    description:
      "Files show where code lives. Relationships help explain how a system works. Here is why structural context matters when exploring an unfamiliar project.",
    href: "/blog/codebase-as-graph",
    label: "Explore architecture",
    kind: "network",
  },
  {
    number: "02",
    category: "ENGINEERING WORKFLOW",
    read: "5 MIN READ",
    title: "Before changing code, understand what depends on it",
    description:
      "A small edit can have a wider impact than expected. Learn to approach changes by investigating connected modules, callers and dependencies first.",
    href: "/blog/call-graphs-impact-analysis",
    label: "Explore impact analysis",
    kind: "impact",
  },
  {
    number: "03",
    category: "DEVELOPER TOOLS",
    read: "4 MIN READ",
    title: "From code search to code exploration",
    description:
      "Finding a symbol answers one question. Following its relationships can reveal the bigger picture. See how graph-based navigation changes the way you investigate code.",
    href: "/blog/tree-sitter-parsing",
    label: "Explore the code graph",
    kind: "search",
  },
];

const topics = [
  ["01", "Code intelligence", "Understanding the structure behind source code."],
  ["02", "Architecture", "Modules, relationships and system boundaries."],
  ["03", "Developer workflow", "More context for everyday engineering decisions."],
];

function ArticleArtwork({ kind }: { kind: string }) {
  return (
    <div className={`tv-blog-art tv-blog-art-${kind}`} aria-hidden="true">
      <div className="tv-blog-art-index">TENVOR / FIELD NOTES</div>
      {kind === "network" && (
        <svg viewBox="0 0 360 170" fill="none">
          <g stroke="#9aa397" strokeWidth="1.2">
            <path d="M180 33L85 83L132 136M180 33L275 83L228 136M85 83L180 104L275 83M132 136L180 104L228 136"/>
          </g>
          <g fill="#faf8f0" stroke="#28332f" strokeWidth="1.4">
            <rect x="143" y="19" width="74" height="29" rx="2"/>
            <rect x="47" y="69" width="76" height="29" rx="2"/>
            <rect x="237" y="69" width="76" height="29" rx="2"/>
            <rect x="94" y="122" width="76" height="29" rx="2"/>
            <rect x="190" y="122" width="76" height="29" rx="2"/>
          </g>
          <g fill="#28332f" fontFamily="monospace" fontSize="9" textAnchor="middle">
            <text x="180" y="37">CORE</text>
            <text x="85" y="87">PARSER</text>
            <text x="275" y="87">INDEX</text>
            <text x="132" y="140">MODULE A</text>
            <text x="228" y="140">MODULE B</text>
          </g>
          <g fill="#d88c55">
            <circle cx="180" cy="33" r="3.5"/>
            <circle cx="85" cy="83" r="3.5"/>
            <circle cx="275" cy="83" r="3.5"/>
          </g>
        </svg>
      )}
      {kind === "impact" && (
        <svg viewBox="0 0 360 170" fill="none">
          <g stroke="#9aa397" strokeWidth="1.2">
            <path d="M180 85L95 40M180 85L95 130M180 85L265 40M180 85L265 130"/>
          </g>
          <circle cx="180" cy="85" r="36" fill="#f0e1d2" stroke="#d88c55" strokeWidth="1.5"/>
          <circle cx="180" cy="85" r="23" stroke="#d88c55" strokeDasharray="3 4"/>
          <g fill="#faf8f0" stroke="#28332f" strokeWidth="1.2">
            <rect x="52" y="25" width="86" height="30" rx="2"/>
            <rect x="52" y="115" width="86" height="30" rx="2"/>
            <rect x="222" y="25" width="86" height="30" rx="2"/>
            <rect x="222" y="115" width="86" height="30" rx="2"/>
          </g>
          <g fill="#28332f" fontFamily="monospace" fontSize="9" textAnchor="middle">
            <text x="95" y="43">CALLER A</text>
            <text x="95" y="133">CALLER B</text>
            <text x="265" y="43">MODULE C</text>
            <text x="265" y="133">MODULE D</text>
            <text x="180" y="89">CHANGE</text>
          </g>
        </svg>
      )}
      {kind === "search" && (
        <svg viewBox="0 0 360 170" fill="none">
          <g stroke="#d9d8cc">
            <path d="M25 37H335M25 67H335M25 97H335M25 127H335"/>
          </g>
          <g fill="#798178" fontFamily="monospace" fontSize="10">
            <text x="29" y="28">01</text><text x="57" y="28">src / core / parser.py</text>
            <text x="29" y="58">02</text><text x="57" y="58">src / graph / builder.py</text>
            <text x="29" y="88">03</text><text x="57" y="88">src / api / routes.py</text>
            <text x="29" y="118">04</text><text x="57" y="118">src / index / repository.py</text>
          </g>
          <rect x="52" y="43" width="175" height="28" fill="#f0e1d2" stroke="#d88c55"/>
          <path d="M230 57H270L284 72L309 72" stroke="#d88c55" strokeWidth="1.4"/>
          <circle cx="309" cy="72" r="4" fill="#d88c55"/>
          <text x="57" y="61" fill="#28332f" fontFamily="monospace" fontSize="10">build_dependency_graph()</text>
        </svg>
      )}
      <div className="tv-blog-art-caption">
        <span>STRUCTURE / CONTEXT</span>
        <span>FIG. {kind === "network" ? "01" : kind === "impact" ? "02" : "03"}</span>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="tv-home tv-blog-page">
      <Navbar />

      <section className="tv-blog-hero">
        <div className="tv-wrap">
          <div className="tv-blog-kicker">
            <span className="tv-kicker-line"/>
            THE TENVOR JOURNAL
          </div>
          <div className="tv-blog-hero-grid">
            <div>
              <h1>Ideas for seeing<br/>the <em>bigger picture.</em></h1>
              <p>
                Notes on codebase intelligence, software architecture and the
                tools that help developers understand complex systems.
              </p>
            </div>
            <div className="tv-blog-hero-aside">
              <span className="tv-eyebrow">OUR POINT OF VIEW</span>
              <p>
                Better engineering starts with better context. We explore ways
                to make code relationships easier to see and software systems
                easier to reason about.
              </p>
              <div className="tv-blog-hero-rule"/>
              <span className="tv-eyebrow">FIELD NOTES FOR BUILDERS</span>
            </div>
          </div>
          <div className="tv-blog-hero-bottom">
            <span>RESEARCH &amp; IDEAS</span>
            <span className="tv-blog-rule"/>
            <span>ENGINEERING PRACTICE</span>
            <span className="tv-blog-rule"/>
            <span>CODE INTELLIGENCE</span>
          </div>
        </div>
      </section>

      <section className="tv-blog-featured">
        <div className="tv-wrap">
          <div className="tv-blog-section-label">
            <span className="tv-eyebrow">EDITOR'S PICK</span>
            <span className="tv-blog-small-index">FEATURED NOTE / 001</span>
          </div>
          <article className="tv-blog-featured-card">
            <div className="tv-blog-featured-copy">
              <span className="tv-blog-category">CODE UNDERSTANDING</span>
              <h2>Software gets complicated.<br/><em>Understanding it shouldn't.</em></h2>
              <p>
                A practical perspective on why code relationships matter,
                how developers build mental models and why structural context
                can make a repository feel less opaque.
              </p>
              <Link href="/blog/codebase-intelligence-matters" className="tv-button tv-button-dark">
                Explore the architecture <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="tv-blog-featured-art">
              <ArticleArtwork kind="network"/>
            </div>
          </article>
        </div>
      </section>

      <section className="tv-blog-articles">
        <div className="tv-wrap">
          <div className="tv-blog-section-heading">
            <div>
              <span className="tv-eyebrow">THE JOURNAL</span>
              <h2>Ideas worth <em>following.</em></h2>
            </div>
            <p>Short, focused reads for developers who want to understand not just where code lives, but how it fits together.</p>
          </div>

          <div className="tv-blog-article-list">
            {articles.map((article) => (
              <article className="tv-blog-article" key={article.number}>
                <div className="tv-blog-article-number">{article.number}</div>
                <Link href={article.href} className="tv-blog-article-image" aria-label={article.title}>
                  <ArticleArtwork kind={article.kind}/>
                </Link>
                <div className="tv-blog-article-copy">
                  <div className="tv-blog-article-meta">
                    <span>{article.category}</span>
                    <span>{article.read}</span>
                  </div>
                  <h3><Link href={article.href}>{article.title}</Link></h3>
                  <p>{article.description}</p>
                  <Link href={article.href} className="tv-text-link">
                    {article.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-blog-topics">
        <div className="tv-wrap tv-blog-topics-grid">
          <div>
            <span className="tv-eyebrow">EXPLORE BY THEME</span>
            <h2>Different angles.<br/><em>One connected picture.</em></h2>
            <p>Start with the part of software engineering you want to understand better.</p>
          </div>
          <div className="tv-blog-topic-list">
            {topics.map(([number, title, description]) => (
              <div className="tv-blog-topic" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <span className="tv-blog-topic-mark" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-blog-cta">
        <div className="tv-wrap tv-blog-cta-inner">
          <span className="tv-eyebrow">PUT IDEAS INTO PRACTICE</span>
          <h2>Curiosity is a good start.<br/><em>Context moves you forward.</em></h2>
          <p>Explore a repository, follow the connections and build a clearer mental model of your codebase.</p>
          <Link href="/overview" className="tv-button tv-button-light">
            Open the workspace <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
