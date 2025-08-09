'use server';

import { auth } from "@clerk/nextjs/server";
import { fetchAndExtractPdfText } from "./langchain";
import { getPdfSummary, getPdfSummaryFromGemini } from "./open-router";
import prismadb from "@/lib/prismadb";

interface PdfSummaryType {
    userId?: string;
    originalFileName: string;
    title: string;
    summaryText: string;
    uploadKey?: string;
    fileUrl?: string;
}

export async function generatePdfSummary(
    uploadResponse: [
        {
            name: string;
            size: number;
            key: string;
            lastModified: number;
            serverData: {
                userId: string;
                fileUrl: string;
                fileName: string;
            };
            url: string;
            appUrl: string;
            ufsUrl: string;
            customId: null | string;
            type: string;
            fileHash: string;
        }
    ]
) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'Fallo la subida del archivo',
            data: null,
        };
    }

    const {
        serverData: {
            userId: _userId, // eslint-disable-line @typescript-eslint/no-unused-vars
            fileUrl: pdfUrl,
            fileName: _fileName, // eslint-disable-line @typescript-eslint/no-unused-vars
        }
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'URL del archivo PDF no disponible.',
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        if (!pdfText) {
            return {
                success: false,
                message: 'No se pudo extraer el texto del PDF.',
                data: null,
            };
        }

        try {
            const summaryResponse = await getPdfSummary(pdfText);
            console.log('getPdfSummary response:', summaryResponse);

            if (summaryResponse.success && summaryResponse.summary && summaryResponse.summary.trim()) {
                return {
                    success: true,
                    message: "Resumen generado exitosamente",
                    data: summaryResponse.summary.trim(),
                };
            }

            console.warn('getPdfSummary no generó resumen válido, intentando Gemini...');
            const geminiResponse = await getPdfSummaryFromGemini(pdfText);
            console.log('getPdfSummaryFromGemini response:', geminiResponse);

            if (geminiResponse.success && geminiResponse.summary && geminiResponse.summary.trim()) {
                return {
                    success: true,
                    message: "Resumen generado exitosamente con Gemini",
                    data: geminiResponse.summary.trim(),
                };
            } else {
                return {
                    success: false,
                    message: geminiResponse.error || 'Fallo al generar el resumen con Gemini',
                    data: null,
                };
            }
        } catch (error) {
            console.error('Error generando resumen:', error);
            return {
                success: false,
                message: 'Error interno generando resumen',
                data: null,
            };
        }


    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: 'Ocurrió un error inesperado',
            data: null,
        };
    }
}

export async function storePdfSummaryAction({
    userId: _userId, // eslint-disable-line @typescript-eslint/no-unused-vars
    originalFileName,
    title,
    summaryText,
    uploadKey,
    fileUrl,
}: PdfSummaryType) {
    try {
        const authResult = await auth();
        if (!authResult?.userId) {
            return {
                success: false,
                message: 'Usuario no encontrado',
                data: null,
            };
        }

        const savedSummary = await prismadb.pdfSummary.create({
            data: {
                userId: authResult.userId,
                originalFileName,
                title,
                summaryText,
                uploadKey: uploadKey ?? null,
                fileUrl: fileUrl ?? null,
                status: 'completado',
            },
        });

        return {
            success: true,
            message: 'Resumen guardado exitosamente',
            data: {
                id: savedSummary.id,
            },
        };

    } catch (error) {
        console.error('Error al guardar el resumen:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error desconocido',
            data: null,
        };
    }
}
