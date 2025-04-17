import { createActivityTracker } from "./activity-tracker";
import { MAX_ITERATIONS } from "./constants";
import {
  analyzeFindings,
  generateReport,
  generateSearchQueries,
  processSearchResults,
  search,
} from "./research-functions";
import { ResearchState } from "./types";

type DataStream = {
  writeData: (data: { type: string; content: string }) => void;
};

type InitialQueries = {
  searchQueries: string[];
};

type SearchResult = {
  title: string;
  url: string;
  content: string;
};

type AnalysisResult = {
  sufficient: boolean;
  queries: string[];
};

export async function deepResearch(
  researchState: ResearchState,
  dataStream: DataStream
) {
  let iteration = 0;

  const activityTracker = createActivityTracker(dataStream, researchState);
  const initialQueries = await generateSearchQueries(
    researchState,
    activityTracker
  );
  const currentInit = initialQueries as InitialQueries;
  let currentQueries = currentInit.searchQueries;

  while (currentQueries && currentQueries.length > 0 && iteration < MAX_ITERATIONS) {
    iteration++;

    const sarchResults = currentQueries.map((query: string) =>
      search(query, researchState, activityTracker)
    );
    const searchResultsResponses = await Promise.allSettled(sarchResults);

    const allSearchResults = searchResultsResponses
      .filter(
        (result): result is PromiseFulfilledResult<SearchResult[]> =>
          result.status === "fulfilled" && result.value.length > 0
      )
      .map((result) => result.value)
      .flat();

    console.log(`Se obtuvieron ${allSearchResults.length} resultados de búsqueda!`);

    const newFindings = await processSearchResults(
      allSearchResults,
      researchState,
      activityTracker
    );

    console.log("Resultados de búsqueda procesados");

    researchState.findings = [...researchState.findings, ...newFindings];

    const analysis = (await analyzeFindings(
      researchState,
      currentQueries,
      iteration,
      activityTracker
    )) as AnalysisResult;

    console.log("Análisis: ", analysis);

    if (analysis.sufficient) {
      break;
    }

    currentQueries = (analysis.queries || []).filter(
      (query: string) => !currentQueries.includes(query)
    );

    // Procesar los resultados de la búsqueda
    currentQueries = [];
  }

  console.log("Iteraciones completadas: ", iteration);
  console.log("Buscando: ", researchState.findings);

  const report = await generateReport(researchState, activityTracker);

  // Asegurarnos de que `report` sea tratado como una cadena
  dataStream.writeData({
    type: "report",
    content: report as string,  // Hacemos un cast a string
  });

  console.log("Reporte generado: ", report);

  return initialQueries;
}
