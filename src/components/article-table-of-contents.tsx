"use client";

import { useEffect, useState } from "react";

export type TableOfContentsItem = {
  id: string;
  text: string;
  key: string;
};

export default function ArticleTableOfContents({ items }: { items: TableOfContentsItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const headings = items.map((item) => document.getElementById(item.id)).filter((heading): heading is HTMLElement => Boolean(heading));
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="article-toc" aria-label="Table of contents">
      <details className="article-toc-details" open>
        <summary>Table of contents</summary>
        <ol>
          {items.map((item) => (
            <li key={item.key} className={activeId === item.id ? "is-active" : undefined}>
              <a href={`#${item.id}`} aria-current={activeId === item.id ? "location" : undefined}>{item.text}</a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
