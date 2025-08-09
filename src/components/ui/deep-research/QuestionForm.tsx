import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../textarea'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDeepResearchStore } from '@/store/deepResearch'
import { motion, AnimatePresence } from "framer-motion"

const formSchema = z.object({
  answer: z.string().min(1, "¡Se requiere una respuesta!")
})



const QuestionForm = () => {

  const { questions, currentQuestion, answers, setCurrentQuestion, setAnswers, setIsCompleted, isLoading, isCompleted } = useDeepResearchStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: answers[currentQuestion] || "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = values.answer;
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      form.reset()
    } else {
      setIsCompleted(true)
    }
  }

  if (isCompleted) return;

  if (questions.length === 0) return;


  return (
    <AnimatePresence>
      <motion.div
        key="question-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        className="w-full flex justify-center"
      >
        <Card
          className='w-full max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] shadow-2xl border rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl border-purple-300/30 px-4 py-6 ring-1 ring-purple-400/20'
        >
          <CardHeader className='px-4 sm:px-6'>
            <CardTitle className='text-base text-purple-300'>
              Pregunta {currentQuestion + 1} de {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 w-full px-4 sm:px-6'>
            <p className='text-base text-white'>{questions[currentQuestion]}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe tu respuesta aquí..."
                          {...field}
                          className='px-4 py-2 text-base resize-none placeholder:text-gray-400 bg-white/10 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 rounded-xl'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <Button type="button" variant={"outline"}
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1)
                        form.setValue("answer", answers[currentQuestion - 1] || "")
                      }
                    }}
                    className="bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60 rounded-xl transition-all duration-200 shadow-md"
                  >
                    Anterior
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg">
                    {currentQuestion === questions.length - 1 ? "Comenzar investigación" : "Siguiente"}
                  </Button>
                </div>
              </form>
            </Form>

            <div className='h-1 w-full bg-white/20 rounded'>
              <div
                className='h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded transition-all duration-300'
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`
                }}
              />
            </div>
          </CardContent>
        </Card>


      </motion.div>
    </AnimatePresence>

  )
}

export default QuestionForm