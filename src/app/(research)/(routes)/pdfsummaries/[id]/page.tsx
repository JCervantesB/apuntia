import prismadb from "@/lib/prismadb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
    params: Promise<{ id: string }>;
}

const extractReport = (text: string) => {
    const match = text.match(/<report>([\s\S]*?)<\/report>/);
    return match ? match[1].trim() : text;
};

const PdfSummaryReport = async ({ params }: Props) => {
    const { id } = await params;

    const pdfSummary = await prismadb.pdfSummary.findUnique({
        where: { id },
    });

    if (!pdfSummary) return <p>Resumen PDF no encontrado</p>;

    const markdown = extractReport(pdfSummary.summaryText);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/60 backdrop-blur-xl rounded-xl border border-black/10 antialiased mt-20">
            <div className="prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-auto">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-extrabold mb-8 mt-12">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-bold mb-6 mt-10">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mb-5 mt-8">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="mb-6 leading-relaxed text-lg">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="ml-4">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-400 pl-6 italic text-gray-600 mb-8">
                                {children}
                            </blockquote>
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
                        hr: () => (
                            <hr className="my-12 border-gray-300" />
                        ),
                    }}
                >
                    {markdown}
                </Markdown>

            </div>
        </div>
    );
};

export default PdfSummaryReport;
