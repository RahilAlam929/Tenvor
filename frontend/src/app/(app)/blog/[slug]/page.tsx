import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";

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

// ─── Category color map ───────────────────────────────────────────────────────

const CATEGORY_GRADIENTS: Record<string, string> = {
  Architecture: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  Engineering: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  Technology: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
};

const CATEGORY_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Architecture: { bg: "rgba(99,102,241,0.12)", text: "#818cf8" },
  Engineering: { bg: "rgba(34,197,94,0.12)", text: "#4ade80" },
  Technology: { bg: "rgba(245,158,11,0.12)", text: "#fbbf24" },
};

export const instant = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const allPosts = BLOG_POSTS;
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const related = getRelatedPosts(slug, 3);
  const sections = parseContent(post.content);
  const headings = sections.filter(
    (b): b is { type: "h2"; text: string } => b.type === "h2",
  );

  const gradient =
    CATEGORY_GRADIENTS[post.category] ?? CATEGORY_GRADIENTS.Architecture;
  const badgeColors = CATEGORY_BADGE_COLORS[post.category] ?? {
    bg: "var(--bg-subtle)",
    text: "var(--text-muted)",
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* ── Back link ────────────────────────────────────────────── */}
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium blog-back-link"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={13} />
        Back to Blog
      </Link>

      <div className="flex gap-8">
        {/* ── Article ──────────────────────────────────────────── */}
        <article className="min-w-0 flex-1">
          {/* Category-colored header bar */}
          <div
            className="mb-6 h-1.5 w-full rounded-full"
            style={{ background: gradient }}
            aria-hidden="true"
          />

          {/* Header */}
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
                style={{ background: badgeColors.bg, color: badgeColors.text }}
              >
                {post.category}
              </span>
              <span
                className="inline-flex items-center gap-1 text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                <Calendar size={11} />
                {date}
              </span>
              <span
                className="inline-flex items-center gap-1 text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                <Clock size={11} />
                {post.readingTime} read
              </span>
            </div>
            <h1
              className="mb-3 text-balance text-2xl font-semibold"
              style={{
                color: "var(--text)",
                letterSpacing: "-0.04em",
                lineHeight: "1.3",
              }}
            >
              {post.title}
            </h1>
            <p
              className="text-base"
              style={{ color: "var(--text-muted)", lineHeight: "1.75" }}
            >
              {post.description}
            </p>
          </header>

          {/* Divider */}
          <div className="mb-8 h-px" style={{ background: "var(--border)" }} />

          {/* Content */}
          <div style={{ lineHeight: "1.8" }}>
            {sections.map((section, i) => (
              <ContentBlock key={i} block={section} />
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-2.5 py-0.5 text-xs"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-subtle)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Prev / Next navigation ────────────────────────── */}
          {(prevPost || nextPost) && (
            <nav
              className="mt-12 grid gap-3 border-t pt-8"
              style={{
                borderColor: "var(--border)",
                gridTemplateColumns:
                  prevPost && nextPost ? "1fr 1fr" : "1fr",
              }}
            >
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="blog-nav-card rounded-lg border p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "var(--border)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <p
                    className="mb-1 flex items-center gap-1 text-xs"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    <ArrowLeft size={11} />
                    Previous
                  </p>
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: "var(--text)" }}
                  >
                    {prevPost.title}
                  </p>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className={`blog-nav-card rounded-lg border p-4 text-right${!prevPost ? " col-start-1" : ""}`}
                  style={{
                    background: "var(--bg-elevated)",
                    borderColor: "var(--border)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <p
                    className="mb-1 flex items-center justify-end gap-1 text-xs"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Next
                    <ArrowRight size={11} />
                  </p>
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: "var(--text)" }}
                  >
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </nav>
          )}

          {/* ── Related articles ─────────────────────────────── */}
          {related.length > 0 && (
            <section
              className="mt-12 border-t pt-8"
              style={{ borderColor: "var(--border)" }}
            >
              <p
                className="mb-4 text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Related articles
              </p>
              <div className="flex flex-col gap-3">
                {related.map((p) => {
                  const bc = CATEGORY_BADGE_COLORS[p.category] ?? {
                    bg: "var(--bg-subtle)",
                    text: "var(--text-muted)",
                  };
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="blog-related-card flex items-start gap-3 rounded-lg border p-3"
                      style={{
                        background: "var(--bg-elevated)",
                        borderColor: "var(--border)",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="mt-0.5 inline-flex flex-shrink-0 items-center rounded px-2 py-0.5 text-xs"
                        style={{ background: bc.bg, color: bc.text }}
                      >
                        {p.category}
                      </span>
                      <div>
                        <p
                          className="text-sm font-medium leading-snug"
                          style={{ color: "var(--text)" }}
                        >
                          {p.title}
                        </p>
                        <p
                          className="mt-0.5 text-xs"
                          style={{ color: "var(--text-subtle)" }}
                        >
                          {p.readingTime} read
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        {/* ── Table of Contents (desktop sidebar) ─────────────── */}
        {headings.length > 0 && (
          <aside className="hidden w-48 flex-shrink-0 xl:block">
            <div className="sticky top-8">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-subtle)" }}
              >
                Contents
              </p>
              <nav className="flex flex-col gap-1">
                {headings.map((h, i) => (
                  <a
                    key={i}
                    href={`#${slugifyHeading(h.text)}`}
                    className="toc-link text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// ─── Content parsing & rendering ─────────────────────────────────────────

type Block =
  | { type: "h2"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; text: string }
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
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "code", lang, text: codeLines.join("\n") });
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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`(.+?)`/g,
      `<code style="font-family:monospace;color:var(--text);background:var(--bg-subtle);padding:1px 5px;border-radius:3px;font-size:0.85em;border:1px solid var(--border-subtle)">$1</code>`,
    );
}

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mb-3 mt-10 text-base font-semibold"
          style={{
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: "1.4",
          }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p
          className="mb-5 text-sm"
          style={{ color: "var(--text-muted)", lineHeight: "1.85" }}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(block.text) }}
        />
      );

    case "code":
      return (
        <div
          className="mb-5 overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--border)" }}
        >
          {block.lang && (
            <div
              className="flex items-center px-4 py-1.5"
              style={{
                background: "var(--bg-subtle)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                {block.lang}
              </span>
            </div>
          )}
          <pre
            className="overflow-x-auto p-4 text-xs leading-relaxed"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text)",
              fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
              margin: 0,
            }}
          >
            <code>{block.text}</code>
          </pre>
        </div>
      );

    case "list":
      return (
        <ul className="mb-5 flex flex-col gap-2 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "var(--text-muted)", lineHeight: "1.75" }}
            >
              <span
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: "var(--text-subtle)" }}
                aria-hidden="true"
              />
              <span
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
              />
            </li>
          ))}
        </ul>
      );
  }
}
