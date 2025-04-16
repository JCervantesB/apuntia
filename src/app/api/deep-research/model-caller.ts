import { generateObject, generateText } from "ai";
import { openrouter } from "./services";
import { ActivityTracker, ModelCallOptions, ResearchState } from "./types";
import { MAX_RETRY_ATTEMPTS, RETRY_DELAY_MS } from "./constants";
import { delay } from "./utils";
import { decreaseTokens } from "@/lib/api-limit"; 


export async function callModel<T>({
    model, prompt, system, schema, activityType = "generar"
}: ModelCallOptions<T>,
researchState: ResearchState,activityTracker: ActivityTracker ): Promise<T | string>{

  let attempts = 0;
  let lastError: Error | null = null;

  while(attempts < MAX_RETRY_ATTEMPTS){
    try{
      if(schema){

        const { object, usage } = await generateObject({
            model: openrouter(model),
            prompt,
            system,
            schema: schema
          });
    
          researchState.tokenUsed += usage.totalTokens;
          researchState.completedSteps++

          return object;
        }else{
    
            const { text, usage } = await generateText({
                model: openrouter(model),
                prompt,
                system,
              });
    
              researchState.tokenUsed += usage.totalTokens;
              researchState.completedSteps++
    
          return text;
        }
    }catch(error){
       attempts++;
       lastError = error instanceof Error ? error : new Error('Unknown error');

       if(attempts < MAX_RETRY_ATTEMPTS){
        activityTracker.add(activityType, 'advertencia', `Falló la llamada al modelo, intento ${attempts}/${MAX_RETRY_ATTEMPTS}. Reintentando...`)
       }
       await delay(RETRY_DELAY_MS*attempts)
    }
  }

  throw lastError || new Error(`Falló después de ${MAX_RETRY_ATTEMPTS} intentos!`)
}