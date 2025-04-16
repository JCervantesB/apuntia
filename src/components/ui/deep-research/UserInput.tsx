"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useDeepResearchStore } from '@/store/deepResearch'
import { Loader2 } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'
 
const formSchema = z.object({
    input: z
      .string()
      .min(2, { message: "El campo debe tener al menos 2 caracteres" })
      .max(200, { message: "El campo no puede superar los 200 caracteres" }),
  })

const UserInput = () => {
    const  { setQuestions, setTopic, isLoading, setIsLoading } = useDeepResearchStore();
    const [errorMsg, setErrorMsg] = useState("")
    const proModal = useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          input: "",
        },
    });
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true)
      setErrorMsg("")
      try {
        const response = await fetch("/api/generate-questions", {
          method: "POST",
          body: JSON.stringify({topic: values.input}),
        })

        const data = await response.json()

        if (!response.ok) {
          setErrorMsg(data.error || "Error desconocido")
          proModal.onOpen()
          return
        }

        setTopic(values.input)
        setQuestions(data)
      } catch (error) {
        setErrorMsg("Error inesperado. Intenta de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    return (
      <div className="flex flex-col items-center gap-2 w-full">
        <Form {...form}>
        <form 
  onSubmit={form.handleSubmit(onSubmit)} 
  className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full max-w-2xl"
>
  <FormField
    control={form.control}
    name="input"
    render={({ field }) => (
      <FormItem className='flex-1 w-full'>
        <FormControl>
          <Input
            placeholder="Comienza ingresando un tema de investigación"
            {...field}
            className='rounded-full w-full p-4 py-6 placeholder:text-sm bg-white/60 border-solid shadow-none'
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <Button type="submit" className='rounded-full px-6 w-full lg:w-auto' disabled={isLoading}>
    {isLoading ? (
      <>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Generando...
      </>
    ) : "Comenzar"}
  </Button>
</form>

        </Form>

        {errorMsg && (
          <div className="text-red-600 text-sm mt-2">
            {errorMsg}
          </div>
        )}
      </div>
    )
}

export default UserInput
