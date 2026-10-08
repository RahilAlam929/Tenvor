import type { Metadata } from "next";
import { BookOpen, Share2, Code2, Network, Search, Zap, GitFork } from "lucide-react";

export const metadata: Metadata = { title: "Documentation" };

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen size={16} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
            Documentation
          </span>
        </div>
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
        >
          TENVOR Documentation
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A technical reference for the TENVOR codebase intelligence platform.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* What is TENVOR */}
        <DocSection icon={Share2} title="What is TENVOR?">
          <p>
            TENVOR is a codebase intelligence platform. It ingests source code repositories,
            parses them using Tree-sitter, extracts structured information about functions, classes,
            and imports, and stores it all in a Neo4j graph database.
          </p>
          <p>
            The result is an interactive, queryable code intelligence graph. Developers can
            search the codebase, trace function call chains, understand what breaks when a
            function changes, and navigate relationships across files and modules.
          </p>
        </DocSection>

        {/* Repository ingestion */}
        <DocSection icon={GitFork} title="Repository ingestion">
          <p>
            TENVOR clones any public GitHub repository via the repository import endpoint.
            The clone is shallow (<code>--depth 1</code>) for performance.
          </p>
          <p>
            After cloning, the repository is scanned to enumerate files and detect languages
            based on file extension. The result includes file count, language distribution,
            and a file listing for display.
          </p>
          <CodeExample>
{`POST /repositories/import
Content-Type: application/json

{
  "url": "https://github.com/owner/repository"
}`}
          </CodeExample>
          <p>
            The response includes a <code>repository_id</code>, file count, language map,
            and the list of scanned files.
          </p>
        </DocSection>

        {/* Tree-sitter parsing */}
        <DocSection icon={Code2} title="Tree-sitter parsing">
          <p>
            Source files are parsed with Tree-sitter, a fast, language-agnostic parser
            that produces a concrete syntax tree. TENVOR uses Tree-sitter to extract:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Function definitions (name, line)</li>
            <li>Class definitions (name, line)</li>
            <li>Import statements</li>
            <li>Function call relationships (caller → callee)</li>
          </ul>
          <p>
            Currently supported languages: Python, JavaScript, TypeScript.
          </p>
        </DocSection>

        {/* Code graph */}
        <DocSection icon={Network} title="Code graph">
          <p>
            Parsed entities become nodes in a property graph:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li><code>file</code> — a source file</li>
            <li><code>function</code> — a function definition</li>
            <li><code>class</code> — a class definition</li>
            <li><code>import</code> — an import statement</li>
          </ul>
          <p>
            Edges represent relationships: <code>defined_in</code>, <code>imports</code>,
            and <code>calls</code>.
          </p>
          <CodeExample>
{`GET /graph/nodes?node_type=function
GET /graph/relationships
GET /graph/stats`}
          </CodeExample>
        </DocSection>

        {/* Neo4j */}
        <DocSection icon={Network} title="Neo4j graph database">
          <p>
            All nodes and relationships are stored in Neo4j, a native graph database.
            TENVOR uses Cypher queries to retrieve, traverse, and search the graph.
          </p>
          <p>
            Neo4j is configured via environment variables:
          </p>
          <CodeExample>
{`NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password`}
          </CodeExample>
        </DocSection>

        {/* Code search */}
        <DocSection icon={Search} title="Code search">
          <p>
            TENVOR supports full-text search across all node names and file paths.
            Search uses a Cypher <code>CONTAINS</code> query for case-insensitive matching.
          </p>
          <CodeExample>
{`GET /graph/search?q=parse_file`}
          </CodeExample>
          <p>
            Results include the node type, file path, and line number where available.
            A maximum of 50 results are returned per query.
          </p>
        </DocSection>

        {/* Call graph */}
        <DocSection icon={Code2} title="Call graph">
          <p>
            TENVOR tracks call relationships between functions. For any function, you can query:
          </p>
          <ul className="list-inside list-disc space-y-1 pl-2">
            <li>Callers — functions that call this function</li>
            <li>Callees — functions this function calls</li>
          </ul>
          <CodeExample>
{`GET /graph/functions/{function_name}/callers
GET /graph/functions/{function_name}/callees`}
          </CodeExample>
        </DocSection>

        {/* Impact analysis */}
        <DocSection icon={Zap} title="Impact analysis">
          <p>
            The impact endpoint returns all call relationships that involve a given function —
            both as source and target. This gives a complete view of how a function
            is connected to the rest of the codebase.
          </p>
          <CodeExample>
{`GET /graph/functions/{function_name}/impact`}
          </CodeExample>
          <p>
            Use the Impact Analysis page in TENVOR to explore these relationships visually.
          </p>
        </DocSection>

        {/* API */}
        <DocSection icon={Code2} title="API usage">
          <p>
            The TENVOR API is a FastAPI application. It runs at{" "}
            <code>http://127.0.0.1:8001</code> by default in development.
            Set <code>NEXT_PUBLIC_API_URL</code> to override.
          </p>
          <p>Available endpoints:</p>
          <CodeExample>
{`GET    /health
POST   /repositories/import
GET    /graph/nodes?node_type=
GET    /graph/relationships
GET    /graph/stats
GET    /graph/search?q=
GET    /graph/functions/{name}/callers
GET    /graph/functions/{name}/callees
GET    /graph/functions/{name}/impact`}
          </CodeExample>
          <p>
            FastAPI provides interactive documentation at{" "}
            <a
              href="http://127.0.0.1:8001/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text)", textDecoration: "underline" }}
            >
              /docs
            </a>{" "}
            (Swagger UI) when running locally.
          </p>
        </DocSection>
      </div>
    </div>
  );
}

// ─── Components ────────────────────────────────────────────────────────────

function DocSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-4" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="mb-3 flex items-center gap-2">
        <span style={{ color: "var(--text-muted)" }}><Icon size={16} /></span>
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="flex flex-col gap-3 text-sm leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {children}
      </div>
    </section>
  );
}

function CodeExample({ children }: { children: string }) {
  return (
    <pre
      className="overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed"
      style={{
        background: "var(--bg-subtle)",
        borderColor: "var(--border)",
        color: "var(--text)",
        fontFamily: "var(--font-geist-mono, monospace)",
      }}
    >
      {children}
    </pre>
  );
}
