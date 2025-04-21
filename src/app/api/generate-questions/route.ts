export const runtime = 'edge';
import { NextResponse } from "next/server";
import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY || '',
});

const getResearchGoals = async (topic: string) => {
    // Check API Limit
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {

        return NextResponse.json({
            success: false,
            error: "Has alcanzado el límite de uso gratuito. Por favor, actualiza tu cuenta para continuar."
        }, { status: 403 });
    }

    // TODO: Check Token Limit 
    // const tokenLimit = await checkTokenLimit();
    // if (!tokenLimit) {
    //     return NextResponse.json({
    //         success: false,
    //         error: "No tienes suficientes tokens disponibles. Prueba mejorar a premium."
    //     }, { status: 403 });
    // }

    // Prompt for generating clarifying questions

    const prompt = `
    Given the research topic <topic>${topic}</topic>, generate 2 to 4 clarifying questions to better understand what the user wants to know.

    Guidelines:
    - Write all questions in **Spanish**
    - First, analyze how the topic is phrased to estimate the user's likely level of knowledge (beginner, intermediate, expert)
    - Based on that, generate questions that match the user's level:
    - For beginners: use simple, everyday language, avoid technical terms
    - For intermediate users: be a bit more specific, but still accessible
    - For expert users: it's okay to include more depth or precision
    - Do not ask unnecessary or overly complex questions
    - Only ask about excluded sources or advanced approaches if they are clearly relevant

    The goal is to help the user clarify their intent in a way that feels natural and useful for their level.
    `;

    try {
        const { object } = await generateObject({
            model: openrouter("openai/gpt-4o-mini"),
            prompt,
            schema: z.object({
                questions: z.array(z.string())
            })
        });

        // Increase API Limit
        await increaseApiLimit();

        return object.questions;
    } catch (error) {
        console.log("Error mientras se eneraba la pregunta: ", error);
    }
}

export async function POST(req: Request) {
    const { topic } = await req.json();

    try {
        const questions = await getResearchGoals(topic);

        if (questions instanceof NextResponse) {
            return questions;
        }

        console.log("Preguntas generadas: ", questions);

        return NextResponse.json(questions);
    } catch (error) {
        console.log("Error mientras se generaban las preguntas: ", error);
        return NextResponse.json({
            success: false, error: "Fallo al generar las preguntas"
        }, { status: 500 })
    }
}