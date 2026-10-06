"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

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
      <div className="article-share-heading">
        <p className="eyebrow">SHARE THIS ARTICLE</p>
        <p className="article-share-hint">Send it to someone who might find it useful.</p>
      </div>

      <div className="article-share-links">
        <a
          className="article-share-button article-share-button-x"
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="Share on X"
        >
          <span className="article-share-x-icon" aria-hidden="true">𝕏</span>
          <span>X</span>
        </a>

        <a
          className="article-share-button"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <span className="article-share-li-icon" aria-hidden="true">in</span>
          <span>LinkedIn</span>
        </a>

        <button
          className="article-share-button"
          type="button"
          onClick={shareAnywhere}
          title="Share this article"
        >
          <Share2 size={16} strokeWidth={1.8} aria-hidden="true" />
          <span>Share</span>
        </button>

        <button
          className="article-share-button"
          type="button"
          onClick={copyLink}
          title={copied ? "Link copied" : "Copy article link"}
        >
          {copied ? (
            <Check size={16} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Copy size={16} strokeWidth={1.8} aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
