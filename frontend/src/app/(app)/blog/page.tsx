"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog/posts";

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--text)", letterSpacing: "-0.04em" }}
        >
          Blog
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
          Technical writing on codebase intelligence, graph databases, and developer tooling.
        </p>
      </div>

      {/* Featured post */}
      {featured && (
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-subtle)" }}>
            Featured
          </p>
          <Link href={`/blog/${featured.slug}`}>
            <div
              className="group rounded-xl border p-6 transition-colors"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <CategoryChip category={featured.category} />
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {formatDate(featured.date)} · {featured.readingTime} read
                </span>
              </div>
              <h2
                className="mb-2 text-lg font-semibold tracking-tight"
                style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
              >
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {featured.description}
              </p>
              <p
                className="mt-4 text-xs font-medium"
                style={{ color: "var(--text-subtle)" }}
              >
                Read article →
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
          Categories:
        </span>
        {categories.map((cat) => (
          <CategoryChip key={cat} category={cat} />
        ))}
      </div>

      {/* Article grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div
              className="group h-full rounded-lg border p-5 transition-colors"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <CategoryChip category={post.category} />
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {post.readingTime} read
                </span>
              </div>
              <h3
                className="mb-1.5 text-sm font-semibold leading-snug"
                style={{ color: "var(--text)" }}
              >
                {post.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {post.description}
              </p>
              <p
                className="mt-3 text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                {formatDate(post.date)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoryChip({ category }: { category: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
      style={{ background: "var(--bg-subtle)", color: "var(--text-muted)" }}
    >
      {category}
    </span>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
