"use client";

import { useState } from "react";

type ArticleShareProps = {
  title: string;
  url: string;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="11" height="11" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

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
          <ShareIcon />
          <span>Share</span>
        </button>

        <button
          className="article-share-button"
          type="button"
          onClick={copyLink}
          title={copied ? "Link copied" : "Copy article link"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
