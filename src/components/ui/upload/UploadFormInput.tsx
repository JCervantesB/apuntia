import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, 
UploadFormInputProps>(
    ({onSubmit, isLoading}, ref) => {
    return (
        <form ref={ref} className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="text-center mb-4">
                <p className="text-white/80 text-sm mb-2">Selecciona un archivo PDF para generar un resumen inteligente</p>
                <p className="text-white/60 text-xs">Tamaño máximo: 20MB • Solo archivos PDF</p>
            </div>
            
            <div className="flex justify-center items-center gap-4 flex-wrap sm:flex-nowrap">
                <Input id="file" type="file" name="file" 
                    accept="application/pdf"
                    required
                    className={cn(isLoading && 'opacity-50 cursor-not-allowed') + ' w-full sm:w-auto rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 hover:bg-white/20 focus:bg-white/20 transition-colors px-4 py-3'}
                    disabled={isLoading}
                    aria-label="Sube tu PDF para generar un resumen"
                    aria-required="true"
                />

                <Button className="rounded-xl px-8 py-3 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-all duration-200" disabled={isLoading}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Procesando...</> : "Sube tu PDF"}</Button>
            </div>
            
            <div className="text-center mt-2">
                <p className="text-white/50 text-xs">El proceso puede tomar unos minutos dependiendo del tamaño del archivo</p>
            </div>
        </form>
    )
})

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;