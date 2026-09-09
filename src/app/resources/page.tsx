import Link from "next/link";
import { resources } from "@/lib/content";

export const metadata = { title: "Resources" };
export default function Resources() { return <div className="page"><section className="page-intro"><p className="eyebrow">RESOURCES / WORKING TOOLS</p><h1>Useful things to try.</h1><p>Worksheets, checklists, and frameworks for making the next question clearer.</p></section><section className="section"><div className="listing">{resources.map((resource) => <Link className="post" href={`/resources/${resource.slug}`} key={resource.slug}><span className="tag">{resource.type} / {resource.access}</span><h3>{resource.title}</h3><p>{resource.description}</p><span className="meta">TOPIC: {resource.topic}</span></Link>)}</div></section></div>; }
