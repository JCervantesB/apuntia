import prismadb from "@/lib/prismadb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfessionalPDFButton } from "@/components/ui/ProfessionalPDFButton";
import { MarkdownDownloadButton } from "@/components/ui/MarkdownDownloadButton";
import { ReactNode } from "react";

// Interfaz para los props del componente code
interface CodeProps {
    className?: string | undefined;
    children?: ReactNode;
    inline?: boolean;
}

interface Props {
    params: Promise<{ id: string }>;
}

const extractReport = (text: string) => {
    const match = text.match(/<report>([\s\S]*?)<\/report>/);
    return match && match[1] ? match[1].trim() : text;
};

const PdfSummaryReport = async ({ params }: Props) => {
    const { id } = await params;

    const pdfSummary = await prismadb.pdfSummary.findUnique({
        where: { id },
    });

    if (!pdfSummary) return <p>Resumen PDF no encontrado</p>;

    const markdown = extractReport(pdfSummary.summaryText);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-900/90 via-gray-800/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-white/20 ring-1 ring-white/10 antialiased mt-18">
            <div className="flex justify-between items-center mb-6">
                <div></div>
                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="gap-2"
                    >
                        <a
                            href={`${pdfSummary.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FileText className="w-4 h-4" />
                            PDF Original
                        </a>
                    </Button>
                    
                    <ProfessionalPDFButton
                        summaryData={{
                            id: pdfSummary.id,
                            title: "Resumen PDF",
                            content: markdown,
                            createdAt: new Date()
                        }}
                        filename={`pdf-summary-${pdfSummary.id}`}
                    />
                    
                    <MarkdownDownloadButton
                        content={markdown}
                        filename={`pdf-summary-${pdfSummary.id}`}
                    />
                </div>
            </div>

            <div className="prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-auto bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-white/30">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl font-extrabold mb-8 mt-12 text-gray-900 border-b-2 border-purple-600 pb-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-bold mb-6 mt-10 text-gray-900 border-b border-purple-400 pb-1">{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl font-semibold mb-5 mt-8 text-gray-900">{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className="mb-6 leading-relaxed text-lg text-gray-800">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-800">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="ml-4 text-gray-800" style={{ display: 'list-item' }}>{children}</li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-purple-500 pl-6 italic text-purple-800 bg-purple-50 mb-8 py-2 rounded-r">
                                {children}
                            </blockquote>
                        ),
                        code({ className = '', children, inline }: CodeProps) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <div className="bg-gray-800 border-l-4 border-blue-400 rounded-md my-2 mx-0 overflow-hidden">
                                    <div className="bg-gray-700 px-3 py-1 text-xs text-gray-300 font-medium border-b border-gray-600">
                                        {match[1]?.toUpperCase() || 'CODE'}
                                    </div>
                                    <SyntaxHighlighter 
                                        language={match[1] || 'text'} 
                                        style={oneDark} 
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
                                <code className="bg-purple-100 text-purple-800 p-1 rounded font-mono text-sm">{children}</code>
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
