export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "codebase-as-graph",
    title: "Understanding Codebases as Graphs",
    description:
      "Why representing source code as a property graph unlocks intelligence that flat file search cannot provide.",
    date: "2025-10-01",
    category: "Architecture",
    readingTime: "6 min",
    content: `
## The limits of flat file search

When most developers want to find something in a codebase, they reach for grep or a fuzzy file finder. These tools are fast and familiar, but they treat source code as flat text — a bag of lines with no understanding of structure.

Ask grep "what functions call this one?" and you get a list of matches that may or may not be actual call relationships. Ask it "what is the full impact chain if I modify this class?" and you get nothing useful at all.

This is the fundamental problem that code graph databases solve.

## Nodes and edges

A code graph represents the entities in your codebase as nodes and the relationships between them as edges.

Nodes might include:

- Files
- Functions
- Classes
- Variables
- Import statements

Edges capture relationships:

- \`defined_in\` — a function is defined in a file
- \`imports\` — a file imports a module
- \`calls\` — a function calls another function
- \`inherits_from\` — a class extends another

This structure allows queries that are impossible with text search:

\`\`\`
Find all functions that transitively call parse_file()
\`\`\`

\`\`\`
Find all files affected if the signature of process_request() changes
\`\`\`

## Graph traversal vs text search

A text search for "parse_file" returns every line that contains those characters. A graph traversal finds every node reachable from the \`parse_file\` function node by following \`calls\` edges.

The result is semantically accurate. It doesn't match comments or string literals. It doesn't miss indirect callers.

## TENVOR's approach

TENVOR builds this graph automatically from your repository. Tree-sitter parses source files and extracts entities and call relationships. Those entities are stored as nodes and edges in Neo4j.

The graph can then be queried via REST API or explored through the interactive graph UI.
`,
  },
  {
    slug: "codebase-intelligence-matters",
    title: "Why Codebase Intelligence Matters",
    description:
      "As codebases scale to millions of lines, the ability to reason about structure becomes a competitive advantage.",
    date: "2025-09-24",
    category: "Engineering",
    readingTime: "5 min",
    content: `
## Scale breaks intuition

A small codebase is easy to reason about. A single developer can hold most of it in their head. They know what depends on what, which modules are stable, and which are frequently changed.

As codebases scale — past 100,000 lines, past 500,000 lines — that intuition breaks down. No single person has a complete mental model. Knowledge becomes siloed. Changes made in one corner of the system have unexpected effects in another.

This is not a problem of developer skill. It is a problem of information.

## The cost of opaque codebases

When developers cannot easily understand a codebase, several things happen:

**Slower onboarding.** New engineers spend weeks or months trying to understand what exists and how it fits together.

**Conservative refactoring.** Nobody wants to touch code they don't understand. Technical debt compounds.

**Change-related bugs.** Without understanding the impact of a change, regressions happen that shouldn't.

**Fear of deletion.** Dead code accumulates because no one is confident a given function is truly unused.

## What codebase intelligence provides

A codebase intelligence platform turns these opaque systems into navigable graphs. Developers can:

- Search for any function or class and see exactly where it is defined
- Understand what calls a given function and what that function calls
- Trace the full impact chain of a proposed change
- Navigate relationships across file and module boundaries

This transforms the question "what does this code do and who depends on it?" from a matter of guesswork to a matter of a single query.

## TENVOR

TENVOR applies this approach to any GitHub repository. Import a codebase, and the platform parses it, builds the call graph, and makes it searchable in seconds.

The goal is not to replace code review or human understanding, but to give developers the structural context they need to work confidently in large codebases.
`,
  },
  {
    slug: "tree-sitter-parsing",
    title: "Tree-sitter and Source Code Parsing",
    description:
      "How Tree-sitter's incremental parser enables fast, accurate extraction of code structure across multiple languages.",
    date: "2025-09-17",
    category: "Technology",
    readingTime: "7 min",
    content: `
## What is Tree-sitter?

Tree-sitter is a parser generator and incremental parsing library developed at GitHub. It produces a concrete syntax tree (CST) for source code, and it can re-parse changed sections incrementally — making it fast enough for real-time use in editors.

Unlike regex-based approaches or simple AST parsers, Tree-sitter:

- Handles syntax errors gracefully (produces a partial tree rather than failing)
- Supports multiple languages with a unified API
- Is extremely fast — most files parse in milliseconds
- Produces a lossless tree that includes whitespace and comments

## How TENVOR uses Tree-sitter

TENVOR uses Tree-sitter to extract structured information from source files:

**Functions.** Tree-sitter identifies function definitions, including their name and line number, across Python, JavaScript, and TypeScript.

**Classes.** Class definitions are extracted with their name and location.

**Imports.** Import statements are captured to understand module dependencies.

**Call relationships.** Function call expressions are identified, and TENVOR attempts to resolve them to known function definitions to build the call graph.

## The parsing pipeline

\`\`\`
Repository file
  → Read file content
  → Tree-sitter parse (language-specific grammar)
  → Walk syntax tree
  → Extract entities (functions, classes, imports)
  → Identify call expressions
  → Resolve calls to known functions
  → Emit ParseResult
\`\`\`

## Limitations

Tree-sitter operates on a per-file basis. It cannot resolve calls across module boundaries using type information or runtime behavior. TENVOR uses a name-based heuristic: if a call expression matches a known function name, an edge is created.

This means call resolution is approximate. Dynamic dispatch, higher-order functions, and dynamically named calls may not be captured. For most codebases, however, the resulting graph is accurate enough to be genuinely useful.
`,
  },
  {
    slug: "call-graphs-impact-analysis",
    title: "Call Graphs and Impact Analysis",
    description:
      "How to trace function call chains to understand the blast radius of any code change.",
    date: "2025-09-10",
    category: "Engineering",
    readingTime: "6 min",
    content: `
## What is a call graph?

A call graph is a directed graph where nodes are functions and edges represent calls between them. An edge from A to B means "function A calls function B."

Call graphs have been used by compilers, static analysis tools, and profilers for decades. In the context of codebase intelligence, they serve a specific purpose: understanding how a change to one function affects the rest of the system.

## Callers and callees

Given a function \`process_request\`:

**Callers** are functions that call \`process_request\`. If you change the signature or behavior of \`process_request\`, these are the functions that will be directly affected.

**Callees** are functions that \`process_request\` calls. Understanding what a function depends on is essential for reasoning about its behavior.

## Impact analysis

Impact analysis extends this idea. Instead of just asking "who calls this function?", it asks "if this function changes, what is the full set of affected code?"

A simple approach: follow caller edges upward. If A calls B and B calls C, a change to C affects B and A.

TENVOR currently provides direct callers and callees, plus all relationships involving a given function. This gives a first-order view of impact.

## Using impact analysis

Before refactoring a function, query its callers. If there are 20 callers spread across 10 files, the refactor requires changes in all those places. If there are 0 callers, the function may be dead code.

Before changing a function's behavior, query its callees. Understanding what helper functions it depends on is essential for safe modification.

\`\`\`
GET /graph/functions/parse_file/callers
GET /graph/functions/parse_file/callees
GET /graph/functions/parse_file/impact
\`\`\`

TENVOR exposes all three views and presents them in the Impact Analysis page.
`,
  },
  {
    slug: "neo4j-developer-tooling",
    title: "Neo4j for Developer Tooling",
    description:
      "Why a native graph database is the right choice for storing and querying code relationship data.",
    date: "2025-09-03",
    category: "Technology",
    readingTime: "5 min",
    content: `
## Why a graph database?

Code relationships are inherently graph-structured. Functions call other functions. Classes inherit from other classes. Files import modules that import other modules.

Relational databases can represent graphs, but traversal is expensive — it requires recursive joins or CTEs that quickly become unwieldy. Document stores lack the traversal semantics needed for efficient graph queries.

A native graph database stores relationships as first-class objects and traverses them in constant time per hop, regardless of graph size.

## Neo4j

Neo4j is the most widely-used native graph database. It stores data as nodes, relationships, and properties — directly matching the mental model of a code graph.

Queries are written in Cypher, a declarative language designed for graph traversal:

\`\`\`cypher
MATCH (caller:CodeNode)-[r:RELATES {type: "calls"}]->(target:CodeNode)
WHERE target.name = "parse_file"
RETURN caller.name, caller.file_path
\`\`\`

This query finds all functions that call \`parse_file\` — a traversal that would require multiple JOINs in SQL.

## TENVOR's data model

TENVOR stores all code entities as \`CodeNode\` nodes with properties:

- \`id\` — unique identifier
- \`node_type\` — file, function, class, or import
- \`name\` — entity name
- \`file_path\` — source file location
- \`line\` — line number

Relationships use a single \`RELATES\` type with a \`type\` property: \`calls\`, \`defined_in\`, or \`imports\`.

This simple schema is flexible enough to represent all current entity types and extensible for future additions like variable references, type annotations, or decorator relationships.

## Performance

For codebases with tens of thousands of nodes and hundreds of thousands of edges — common for medium-sized projects — Neo4j traversals are fast enough for interactive use, typically returning results in under 100ms.

TENVOR uses bolt protocol connections managed by the official Neo4j Python driver, with connection pooling for concurrent requests.
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
