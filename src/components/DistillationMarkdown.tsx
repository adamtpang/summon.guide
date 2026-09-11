import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const token = /(\*\*.+?\*\*|`.+?`|\*[^*]+?\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(token).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a key={index} href={link[2]} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export function DistillationMarkdown({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let ordered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={`p-${blocks.length}`}>{inline(paragraph.join(" "))}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    const items = list.map((item, index) => <li key={index}>{inline(item)}</li>);
    blocks.push(
      ordered ? <ol key={`ol-${blocks.length}`}>{items}</ol> : <ul key={`ul-${blocks.length}`}>{items}</ul>
    );
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const numbered = /^\d+\.\s+(.+)$/.exec(line);
    if (bullet || numbered) {
      flushParagraph();
      const nextOrdered = Boolean(numbered);
      if (list.length && ordered !== nextOrdered) flushList();
      ordered = nextOrdered;
      list.push((bullet || numbered)![1]);
      continue;
    }

    flushList();
    if (line === "---") {
      flushParagraph();
      blocks.push(<hr key={`hr-${blocks.length}`} />);
    } else if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push(<h3 key={`h3-${blocks.length}`}>{inline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{inline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      flushParagraph();
    } else if (line.startsWith("> ")) {
      flushParagraph();
      blocks.push(<blockquote key={`quote-${blocks.length}`}>{inline(line.slice(2))}</blockquote>);
    } else {
      paragraph.push(line);
    }
  }

  flushParagraph();
  flushList();
  return <div className="distillation-body">{blocks}</div>;
}
