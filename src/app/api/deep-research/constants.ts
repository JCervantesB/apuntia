// Constantes de investigación
export const MAX_ITERATIONS = 3; // Número máximo de iteraciones
export const MAX_SEARCH_RESULTS = 3; // Número máximo de resultados de búsqueda
export const MAX_CONTENT_CHARS = 20000; // Número máximo de caracteres en el contenido
export const MAX_RETRY_ATTEMPTS = 3; // Es el número de veces que el modelo intentará llamar a los LLM si falla
export const RETRY_DELAY_MS = 1000; // Es el retraso en milisegundos entre reintentos para que el modelo llame a los LLM.

// Nombres de modelos
export const MODELS = {
  PLANNING: "openai/gpt-4o",
  EXTRACTION: "openai/gpt-4.1-mini",
  ANALYSIS: "meta-llama/llama-4-maverick",
  REPORT: "deepseek/deepseek-chat-v3-0324"
  // REPORT: "anthropic/claude-3.7-sonnet:thinking",
}; 