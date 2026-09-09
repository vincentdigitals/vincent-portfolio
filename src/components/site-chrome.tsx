import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><Link className="wordmark" href="/">OV<span>.</span></Link><nav aria-label="Main navigation"><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav><Link className="header-note" href="/about">Field notes <span>↗</span></Link></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div><p className="eyebrow">OMOSEEBI VINCENT</p><p className="footer-line">Understanding the constraint before prescribing the fix.</p></div><div className="footer-links"><Link href="/privacy">Privacy</Link><a href="mailto:hello@omoseebivincent.com">Contact</a><span>© 2026</span></div></footer>;
}
