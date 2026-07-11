import type { MDXComponents } from "mdx/types";
import {
  YouTubeEmbed,
  PDFViewer,
  AudioPlayer,
  ImageWithCaption,
  ImageGallery,
  Callout,
  PromptExample,
  DownloadButton,
  Homework,
  Quiz,
  CodeBlock,
  AIIcon,
} from "@/components/mdx";
import { Top50AITabs } from "@/components/lessons/Top50AITabs";
import { Top50PromptsTabs } from "@/components/lessons/Top50PromptsTabs";

export function getMDXComponents(): MDXComponents {
  return {
    // Custom components available in MDX
    YouTubeEmbed,
    PDFViewer,
    AudioPlayer,
    ImageWithCaption,
    ImageGallery,
    Callout,
    PromptExample,
    DownloadButton,
    Homework,
    Quiz,
    CodeBlock,
    AIIcon,
    Top50AITabs,
    Top50PromptsTabs,
    // Override default HTML elements with styled versions
    h1: (props) => (
      <h1
        className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-8 mb-3 text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-6 mb-2 text-xl font-semibold text-foreground"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="mt-4 mb-2 text-lg font-semibold text-foreground"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mb-4 leading-7 text-foreground/85 [&:not(:first-child)]:mt-4"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mb-4 ml-6 list-disc space-y-1.5 text-foreground/85 marker:text-primary/50"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-4 ml-6 list-decimal space-y-1.5 text-foreground/85"
        {...props}
      />
    ),
    li: (props) => <li className="leading-7" {...props} />,
    a: (props) => (
      <a
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-4 border-primary/30 bg-muted/30 py-3 px-5 italic text-foreground/70 rounded-r-lg"
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/50 shadow-sm">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-muted/50 border-b border-border/50" {...props} />,
    th: (props) => (
      <th
        className="px-4 py-3 text-left font-semibold text-foreground/90"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-3 text-foreground/80 border-t border-border/30"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-border/50" />,
    code: (props) => (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground/90"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-xl border border-border/50 bg-[#0d1117] p-4 shadow-lg"
        {...props}
      />
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="my-6 rounded-xl border border-border/50 shadow-lg max-w-full h-auto"
        loading="lazy"
        alt={props.alt || ""}
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    em: (props) => <em className="text-foreground/80" {...props} />,
  };
}
