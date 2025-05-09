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
          className='w-full max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] shadow-xl border rounded-xl border-black/10 px-4 py-6'
        >
          <CardHeader className='px-4 sm:px-6'>
            <CardTitle className='text-base text-primary/50'>
              Pregunta {currentQuestion + 1} de {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 w-full px-4 sm:px-6'>
            <p className='text-base'>{questions[currentQuestion]}</p>
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
                          className='px-4 py-2 text-base resize-none placeholder:text-sm border-black/20 focus:outline-none focus:ring-2 focus:ring-primary'
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
                  >
                    Anterior
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {currentQuestion === questions.length - 1 ? "Comenzar investigación" : "Siguiente"}
                  </Button>
                </div>
              </form>
            </Form>

            <div className='h-1 w-full bg-gray-200 rounded'>
              <div
                className='h-1 bg-primary rounded transition-all duration-300'
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