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
import { ProfessionalPDFButton } from "../ProfessionalPDFButton";
import "@/styles/pdf-styles.css";

type CodeProps = ComponentPropsWithRef<"code"> & {
    inline?: boolean;
};

const ResearchReport = () => {
    const { report, isCompleted, isLoading, topic } = useDeepResearchStore();
    const markdownRef = useRef<HTMLDivElement>(null);


      
    const handleMarkdownDownload = () => {
        const reportParts = report.split("<report>");
        const content = reportParts.length > 1 && reportParts[1] ? reportParts[1].split("</report>")[0] : report;
        const blob = new Blob([content || report], { type: "text/markdown" });
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
            className="max-w-[90vw] xl:max-w-[60vw] relative px-4 py-6 rounded-xl bg-gradient-to-br from-slate-900/90 via-gray-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 ring-1 ring-white/10 shadow-2xl antialiased"
        >
            <div className="flex justify-end gap-2 mb-4">
                <ProfessionalPDFButton 
                    summaryData={{
                        id: `research-${Date.now()}`,
                        title: topic || 'Investigación',
                        content: report,
                        createdAt: new Date()
                    }}
                    filename={`investigacion-${topic || 'reporte'}`}
                />
                <Button
                    onClick={handleMarkdownDownload}
                    variant="secondary"
                    size="sm"
                    className="gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                >
                    <Download className="w-4 h-4" /> Descargar Markdown
                </Button>
            </div>

            <div
                ref={markdownRef}
                id="summary-content"
                className="pdf-content prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-auto bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-white/30"
                style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    lineHeight: '1.6',
                    color: '#1f2937',
                    backgroundColor: '#ffffff',
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                }}
            >
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900 mt-3 mb-2 pb-1.5 border-b-2 border-purple-600">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold text-gray-900 mt-2.5 mb-1.5 pb-1 border-b border-purple-400">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1.5">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-sm font-bold text-gray-900 mt-1.5 mb-1">{children}</h4>,
                        h5: ({ children }) => <h5 className="text-xs font-bold text-gray-900 mt-1.5 mb-1">{children}</h5>,
                        h6: ({ children }) => <h6 className="text-xs font-bold text-gray-900 mt-1 mb-1">{children}</h6>,
                        p: ({ children }) => <p className="text-sm leading-relaxed text-gray-800 mb-1.5 text-justify">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                        li: ({ children }) => <li className="text-sm leading-snug text-gray-800 mb-1 ml-4">{children}</li>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-purple-500 pl-2 py-2 mt-1.5 mb-2 italic text-purple-800 bg-purple-50 text-sm leading-snug">
                                {children}
                            </blockquote>
                        ),
                        hr: () => <hr className="my-2.5 border-gray-200" />,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        del: ({ children }) => <del className="text-gray-500">{children}</del>,
                        kbd: ({ children }) => (
                            <kbd className="bg-gray-200 px-2 py-1 rounded text-xs font-mono border border-gray-400">
                                {children}
                            </kbd>
                        ),
                        pre: ({ children }) => (
                            <pre className="border-blue-500 font-mono text-xs leading-tight text-slate-800 overflow-x-auto">{children}</pre>
                        ),
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                        table: ({ children }) => (
                            <div className="pdf-table-container mt-2 mb-2">
                                <table className="w-full border-collapse border border-gray-300">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
                        th: ({ children }) => (
                            <th className="border border-gray-300 px-2 py-2 text-left font-bold text-gray-800 bg-gray-100 text-xs">{children}</th>
                        ),
                        td: ({ children }) => <td className="border border-gray-300 px-2 py-2 text-gray-700 text-xs">{children}</td>,
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
                        code({ className, children, inline, ..._props }: CodeProps) { // eslint-disable-line @typescript-eslint/no-unused-vars
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <div className="bg-gray-800 border-l-4 border-blue-400 rounded-md my-2 mx-0 overflow-hidden">
                                    <div className="bg-gray-700 px-3 py-1 text-xs text-gray-300 font-medium border-b border-gray-600">
                                        {match[1]?.toUpperCase() || 'CODE'}
                                    </div>
                                    <SyntaxHighlighter 
                                        language={match[1] || 'text'} 
                                        style={nightOwl} 
                                        PreTag="div"
                                        customStyle={{
                                            margin: '0',
                                            padding: '1rem',
                                            borderRadius: '0',
                                            fontSize: '0.75rem',
                                            lineHeight: '1.4',
                                            backgroundColor: '#1f2937',
                                            color: '#f8fafc',
                                            border: 'none',
                                            fontFamily: 'Consolas, Monaco, "Courier New", monospace'
                                        }}
                                        showLineNumbers={true}
                                        lineNumberStyle={{
                                            color: '#6b7280',
                                            fontSize: '0.7rem',
                                            paddingRight: '1rem',
                                            minWidth: '2rem'
                                        }}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <code className="bg-slate-50 px-1 py-0.5 rounded text-xs font-mono text-slate-800">{children}</code>
                            );
                        }
                    }}
                >
                    {(() => {
                        const reportParts = report.split("<report>");
                        return reportParts.length > 1 && reportParts[1] ? reportParts[1].split("</report>")[0] : report;
                    })()}
                </Markdown>
            </div>
        </Card>
    );
};

export default ResearchReport;