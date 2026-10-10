import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CodeGraph from "@/components/landing/CodeGraph";

const capabilities = [
  {
    number: "01",
    title: "See the whole codebase",
    description: "Move from a directory of files to a connected view of modules, classes, functions and imports.",
    tag: "CODE GRAPH",
    mark: "⌘",
  },
  {
    number: "02",
    title: "Follow every connection",
    description: "Explore relationships between code elements and understand how one part of a system connects to another.",
    tag: "RELATIONSHIPS",
    mark: "⤳",
  },
  {
    number: "03",
    title: "Understand change impact",
    description: "Investigate related components before you edit. Make the likely blast radius easier to reason about.",
    tag: "IMPACT ANALYSIS",
    mark: "◎",
  },
  {
    number: "04",
    title: "Find your way faster",
    description: "Navigate repository structure and locate the code that matters without relying on memory alone.",
    tag: "CODE SEARCH",
    mark: "⌕",
  },
];

const steps = [
  {
    number: "01",
    title: "Bring in a repository",
    text: "Start with a codebase you want to understand. Keep your exploration focused on the project at hand.",
  },
  {
    number: "02",
    title: "Build the map",
    text: "TENVOR parses supported source files and builds a structured view of code elements and relationships.",
  },
  {
    number: "03",
    title: "Explore with context",
    text: "Move through the graph, inspect connections and use the resulting structure to guide your next change.",
  },
];

const useCases = [
  ["New to a codebase", "Build a mental model before your first meaningful change."],
  ["Planning a refactor", "Find connected areas to investigate before moving code around."],
  ["Reviewing a change", "Explore surrounding structure and ask better questions during review."],
];

