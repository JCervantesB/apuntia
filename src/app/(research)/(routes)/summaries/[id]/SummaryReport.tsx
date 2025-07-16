/* eslint-disable @typescript-eslint/no-explicit-any */
import prismadb from "@/lib/prismadb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
    id: string;
}

const extractReport = (text: string) => {
    const match = text.match(/<report>([\s\S]*?)<\/report>/);
    return match ? match[1].trim() : text;
};

const SummaryReport = async ({ id }: Props) => {
    const summary = await prismadb.summary.findUnique({
        where: { id },
    });

    if (!summary) return <p>Apunte no encontrado</p>;

    const markdown = extractReport(summary.summaryText);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/60 backdrop-blur-xl rounded-xl border border-black/10 antialiased mt-20">
            <div className="prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-auto">
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
                        code({ className, children, inline }: any) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter language={match[1]} style={nightOwl} PreTag="div">
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="bg-gray-100 p-1 rounded">{children}</code>
                            );
                        },
                    }}
                >
                    {markdown}
                </Markdown>
            </div>
        </div>
    );
};

export default SummaryReport;
