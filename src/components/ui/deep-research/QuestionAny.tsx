"use client"
import { useDeepResearchStore } from '@/store/deepResearch'
import React, { useEffect } from 'react'
import { useChat } from '@ai-sdk/react';
import QuestionForm from './QuestionForm';
import ResearchTimer from './ResearchTimer';
import ResearchReport from './ResearchReport';

// Interfaces para los tipos de datos
interface Activity {
    type: 'buscar' | 'extraer' | 'analizar' | 'generar' | 'planificado';
    status: 'pendiente' | 'completo' | 'advertencia' | 'error';
    message: string;
    timestamp: number;
    completedSteps: number;
    tokenUsed: number;
}

// Interfaces para los tipos de mensajes
interface ActivityMessage {
    type: 'activity';
    content: Activity;
}

interface ReportMessage {
    type: 'report';
    content: string;
}

type ChatMessage = ActivityMessage | ReportMessage | unknown;

const QuestionAny = () => {
    const {
        questions,
        isCompleted,
        topic,
        answers,
        isLoading,
        setIsLoading,
        setActivities,
        setSources,
        setReport
    } = useDeepResearchStore();

    const { append, data } = useChat({
        api: "/api/deep-research",
    });

    useEffect(() => {
        if (!data) return;
        console.log("Raw data received:", data);
        
        const messages = data as ChatMessage[];
        console.log("Messages:", messages);
        
        const activities = messages
            .filter(
                (msg): msg is ActivityMessage => {
                    console.log("Checking message:", msg);
                    return typeof msg === "object" && msg !== null && 'type' in msg && (msg as any).type === "activity";
                }
            )
            .map((msg) => {
                console.log("Activity message content:", msg.content);
                try {
                    // Si el contenido es un string JSON, parsearlo
                    const content = typeof msg.content === 'string' ? JSON.parse(msg.content) : msg.content;
                    return content;
                } catch (e) {
                    console.error("Error parsing activity content:", e);
                    return msg.content;
                }
            });

        //console.log("Filtered activities:", activities);
        setActivities(activities);

        const sources = activities
            .filter(
                (activity) =>
                    activity.type === "extraer" && activity.status === "completo"
            )
            .map((activity) => {
                const url = activity.message?.split("de ")[1];
                return {
                    url: url || '',
                    title: url?.split("/")[2] || url || 'Unknown',
                };
            })
            .filter((source) => source.url !== '');
        setSources(sources);

        const reportData = messages.find(
            (msg): msg is ReportMessage => typeof msg === "object" && msg !== null && 'type' in msg && (msg as ReportMessage).type === "report"
        );
        const report = reportData?.content || "";
        setReport(report);

        setIsLoading(isLoading);
    }, [data, setActivities, setSources, setReport, setIsLoading, isLoading]);

    useEffect(() => {
        if (isCompleted && questions.length > 0) {
            const clarifications = questions.map((question, index) => ({
                question: question,
                answer: answers[index],
            }));

            append({
                role: "user",
                content: JSON.stringify({
                    topic: topic,
                    clarifications: clarifications,
                }),
            });
        }
    }, [isCompleted, questions, answers, topic, append]);

    if (questions.length === 0) return null;

    return (
        <div className='flex gap-4 w-full flex-col items-center mb-16'>
            <QuestionForm />
            <ResearchTimer />
            <ResearchReport />
        </div>
    )
}

export default QuestionAny