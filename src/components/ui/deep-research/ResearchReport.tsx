"use client";
import { useDeepResearchStore } from "@/store/deepResearch";
import React, { ComponentPropsWithRef, useRef } from "react";
import { Card } from "../card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download } from "lucide-react";
import { Button } from "../button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeProps = ComponentPropsWithRef<"code"> & {
    inline?: boolean;
};

const ResearchReport = () => {
    const { report, isCompleted, isLoading, topic } = useDeepResearchStore();
    const markdownRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!markdownRef.current) return;
    
        const styles = `
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: sans-serif;
                    padding: 40px;
                    overflow-wrap: break-word; /* Asegura que los textos largos no se corten */
                }
                pre, code {
                    white-space: pre-wrap;
                    word-wrap: break-word; /* Agregado para evitar corte de palabra */
                    page-break-inside: avoid;
                    break-inside: avoid;
                    overflow-wrap: break-word;
                }
                .prose {
                    max-width: 100%;
                }
                h1, h2, h3, p, ul, ol, table {
                    page-break-inside: avoid;
                }
                table, th, td {
                    border: 1px solid #ccc;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    text-align: left;
                }
                pre {
                    background-color: #f3f3f3;
                    padding: 1rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    margin: 0;
                    overflow-x: auto; /* Asegura que los bloques de código no se corten */
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
            </style>
        `;
    
        const html = ` 
            <html>
                <head>${styles}</head>
                <body>
                    <div class="prose">${markdownRef.current.innerHTML}</div>
                </body>
            </html>
        `;
    
        try {
            const response = await fetch("/api/generate-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ htmlContent: html }),
            });
    
            const pdfBlob = await response.blob();
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${topic}-InvestigAI.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al generar el PDF:", error);
        }
    };
    

    const handleMarkdownDownload = () => {
        const content = report.split("<report>")[1].split("</report>")[0];
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${topic}-research-report.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isCompleted) return null;

    if (report.length <= 0 && isLoading) {
        return (
            <Card className="p-4 max-w-[50vw] bg-white/60 border px-4 py-2 rounded-xl">
                <div className="flex flex-col items-center justify-center space-y-4 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-muted-foreground">
                        Realizando la investigación...
                    </p>
                </div>
            </Card>
        );
    }

    if (report.length <= 0) return null;

    return (
        <Card
            className="max-w-[90vw] xl:max-w-[60vw] relative px-4 py-6 rounded-xl border-black/10 border-solid shadow-none p-6
     bg-white/60 backdrop-blur-xl border antialiased
    "
        >
            <div className="flex justify-end gap-2 mb-4 absolute top-4 right-4">
                <Button
                    size="sm"
                    className="flex items-center gap-2 rounded"
                    onClick={handleDownloadPDF}
                >
                    <Download className="w-4 h-4" /> Exportar PDF
                </Button>
                <Button
                    size="sm"
                    className="flex items-center gap-2 rounded"
                    onClick={handleMarkdownDownload}
                >
                    <Download className="w-4 h-4" /> Descargar
                </Button>
            </div>

            <div
                ref={markdownRef}
                className="prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-scroll"
                style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                }}
            >
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 className="text-2xl font-bold mb-6">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-bold mt-5 mb-4">{children}</h3>,
                        p: ({ children }) => <p className="mb-4">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
                        li: ({ children }) => <li className="pl-3 mb-2 list-none">{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-4">
                                {children}
                            </blockquote>
                        ),
                        hr: () => <hr className="my-6 border-gray-300" />,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        del: ({ children }) => <del className="text-gray-500">{children}</del>,
                        kbd: ({ children }) => (
                            <kbd className="bg-gray-200 px-2 py-1 rounded text-xs font-mono border border-gray-400">
                                {children}
                            </kbd>
                        ),
                        pre: ({ children }) => (
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto mb-4">{children}</pre>
                        ),
                        strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
                        table: ({ children }) => (
                            <table className="w-full border-separate border-spacing-0 border border-gray-300 mb-5 rounded-md overflow-hidden">
                                {children}
                            </table>
                        ),
                        thead: ({ children }) => <thead className="bg-gray-100 border-b">{children}</thead>,
                        th: ({ children }) => (
                            <th className="border px-4 py-2 text-left font-semibold">{children}</th>
                        ),
                        td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline hover:text-blue-800 font-medium hover:cursor-pointer"
                            >
                                {children}
                            </a>
                        ),
                        code({ className, children, inline, ...props }: CodeProps) {
                            const match = /language-(\w+)/.exec(className || "");
                            const language = match ? match[1] : "";

                            if (!inline && language) {
                                return (
                                    <SyntaxHighlighter
                                        language={language}
                                        style={nightOwl}
                                        PreTag="div"
                                        customStyle={{
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            overflow: "hidden",
                                            fontSize: "0.875rem",
                                            pageBreakInside: "avoid",
                                            breakInside: "avoid",
                                            margin: 0,
                                        }}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                );
                            }

                            return (
                                <code
                                    style={{
                                        background: "#f3f3f3",
                                        padding: "0.2em 0.4em",
                                        borderRadius: "4px",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {report.split("<report>")[1].split("</report>")[0]}
                </Markdown>
            </div>
        </Card>
    );
};

export default ResearchReport;
