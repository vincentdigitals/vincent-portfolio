"use client";

import { useState } from "react";

type ArticleShareProps = {
  title: string;
  url: string;
};

export default function ArticleShare({ title, url }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function shareAnywhere() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // The user cancelled the native share sheet.
      }
    }
    await copyLink();
  }

  return (
    <div className="article-share" aria-label="Share this article">
      <p className="eyebrow">SHARE</p>
      <div className="article-share-links">
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          X ↗
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          LinkedIn ↗
        </a>
        <button type="button" onClick={shareAnywhere}>
          Share ↗
        </button>
        <button type="button" onClick={copyLink}>
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
