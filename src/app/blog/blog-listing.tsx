import Link from "next/link";
import type { UrlObject } from "url";
import { getPostsPage, type Post } from "@/lib/content";

export const POSTS_PER_PAGE = 9;

function getPageNumbers(page: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", totalPages] as const;
  if (page >= totalPages - 3) return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis-end", totalPages] as const;
}

function pageHref(page: number): UrlObject {
  return { pathname: page === 1 ? "/blog" : `/blog/page/${page}` };
}

export default async function BlogListing({ page, data }: { page: number; data?: { posts: Post[]; total: number } }) {
  const pageData = data ?? await getPostsPage(page, POSTS_PER_PAGE);
  const { posts, total } = pageData;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  return (
    <div className="page">
      <section className="section blog-intro">
        <p className="eyebrow">BLOG</p>
        <h1>Thinking about product and growth.</h1>
        <p className="section-intro">Practical writing on customers, product discovery, positioning, marketing, sales, and the decisions that shape early-stage growth.</p>
      </section>
      <section className="section">
        <div className="listing">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">{post.topic}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="read-link">Read article →</span>
            </Link>
          ))}
          {posts.length === 0 && <p className="empty-state">New writing will appear here.</p>}
        </div>
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
      </section>
    </div>
  );
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const pageNumbers = getPageNumbers(page, totalPages);
  return (
    <nav className="pagination" aria-label="Blog pagination">
      {page > 1 ? <Link href={pageHref(page - 1)} aria-label="Go to previous page">← Previous</Link> : <span className="pagination-disabled">← Previous</span>}
      <span className="pagination-pages">
        {pageNumbers.map((pageNumber, index) => pageNumber === "ellipsis" || pageNumber === "ellipsis-end" ? (
          <span aria-hidden="true" key={`${pageNumber}-${index}`}>…</span>
        ) : pageNumber === page ? (
          <span className="pagination-current" aria-current="page" key={pageNumber}>{pageNumber}</span>
        ) : (
          <Link href={pageHref(pageNumber)} key={pageNumber}>{pageNumber}</Link>
        ))}
      </span>
      {page < totalPages ? <Link href={pageHref(page + 1)} aria-label="Go to next page">Next →</Link> : <span className="pagination-disabled">Next →</span>}
    </nav>
  );
}