import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split content into sections for rendering
  const sections = parseContent(post.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-8">
      {/* Back */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={13} />
        Blog
      </Link>

      {/* Header */}
      <header className="mb-8 mt-4">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
            style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
          >
            {post.category}
          </span>
          <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
            {date} · {post.readingTime} read
          </span>
        </div>
        <h1
          className="text-balance text-2xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
        >
          {post.title}
        </h1>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {post.description}
        </p>
      </header>

      {/* Divider */}
      <div className="mb-8 h-px" style={{ background: "var(--border)" }} />

      {/* Content */}
      <div className="prose-tenvor">
        {sections.map((section, i) => (
          <ContentBlock key={i} block={section} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <p className="mb-4 text-sm font-medium" style={{ color: "var(--text)" }}>
          More articles
        </p>
        <div className="flex flex-col gap-3">
          {BLOG_POSTS.filter((p) => p.slug !== post.slug)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex items-start gap-3"
              >
                <span
                  className="mt-0.5 inline-flex items-center rounded px-2 py-0.5 text-xs"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", flexShrink: 0 }}
                >
                  {p.category}
                </span>
                <span
                  className="text-sm leading-snug group-hover:underline"
                  style={{ color: "var(--text)" }}
                >
                  {p.title}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}

// ─── Content rendering ─────────────────────────────────────────────────────

type Block =
  | { type: "h2"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; text: string }
  | { type: "list"; items: string[] };

function parseContent(md: string): Block[] {
  const lines = md.trim().split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "code", text: codeLines.join("\n") });
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "list", items });
    } else if (line.trim() !== "") {
      blocks.push({ type: "paragraph", text: line });
      i++;
    } else {
      i++;
    }
  }

  return blocks;
}

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          className="mb-3 mt-8 text-base font-semibold"
          style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p
          className="mb-4 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
          dangerouslySetInnerHTML={{
            __html: block.text
              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
              .replace(/`(.+?)`/g, `<code style="font-family:monospace;color:var(--text);background:var(--bg-subtle);padding:1px 4px;border-radius:3px;font-size:0.875em">$1</code>`),
          }}
        />
      );

    case "code":
      return (
        <pre
          className="mb-4 overflow-x-auto rounded-lg border p-4 text-xs leading-relaxed"
          style={{
            background: "var(--bg-subtle)",
            borderColor: "var(--border)",
            color: "var(--text)",
            fontFamily: "var(--font-geist-mono, monospace)",
          }}
        >
          {block.text}
        </pre>
      );

    case "list":
      return (
        <ul className="mb-4 flex flex-col gap-1.5 pl-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "var(--text-subtle)" }} />
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/`(.+?)`/g, `<code style="font-family:monospace;color:var(--text);background:var(--bg-subtle);padding:1px 4px;border-radius:3px;font-size:0.875em">$1</code>`),
                }}
              />
            </li>
          ))}
        </ul>
      );
  }
}
