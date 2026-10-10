"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog/posts";

// ─── Category color map ──────────────────────────────────────────────────────

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

const FILTER_CATEGORIES = ["All", "Architecture", "Engineering", "Technology"] as const;
type FilterCategory = (typeof FILTER_CATEGORIES)[number];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const isFiltered = search.trim().length > 0 || activeFilter !== "All";

  const filteredPosts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return BLOG_POSTS.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesFilter = activeFilter === "All" || p.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const featured = !isFiltered ? BLOG_POSTS[0] : null;
  const gridPosts = isFiltered ? filteredPosts : filteredPosts.slice(1);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="mb-8">
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

      {/* ── Search + filter row ──────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-subtle)", pointerEvents: "none" }}
          />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-8 pr-3 text-sm outline-none"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-primary-subtle)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-1.5">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
              style={
                activeFilter === cat
                  ? {
                      background: "var(--accent-primary)",
                      borderColor: "var(--accent-primary)",
                      color: "#fff",
                    }
                  : {
                      background: "transparent",
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }
              }
              onMouseEnter={(e) => {
                if (activeFilter !== cat) {
                  e.currentTarget.style.borderColor = "var(--text-subtle)";
                  e.currentTarget.style.color = "var(--text)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured article ─────────────────────────────────────────────────── */}
      {featured && <FeaturedCard post={featured} />}

      {/* ── Results count when filtering ─────────────────────────────────────── */}
      {isFiltered && (
        <p className="mb-4 text-xs" style={{ color: "var(--text-subtle)" }}>
          {filteredPosts.length === 0
            ? "No articles found"
            : `${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"}`}
        </p>
      )}

      {/* ── Article grid ─────────────────────────────────────────────────────── */}
      {gridPosts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {gridPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : isFiltered ? (
        <EmptyState query={search} filter={activeFilter} onClear={() => { setSearch(""); setActiveFilter("All"); }} />
      ) : null}
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  const gradient = CATEGORY_GRADIENTS[post.category] ?? CATEGORY_GRADIENTS.Architecture;

  return (
    <div className="mb-8">
      <p
        className="mb-3 text-xs font-medium uppercase tracking-wider"
        style={{ color: "var(--text-subtle)" }}
      >
        Featured
      </p>
      <Link href={`/blog/${post.slug}`}>
        <div
          className="group overflow-hidden rounded-xl border transition-shadow"
          style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--text-subtle)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Gradient header bar */}
          <div
            className="h-2 w-full"
            style={{ background: gradient }}
            aria-hidden
          />
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <CategoryBadge category={post.category} />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                {formatDate(post.date)} · {post.readingTime} read
              </span>
            </div>
            <h2
              className="mb-2 text-lg font-semibold tracking-tight"
              style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {post.description}
            </p>
            <div className="mt-4 flex items-center gap-1">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--accent-primary, #6366f1)" }}
              >
                Read article →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Article card ─────────────────────────────────────────────────────────────

function ArticleCard({ post }: { post: BlogPost }) {
  const gradient = CATEGORY_GRADIENTS[post.category] ?? CATEGORY_GRADIENTS.Architecture;

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="group flex h-full flex-col overflow-hidden rounded-lg border transition-shadow"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--text-subtle)";
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Gradient header bar */}
        <div
          className="h-1.5 w-full flex-shrink-0"
          style={{ background: gradient }}
          aria-hidden
        />
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <CategoryBadge category={post.category} />
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
          <p
            className="flex-1 text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {post.description}
          </p>
          <p className="mt-3 text-xs" style={{ color: "var(--text-subtle)" }}>
            {formatDate(post.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const colors = CATEGORY_BADGE_COLORS[category] ?? {
    bg: "var(--bg-subtle)",
    text: "var(--text-muted)",
  };
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
      style={{ background: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({
  query,
  filter,
  onClear,
}: {
  query: string;
  filter: FilterCategory;
  onClear: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center rounded-xl border py-16 text-center"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <Search size={28} style={{ color: "var(--text-subtle)" }} className="mb-3" />
      <p className="mb-1 text-sm font-medium" style={{ color: "var(--text)" }}>
        No articles found
      </p>
      <p className="mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
        {query && filter !== "All"
          ? `No "${filter}" articles matching "${query}"`
          : query
          ? `No articles matching "${query}"`
          : `No articles in "${filter}"`}
      </p>
      <button
        onClick={onClear}
        className="rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "var(--text-subtle)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-muted)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        Clear filters
      </button>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
