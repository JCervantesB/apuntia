'use client'
import { useDeepResearchStore } from '@/store/deepResearch'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card';

const ResearchTimer = () => {

    const {report, isCompleted, activities} = useDeepResearchStore();
    const [elapsedTime,  setElapsedTime] = useState(0);

    useEffect(() => {
        if(report.length > 10) return;
        const startTime = Date.now();
        const timer = setInterval(() => {
            setElapsedTime(Date.now() - startTime)
        }, 16);
        
        return () => clearInterval(timer)
    }, [report, isCompleted]);

    if (activities.length <= 0) return;

    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;

  return (
    <Card className='p-4 bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl border border-purple-300/30 ring-1 ring-purple-400/20 shadow-2xl rounded-2xl text-center'>
        <p className='text-white/80 text-sm font-medium'>Realizando la investigación, este proceso puede demorar algunos minutos</p>
        <p className='text-sm text-white/70'>
            Tiempo transcurrido: <span>{seconds > 60 ? `${Math.floor(seconds /60)}m ${seconds % 60 > 0 ? `${(seconds % 60).toString()}s` : ''}` : `${
                seconds 
            }.${milliseconds.toString()}s` }</span>
        </p>
    </Card>
  )
}

export default ResearchTimer