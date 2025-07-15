"use client"

import React, { useRef, useState } from 'react'
import UploadFormInput from '@/components/ui/upload/UploadFormInput';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from "sonner";
import { generatePdfSummary, storePdfSummaryAction } from '@/lib/upload-actions';
import { formatedFileNameTitle } from '@/utils/format-utils';
import { useRouter } from 'next/navigation';

const schema = z.object({
    file: z.instanceof(File, { message: "Archivo no válido" }).refine((file) => file.size <= 20 * 1024 * 1024, {
        message: "El archivo debe ser menor a 20MB",
    })
        .refine((file) => file.type === "application/pdf", {
            message: "El archivo debe ser un PDF",
        })
        .refine((file) => file.name.endsWith(".pdf"), {
            message: "El archivo debe tener la extensión .pdf",
        })
});

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            toast("¡Subido exitosamente!")
        },
        onUploadError: (err) => {
            console.error('Ocurrio un error mientras se subia', err);
        },
        onUploadBegin: () => {
            console.log('Se ha comenzado a cargar el archivo')
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get("file") as File;

            // Validating the fields
            const validateFields = schema.safeParse({ file });

            if (!validateFields.success) {
                console.log(validateFields.error.flatten().fieldErrors.file ? [0] : "Archivo no válido");
                toast("❌ Opps... algo salio mal!")
                return;
            }
            toast("📄Subiendo PDF...")

            const resp = await startUpload([file]);
            if (!resp) {
                toast("❌ Opps... algo salio mal!")
                setIsLoading(false);
                return;
            }

            toast("📄Archivo procesado")

            //schema with zod
            //upload the file to uploadthing
            //parse the pdf using langchain
            const result = await generatePdfSummary(resp as unknown as [
                {
                    name: string;
                    size: number;
                    key: string;
                    lastModified: number;
                    serverData: {
                        userId: string;
                        fileUrl: string;
                        fileName: string;
                    };
                    url: string;
                    appUrl: string;
                    ufsUrl: string;
                    customId: string | null;
                    type: string;
                    fileHash: string;
                }
            ]);
            //console.log({ result });

            const { data = null, message = null } = result || {}

            if (data) {
                let storeResult: any;
                toast("📄Guardando Resumen...")

                if (data.trim()) {  // Validar que no sea un string vacío o sólo espacios

                    storeResult = await storePdfSummaryAction({
                        originalFileName: resp[0].serverData.fileUrl,
                        title: formatedFileNameTitle(resp[0].serverData.fileName),
                        summaryText: data,
                        uploadKey: resp[0].key,
                        fileUrl: resp[0].serverData.fileUrl,
                    })

                    toast("✅ ¡Tu PDF ha sido resumido y guardado exitosamente!");
                    formRef.current?.reset();

                    // Redirigir al usuario a la página de resumen /pdfsummaries/[id]/
                    if (storeResult?.data?.id) {
                        router.push(`/pdfsummaries/${storeResult.data.id}`);
                    }

                } else {
                    // Si 'data' está vacío o contiene solo espacios
                    toast("❌ El resumen está vacío.");
                }
            };

            formRef.current?.reset();
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false);
            console.error("Ocurrio un error", error);
            formRef.current?.reset();
        }
    }

    return (
        <div className='flex flex-col gap-6 w-full max-w-2xl mx-auto'>
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
        </div>
    )
}