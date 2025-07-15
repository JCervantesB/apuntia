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
    //console.log("Respuesta de carga:", uploadResponse);

    if (!uploadResponse) {
        return {
            success: false,
            message: 'Fallo la subida del archivo',
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            fileUrl: pdfUrl,  // Renombramos fileUrl a pdfUrl
            fileName,
        }
    } = uploadResponse[0];

    // Verificación de URL del PDF
    if (!pdfUrl) {
        return {
            success: false,
            message: 'URL del archivo PDF no disponible.',
            data: null,
        };
    }

    try {
        // Extraer texto del PDF
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        if (!pdfText) {
            return {
                success: false,
                message: 'No se pudo extraer el texto del PDF.',
                data: null,
            };
        }

        let summary;

        try {
            // Obtener el resumen del PDF
            const summaryResponse = await getPdfSummary(pdfText);
            if (!summaryResponse || !summaryResponse.summary) {
                return {
                    success: false,
                    message: 'No se pudo generar el resumen.',
                    data: null,
                };
            }
            summary = summaryResponse.summary;

            return {
                success: true,
                message: "Resumen generado exitosamente",
                data: summary
            };
        } catch (error) {
            console.log(error);
            if (error) {
                try {
                    summary = await getPdfSummaryFromGemini(pdfText);
                } catch (geminiError) {
                    console.error(
                        'La API de Gemini falló al generar el resumen del PDF:',
                        geminiError
                    );
                    throw new Error('Fallo al generar el resumen del PDF con los servicios de IA');
                }
            }
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

async function saveSummary({
    userId,
    originalFileName,
    title,
    summaryText,
}: {
    userId: string;
    originalFileName: string;
    title: string;
    summaryText: string;
}) {
    // prisma client to save the summary
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error('Usuario no encontrado');
        }

        // Guardar el resumen en la base de datos
        const savedSummary = await prismadb.pdfSummary.create({
            data: {
                userId,
                originalFileName,
                title,
                summaryText,
                status: 'completado'
            },
        });

        //console.log('Resumen guardado:', savedSummary);

        return {
            success: true,
            message: 'Resumen guardado exitosamente',
            data: {
                id: savedSummary.id
            }
        };

    } catch (error) {
        console.error('Error al guardar el resumen:', error);
        throw error;
    }
}

export async function storePdfSummaryAction({
    userId,
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
                uploadKey,
                fileUrl,
                status: 'completado',
            },
        });

        //console.log('Resumen guardado:', savedSummary);

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
