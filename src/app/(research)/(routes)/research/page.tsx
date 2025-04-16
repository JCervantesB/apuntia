"use client";

import QuestionAny from "@/components/ui/deep-research/QuestionAny";
import UserInput from "@/components/ui/deep-research/UserInput";

export default function ResearchPage() {
  return (
    <div> 
      <main className="main-h-screen w-full flex flex-col items-center justify-start gap-8 py-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-8xl font-bold font-exo italic bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent mt-5">
            ApuntIA
            
          </h1>
          <p className="text-gray-600 text-center">
            Ingresa un tema y responde unas pocas preguntas para generar completo apunte de investigación potenciado por IA
          </p>
        </div>

        <UserInput />
        <QuestionAny />
      </main>
    </div>
  );
}
