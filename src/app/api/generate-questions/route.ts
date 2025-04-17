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
    Given the research topic <topic>${topic}</topic>, generate 2 to 4 clarifying questions to define the scope of the research. Focus on identifying:

    - Specific aspects of interest
    - Required level of depth/complexity
    - Particular perspectives or excluded sources

    Ensure all questions are written in Spanish.
    `

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