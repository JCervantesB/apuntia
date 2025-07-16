
import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { checkApiLimit } from "@/lib/api-limit";


const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({pdf: { maxFileSize: "32MB" }}).middleware(async ({ req }) => {
       const user =  await currentUser();
       const freeTrial = await checkApiLimit();
       if (!freeTrial) {
           throw new UploadThingError("Has alcanzado el límite de uso gratuito. Por favor, actualiza tu cuenta para continuar.");
       }

       if(!user) throw new UploadThingError("No autorizado");

       return { userId: user.id };
        
    })
    .onUploadComplete(async ({ metadata, file }) => {
        console.log("upload  complete for user id:", metadata.userId);
        console.log("file url:", file);

        const fileUrl = file.ufsUrl;
        console.log("file ufsUrl:", fileUrl);

        if (!fileUrl) {
        console.error("No se encontró la URL del archivo en 'file'");
        throw new Error("No se encontró URL en archivo subido");
    }

        return { 
            userId: metadata.userId, 
            fileUrl,
            fileName: file.name
        };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;