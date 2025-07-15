'use server'

import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";// Asegúrate de tener esta función
import { deleteUploadthingFile } from "./delete-upload";

export async function deleteSummaryAction(formData: FormData) {
  const id = formData.get("id") as string;
  const type = formData.get("type") as "apunte" | "pdf";

  const { userId } = await auth();
  if (!userId) throw new Error("No autorizado");

  if (type === "apunte") {
    await prismadb.summary.delete({ where: { id, userId } });
  } else {
    const pdf = await prismadb.pdfSummary.findUnique({
      where: { id, userId },
    });

    if (!pdf) throw new Error("Resumen PDF no encontrado");
    console.log(pdf.uploadKey)
    if (pdf.uploadKey) {
      await deleteUploadthingFile(pdf.uploadKey);
    }

    await prismadb.pdfSummary.delete({ where: { id, userId } });
  }

  revalidatePath("/dashboard");
}
