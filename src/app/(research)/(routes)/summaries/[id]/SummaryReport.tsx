import prismadb from "@/lib/prismadb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ProfessionalPDFButton } from "@/components/ui/ProfessionalPDFButton";
import "@/styles/pdf-styles.css";
import { ReactNode } from "react";

// Interfaz para los props del componente code
interface CodeProps {
    className?: string | undefined;
    children?: ReactNode;
    inline?: boolean;
}

interface Props {
    id: string;
}

const extractReport = (text: string) => {
    const match = text.match(/<report>([\s\S]*?)<\/report>/);
    return match && match[1] ? match[1].trim() : text;
};

const SummaryReport = async ({ id }: Props) => {
    const summary = await prismadb.summary.findUnique({
        where: { id },
    });

    if (!summary) return <p>Apunte no encontrado</p>;

    const markdown = extractReport(summary.summaryText);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-900/90 via-gray-800/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-white/20 ring-1 ring-white/10 antialiased mt-20">
            {/* Botón de descarga PDF */}
            <div className="flex justify-end mb-4">
                <ProfessionalPDFButton 
                    summaryData={{
                        id: summary.id,
                        title: summary.title,
                        content: summary.summaryText,
                        createdAt: summary.createdAt
                    }}
                    filename={`resumen-${summary.id}`}
                />
            </div>
            
            {/* Contenido del resumen optimizado para PDF */}
            <div 
                id="summary-content" 
                className="pdf-content prose prose-sm md:prose-base max-w-none prose-pre:p-2 overflow-x-auto bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-white/30"
                style={{
                    // Estilos específicos para mejorar la generación de PDF
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    lineHeight: '1.6',
                    color: '#1f2937',
                    backgroundColor: '#ffffff'
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
                        code({ className = '', children, inline }: CodeProps) {
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