export default function HomePage() {
  return (
    <main className="tv-home">
      <Navbar />

      <section className="tv-hero">
        <div className="tv-wrap">
          <div className="tv-hero-grid">
            <div className="tv-hero-copy">
              <div className="tv-kicker">
                <span className="tv-kicker-line"/>
                CODEBASE INTELLIGENCE FOR DEVELOPERS
              </div>
              <h1>Code is connected.<br/>Your tools should <em>show it.</em></h1>
              <p className="tv-hero-lede">
                TENVOR turns repository structure into something you can explore.
                See how files, functions and modules relate—so you can make changes
                with a clearer picture of the system.
              </p>
              <div className="tv-hero-actions">
                <Link href="/overview" className="tv-button tv-button-dark">
                  Explore your workspace <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/architecture" className="tv-text-link">
                  How it works <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="tv-hero-footnote">

                <span>Built for exploring real code, not just reading files.</span>
              </div>
            </div>

            <div className="tv-hero-visual">
              <div className="tv-visual-label tv-visual-label-top">
                <span>FIG. 01</span><span>FROM FILES TO RELATIONSHIPS</span>
              </div>
              <CodeGraph />
              <div className="tv-visual-note">
                <span className="tv-note-cross">✳</span>
                <span>Every connection tells<br/>part of the story.</span>
              </div>
            </div>
          </div>

          <div className="tv-hero-bottom">
            <span>LESS GUESSWORK</span>
            <span className="tv-hero-bottom-rule"/>
            <span>MORE CONTEXT</span>
            <span className="tv-hero-bottom-rule"/>
            <span>BETTER ENGINEERING DECISIONS</span>
          </div>
        </div>
      </section>

      <section className="tv-intro tv-section">
        <div className="tv-wrap tv-intro-grid">
          <div>
            <span className="tv-eyebrow">THE PROBLEM</span>
            <h2>A codebase can be readable and still be <em>hard to understand.</em></h2>
          </div>
          <div className="tv-intro-copy">
            <p>
              The larger a project gets, the harder it becomes to keep every
              dependency, call path and module boundary in your head.
              Finding a file is one thing. Understanding what depends on it is another.
            </p>
            <p>
              TENVOR gives you a structural view of your repository, helping you
              move from isolated files toward a clearer picture of how the system fits together.
            </p>
            <Link href="/features" className="tv-text-link">
              Explore the capabilities <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="tv-section tv-capabilities" id="capabilities">
        <div className="tv-wrap">
          <div className="tv-section-heading">
            <div>
              <span className="tv-eyebrow">A BETTER WAY TO EXPLORE</span>
              <h2>From source files to <em>system-level context.</em></h2>
            </div>
            <p>Useful context for the moments when “where is it?” turns into “what does it affect?”</p>
          </div>

          <div className="tv-capability-grid">
            {capabilities.map((item) => (
              <article className="tv-capability" key={item.number}>
                <div className="tv-capability-top">
                  <span className="tv-capability-number">{item.number}</span>
                  <span className="tv-capability-mark" aria-hidden="true">{item.mark}</span>
                </div>
                <div>
                  <span className="tv-eyebrow">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="tv-capability-bottom">
                  <span className="tv-mini-rule"/>
                  <span>EXPLORE</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-section tv-graph-section">
        <div className="tv-wrap tv-graph-feature-grid">
          <div className="tv-graph-feature-copy">
            <span className="tv-eyebrow">THE CODE GRAPH</span>
            <h2>See the relationships hiding <em>in plain sight.</em></h2>
            <p>
              A repository is more than a collection of files. It is a network
              of definitions, imports and dependencies. A graph gives those
              relationships a place you can inspect.
            </p>
            <ul className="tv-check-list">
              <li><span>↗</span> Navigate connected code elements</li>
              <li><span>↗</span> Follow relationships across a project</li>
              <li><span>↗</span> Use structure to guide your investigation</li>
            </ul>
            <Link href="/graph" className="tv-button tv-button-outline">
              Open code graph <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="tv-graph-feature-visual">
            <div className="tv-graph-side-label">STRUCTURE / RELATIONSHIPS / CONTEXT</div>
            <div className="tv-graph-large">
              <CodeGraph />
            </div>
            <div className="tv-graph-index"><span>01</span><span>CONNECTED SYSTEMS</span></div>
          </div>
        </div>
      </section>

      <section className="tv-section tv-process">
        <div className="tv-wrap">
          <div className="tv-section-heading">
            <div>
              <span className="tv-eyebrow">A SIMPLE WORKFLOW</span>
              <h2>Get oriented.<br/><em>Then get to work.</em></h2>
            </div>
            <p>Turn an unfamiliar repository into a starting point for focused exploration.</p>
          </div>

          <div className="tv-steps">
            {steps.map((step) => (
              <article className="tv-step" key={step.number}>
                <span className="tv-step-number">{step.number}</span>
                <div className="tv-step-line"/>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="tv-process-note">
            <span className="tv-process-star">✳</span>
            <p>Good engineering starts with a useful mental model.</p>
            <span className="tv-eyebrow">MAKE THE INVISIBLE VISIBLE</span>
          </div>
        </div>
      </section>

      <section className="tv-section tv-use-cases">
        <div className="tv-wrap tv-use-grid">
          <div className="tv-use-heading">
            <span className="tv-eyebrow">MADE FOR REAL WORK</span>
            <h2>Useful when the codebase is <em>new, growing or changing.</em></h2>
            <p>Bring more context to the everyday decisions developers make.</p>
            <Link href="/workspace" className="tv-text-link">
              Visit the workspace <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="tv-use-list">
            {useCases.map(([title, description], index) => (
              <article className="tv-use-item" key={title}>
                <span className="tv-use-number">0{index + 1}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <span className="tv-use-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tv-final-cta">
        <div className="tv-wrap tv-final-cta-inner">
          <div>
            <span className="tv-eyebrow">YOUR NEXT CHANGE STARTS HERE</span>
            <h2>Understand the structure.<br/><em>Change it with confidence.</em></h2>
          </div>
          <div className="tv-final-cta-action">
            <p>Start with the codebase. Follow the connections. Decide what to do next.</p>
            <Link href="/overview" className="tv-button tv-button-light">
              Open TENVOR workspace <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="tv-cta-decoration" aria-hidden="true">T.</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
