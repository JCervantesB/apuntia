import {
    ActivityTracker,
    ResearchFindings,
    ResearchState,
    SearchResult,
  } from "./types";
  import { z } from "zod";
  import {
    ANALYSIS_SYSTEM_PROMPT,
    EXTRACTION_SYSTEM_PROMPT,
    getAnalysisPrompt,
    getExtractionPrompt,
    getPlanningPrompt,
    getReportPrompt,
    PLANNING_SYSTEM_PROMPT,
    REPORT_SYSTEM_PROMPT,
  } from "./prompts";
  import { callModel } from "./model-caller";
  import { exa } from "./services";
  import { combineFindings, handleError } from "./utils";
  import {
    MAX_CONTENT_CHARS,
    MAX_ITERATIONS,
    MAX_SEARCH_RESULTS,
    MODELS,
  } from "./constants";
  
  export async function generateSearchQueries(
    researchState: ResearchState,
    activityTracker: ActivityTracker
  ) {
    try{
      activityTracker.add("planificado","pendiente","Planificación de la investigación");
  
    const result = await callModel(
      {
        model: MODELS.PLANNING,
        prompt: getPlanningPrompt(
          researchState.topic,
          researchState.clerificationsText
        ),
        system: PLANNING_SYSTEM_PROMPT,
        schema: z.object({
          searchQueries: z
            .array(z.string())
            .describe(
              "Las consultas de búsqueda que se pueden utilizar para encontrar el contenido más relevante y escribir un informe completo sobre el tema dado. (máx. 3 consultas)"
            ),
        }),
        activityType: "planificado"
      },
      researchState, activityTracker
    );
    console.log("Finalizado la planificación de la investigación", result);
    activityTracker.add("planificado", "completo", "Elaborado el plan de investigación");
    
    return result;
    }catch(error){
      console.log("error: ", error);
      return handleError(error, `Planificación de la investigación`, activityTracker, "planificado", {
          searchQueries: [`${researchState.topic} mejores prácticas`,`${researchState.topic} pautas`, `${researchState.topic} ejemplos`  ]
      })
      
    }
  }
  
  export async function search(
    query: string,
    researchState: ResearchState,
    activityTracker: ActivityTracker
  ): Promise<SearchResult[]> {
  
      activityTracker.add("buscar","pendiente",`Buscando ${query}`);
  
    try {
      const searchResult = await exa.searchAndContents(query, {
        type: "keyword",
        numResults: MAX_SEARCH_RESULTS,
        startPublishedDate: new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        endPublishedDate: new Date().toISOString(),
        startCrawlDate: new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        endCrawlDate: new Date().toISOString(),
        excludeDomains: ["https://youtube.com"],
        text: {
          maxCharacters: MAX_CONTENT_CHARS,
        },
      });
  
      const filteredResults = searchResult.results
        .filter((r) => r.title && r.text !== undefined)
        .map((r) => ({
          title: r.title || "",
          url: r.url,
          content: r.text || "",
        }));
  
      researchState.completedSteps++;
  
      activityTracker.add("buscar","completo",`Se encontraron ${filteredResults.length} resultados para ${query}`);
        console.log("Se encontraron resultados de búsqueda: ", filteredResults);
  
      return filteredResults;
    } catch (error) {
      console.log("error: ", error);
      return handleError(error, `Buscando ${query}`, activityTracker, "buscar", []) || []
    }
  }
  
  export async function extractContent(
    content: string,
    url: string,
    researchState: ResearchState,
    activityTracker: ActivityTracker
  ) {
  
      try{
          activityTracker.add("extraer","pendiente",`Extrayendo contenido de ${url}`);
  
          const result = await callModel(
            {
              model: MODELS.EXTRACTION,
              prompt: getExtractionPrompt(
                content,
                researchState.topic,
                researchState.clerificationsText
              ),
              system: EXTRACTION_SYSTEM_PROMPT,
              schema: z.object({
                summary: z.string().describe("Un resumen completo del contenido"),
              }),
              activityType: "extraer"
            },
            researchState, activityTracker
          );
        
          activityTracker.add("extraer","completo",`Extrayendo contenido de ${url}`);
          console.log("Extracción de contenido: ", result);
          return {
            url,
            summary: typeof result === 'string' ? result : (result as { summary: string }).summary,
          };
      }catch(error){
        console.log("error: ", error);
          return handleError(error, `Extracción de contenido de ${url}`, activityTracker, "extraer", null) || null
      }
  }
  
  export async function processSearchResults(
    searchResults: SearchResult[],
    researchState: ResearchState,
    activityTracker: ActivityTracker
  ): Promise<ResearchFindings[]> {
    const extractionPromises = searchResults.map((result) =>
      extractContent(result.content, result.url, researchState, activityTracker)
    );
    const extractionResults = await Promise.allSettled(extractionPromises);
  
    type ExtractionResult = { url: string; summary: string };
  
    const newFindings = extractionResults
      .filter(
        (result): result is PromiseFulfilledResult<ExtractionResult> =>
          result.status === "fulfilled" &&
          result.value !== null &&
          result.value !== undefined
      )
      .map((result) => {
        const { summary, url } = result.value;
        return {
          summary,
          source: url,
        };
      });
      console.log("Resultados de la extracción: ", newFindings);
    return newFindings;
  }
  
  export async function analyzeFindings(
    researchState: ResearchState,
    currentQueries: string[],
    currentIteration: number,
    activityTracker: ActivityTracker
  ) {
    try {
      activityTracker.add("analizar","pendiente",`Análisis de los resultados de la investigación (iteración ${currentIteration}) de ${MAX_ITERATIONS}`);
      const contentText = combineFindings(researchState.findings);
  
      const result = await callModel(
        {
          model: MODELS.ANALYSIS,
          prompt: getAnalysisPrompt(
            contentText,
            researchState.topic,
            researchState.clerificationsText,
            currentQueries,
            currentIteration,
            MAX_ITERATIONS,
            contentText.length
          ),
          system: ANALYSIS_SYSTEM_PROMPT,
          schema: z.object({
            sufficient: z
              .boolean()
              .describe(
                "Si el contenido recopilado es suficiente para un informe útil"
              ),
            gaps: z.array(z.string()).describe("Se identificaron lagunas en el contenido"),
            queries: z
              .array(z.string())
              .describe(
                "Consultas de búsqueda para información faltante. Máximo 3 consultas."
              ),
          }),
          activityType: "analizar"
        },
        researchState, activityTracker
      );
      console.log("Análisis de contenido: ", result);
  
      const isContentSufficient = typeof result !== 'string' && result.sufficient; 
  
      activityTracker.add("analizar","completo",`Se analizaron los hallazgos de investigación recopilados: ${isContentSufficient ? 'El contenido es suficiente' : '¡Se necesita más investigación!'}`);
  
      return result;
    } catch (error) {
      console.log("error: ", error);
      return handleError(error, `Content analysis`, activityTracker, "analizar", {
          sufficient: false,
          gaps: ["No se puede analizar el contenido"],
          queries: ["Por favor, intente una consulta de búsqueda diferente"]
      })
    }
  }
  
  export async function generateReport(researchState: ResearchState, activityTracker: ActivityTracker) {
    try {
      activityTracker.add("generar","pendiente",`¡Generando un informe completo!`);
  
      const contentText = combineFindings(researchState.findings);
  
      const report = await callModel(
        {
          model: MODELS.REPORT,
          prompt: getReportPrompt(
            contentText,
            researchState.topic,
            researchState.clerificationsText
          ),
          system: REPORT_SYSTEM_PROMPT,
          activityType: "generar"
        },
        researchState, activityTracker
      );
  
      activityTracker.add("generar","completo",`Informe completo generado, Total de tokens utilizados: ${researchState.tokenUsed}. Investigación realizada en ${researchState.completedSteps} pasos.`);
      console.log("Informe generado: ", report);
  
      return report;
    } catch (error) {
      console.log(error);
      return handleError(error, `Generación de informes`, activityTracker, "generar", "Error al generar el informe. Inténtalo de nuevo. ")
    }
  }