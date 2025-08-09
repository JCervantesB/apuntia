"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MarkdownDownloadButtonProps {
  content: string;
  filename: string;
}

export function MarkdownDownloadButton({ content, filename }: MarkdownDownloadButtonProps) {
  const handleMarkdownDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="secondary"
      onClick={handleMarkdownDownload}
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
    >
      <Download className="w-4 h-4 mr-2" />
      Descargar Markdown
    </Button>
  );
}