import { createDataStreamResponse } from "ai"
import { ResearchState } from "./types";
import { deepResearch } from "./main";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const lastMessageContent = messages[messages.length - 1].content;

        const parsed = JSON.parse(lastMessageContent);

        const topic = parsed.topic;
        const clarifications = parsed.clarifications;

        console.log(parsed);

        return createDataStreamResponse({
            execute: async (dataStream) => {
              const researchState: ResearchState = {
                topic: topic,
                completedSteps: 0,
                tokenUsed: 0,
                findings: [],
                processedUrl: new Set(),
                clerificationsText: JSON.stringify(clarifications),
              }

              await deepResearch(researchState, dataStream);
            },
            // onError
          });
    } catch (error) {
        
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Formato de mensaje inválido"
            }),
            { status: 500 }
        );
    }
}