import { z } from "zod";


export interface ResearchFindings {
    summary: string,
    source: string
}

export interface ResearchState {
    userId?: string,
    topic: string,
    completedSteps: number,
    tokenUsed: number,
    findings: ResearchFindings[],
    processedUrl: Set<string>,
    clerificationsText: string
}

export interface ModelCallOptions<T>{
    model: string;
    prompt: string;
    system: string;
    schema?: z.ZodType<T>;
    activityType?: Activity["type"]
}

export interface SearchResult{
    title: string;
    url: string;
    content: string
}

export interface Activity{
    type: 'buscar' | 'extraer' | 'analizar' | 'generar' | 'planificado';
    status: 'pendiente' | 'completo' | 'advertencia' | 'error';
    message: string;
    timestamp?: number;
}

export type ActivityTracker = {
    add: (type: Activity['type'], status: Activity['status'], message: Activity['message']) => void;
}


export interface Source {
    url: string;
    title: string
}