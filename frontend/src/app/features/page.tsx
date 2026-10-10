import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  { number: "01", title: "Repository exploration",
    description: "Get a structured view of files and source symbols in a project.",
    details: ["Browse files and symbols", "Inspect source locations"] },
  { number: "02", title: "Code relationship graph",
    description: "See how functions, classes, files and imports relate.",
    details: ["Filter by node type", "Search symbols by name"] },
  { number: "03", title: "Caller and callee tracing",
    description: "Inspect functions that call a symbol and functions it calls.",
    details: ["Inspect a selected function", "Follow connected code paths"] },
  { number: "04", title: "Impact analysis",
    description: "Start understanding a function's reach before changing it.",
    details: ["Explore function impact", "Keep source context in view"] },
  { number: "05", title: "Focused search",
    description: "Narrow a busy graph to the names and node types you need.",
    details: ["Search graph nodes", "Filter relevant entities"] },
  { number: "06", title: "Source-aware context",
    description: "Connect the abstract graph back to real source files.",
    details: ["View paths and line metadata", "Move from structure to code"] },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="landing-container">
        <section className="landing-page-hero">
          <span className="landing-eyebrow">PRODUCT / CAPABILITIES</span>
          <h1>Explore the code behind the <span className="landing-orange">code.</span></h1>
          <p className="landing-lede">
            Move from repository overview to the relationships that matter.
            TENVOR helps make complex codebases easier to navigate and reason about.
          </p>
        </section>

        <section className="landing-section">
          <div className="landing-section-heading">
            <div>
              <span className="landing-eyebrow">WHAT YOU CAN DO</span>
              <h2>Built around how developers investigate.</h2>
            </div>
            <p>Start with the graph, then follow the paths and details that answer your question.</p>
          </div>

          <div className="landing-feature-grid">
            {features.map((feature) => (
              <article className="landing-feature" key={feature.number}>
                <span className="landing-card-number">↗ {feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul>{feature.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-cta-band">
          <div className="landing-container landing-cta-inner">
            <div>
              <span className="landing-eyebrow">LESS GUESSING. MORE CONTEXT.</span>
              <h2>Give your codebase a map.</h2>
            </div>
            <Link className="landing-button primary" href="/repositories">Explore your repositories ↗</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
