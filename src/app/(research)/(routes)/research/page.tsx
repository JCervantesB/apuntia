"use client";

import QuestionAny from "@/components/ui/deep-research/QuestionAny";
import UserInput from "@/components/ui/deep-research/UserInput";

export default function ResearchPage() {
  return (
      <main className="relative z-10 min-h-screen w-full max-w-[1024px] mx-auto flex flex-col items-center justify-start gap-8 py-16 px-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold font-exo italic bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent mt-5 whitespace-nowrap">
            Apunt IA
          </h1>
          <p className="text-gray-600 text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl">
            Ingresa un tema y responde unas pocas preguntas para generar completo apunte de investigación potenciado por IA
          </p>
        </div>
        <UserInput />
        <QuestionAny />
      </main>
  );
}
