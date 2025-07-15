'use server';

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteUploadthingFile(uploadKey: string) {
  try {
    await utapi.deleteFiles(uploadKey);
    return { success: true };
  } catch (error) {
    console.error("❌ Error al eliminar el archivo de Uploadthing:", error);
    throw new Error("Error al eliminar el archivo");
  }
}
