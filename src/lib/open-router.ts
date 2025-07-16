// open-router.ts
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { checkApiLimit, increaseApiLimit } from "./api-limit";
import { SUMMARY_SYSTEM_PROMPT } from "@/app/api/deep-research/prompts";

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY || '',
});

export const getPdfSummary = async (pdfText: string) => {
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
        return {
            success: false,
            error: "Has alcanzado el límite de uso gratuito. Por favor, actualiza tu cuenta para continuar.",
        };
    }

    const prompt = `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting. 
    The summary must be written in **Spanish**, regardless of the original language. Follow the structure, tone, and formatting instructions strictly.

    Document:
    ${pdfText}
    `;
    const systemPrompt = SUMMARY_SYSTEM_PROMPT;

    try {
        const response = await generateText({
            model: openrouter("deepseek/deepseek-chat-v3-0324"),
            prompt,
            system: systemPrompt
        });

        // console.log(response)
        await increaseApiLimit();
        
        return {
            success: true,
            summary: response.text,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Hubo un error al generar el resumen",
        };
    }
};

export const getPdfSummaryFromGemini = async (pdfText: string) => {
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
        return {
            success: false,
            error: "Has alcanzado el límite de uso gratuito. Por favor, actualiza tu cuenta para continuar.",
        };
    }

    const prompt = `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting. 
    The summary must be written in **Spanish**, regardless of the original language. Follow the structure, tone, and formatting instructions strictly.

    Document:
    ${pdfText}
    `;
    const systemPrompt = SUMMARY_SYSTEM_PROMPT;

    try {
        const response = await generateText({
            model: openrouter("google/gemini-2.0-flash-001"),
            prompt,
            system: systemPrompt
        });

        //console.log(response)
        await increaseApiLimit();
        
        return {
            success: true,
            summary: response.text,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Hubo un error al generar el resumen",
        };
    }
};
