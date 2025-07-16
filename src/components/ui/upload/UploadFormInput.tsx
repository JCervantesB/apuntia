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
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex justify-center items-center gap-2 flex-wrap sm:flex-nowrap">
                <Input id="file" type="file" name="file" 
                    accept="application/pdf"
                    required
                    className={cn(isLoading && 'opacity-50 cursor-not-allowed') + ' w-full sm:w-auto rounded-full hover:bg-white/80 focus:bg-white/80 transition-colors px-4 py-2'}
                    disabled={isLoading}
                    aria-label="Sube tu PDF para generar un resumen"
                    aria-required="true"
                />

                <Button className="rounded-full px-6 w-full sm:w-auto" disabled={isLoading} variant={"premium"}>{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Procesando...</> : "Sube tu PDF"}</Button>
            </div>
        </form>
    )
})

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;