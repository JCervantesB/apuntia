/* eslint-disable */
"use client"
import { useDeepResearchStore } from '@/store/deepResearch'
import React, { useEffect } from 'react'
import { useChat } from '@ai-sdk/react';
import QuestionForm from './QuestionForm'
import ResearchActivities from './ResearchActivities';
import ResearchReport from './ResearchReport';
import ResearchTimer from './ResearchTimer';

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

    console.log("Data: ", data);

    useEffect(() => {
        if (!data) return;
        // Extraer actividades y fuentes
        const messages = data as unknown[];
        const activities = messages
            .filter(
                (msg) => typeof msg === "object" && (msg as any).type === "activity"
            )
            .map((msg) => (msg as any).content);

        setActivities(activities);

        const sources = activities
            .filter(
                (activity) =>
                    activity.type === "extract" && activity.status === "complete"
            )
            .map((activity) => {
                const url = activity.message.split("de ")[1];
                return {
                    url,
                    title: url?.split("/")[2] || url,
                };
            });
        setSources(sources);

        const reportData = messages.find(
            (msg) => typeof msg === "object" && (msg as any).type === "report"
        );
        const report =
            typeof (reportData as any)?.content === "string"
                ? (reportData as any).content
                : "";
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
            <ResearchActivities />
            <ResearchTimer />
            <ResearchReport />
        </div>
    )
}

export default QuestionAny