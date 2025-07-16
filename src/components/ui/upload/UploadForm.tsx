'use client'

import React, { useRef, useState } from 'react'
import UploadFormInput from '@/components/ui/upload/UploadFormInput'
import { z } from 'zod'
import { useUploadThing } from '@/utils/uploadthing'
import { toast } from 'sonner'
import { generatePdfSummary, storePdfSummaryAction } from '@/lib/upload-actions'
import { formatedFileNameTitle } from '@/utils/format-utils'
import { useRouter } from 'next/navigation'

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast('¡Subido exitosamente!')
    },
    onUploadError: (err) => {
      console.error('Ocurrió un error mientras se subía', err)
    },
    onUploadBegin: () => {
      console.log('Se ha comenzado a cargar el archivo')
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // ✅ Definimos el schema solo cuando ya estamos en el cliente
    const schema = z.object({
      file: z
        .instanceof(File, { message: 'Archivo no válido' })
        .refine((file) => file.size <= 20 * 1024 * 1024, {
          message: 'El archivo debe ser menor a 20MB',
        })
        .refine((file) => file.type === 'application/pdf', {
          message: 'El archivo debe ser un PDF',
        })
        .refine((file) => file.name.endsWith('.pdf'), {
          message: 'El archivo debe tener la extensión .pdf',
        }),
    })

    try {
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const file = formData.get('file') as File

      const validateFields = schema.safeParse({ file })

      if (!validateFields.success) {
        toast('❌ Opps... archivo no válido')
        return
      }

      toast('📄Subiendo PDF...')
      const resp = await startUpload([file])
      if (!resp) {
        toast('❌ Opps... algo salió mal!')
        setIsLoading(false)
        return
      }

      toast('📄Archivo procesado')

      const result = await generatePdfSummary(resp as any)
      const { data = null } = result || {}

      if (data) {
        toast('📄Guardando resumen...')

        if (data.trim()) {
          const storeResult = await storePdfSummaryAction({
            originalFileName: resp[0].serverData.fileUrl,
            title: formatedFileNameTitle(resp[0].serverData.fileName),
            summaryText: data,
            uploadKey: resp[0].key,
            fileUrl: resp[0].serverData.fileUrl,
          })

          toast('✅ ¡Tu PDF ha sido resumido y guardado exitosamente!')
          formRef.current?.reset()

          if (storeResult.data?.id) {
            router.push(`/pdfsummaries/${storeResult.data.id}`)
          }
        } else {
          toast('❌ El resumen está vacío.')
        }
      }

      formRef.current?.reset()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Ocurrió un error', error)
      formRef.current?.reset()
    }
  }

  return (
    <div className='flex flex-col gap-6 w-full max-w-2xl mx-auto'>
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  )
}
