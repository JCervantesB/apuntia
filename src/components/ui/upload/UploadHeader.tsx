import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function UploadHeader() {
    return (
        <>
            <Badge variant={"premium"} className='p-2'>
                <Sparkles className='h-8 w-8 animate-pulse' />
                <span>Creación de contenido Potenciado con IA</span>
            </Badge>

            <div className='capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                Comienza subiendo{' '}
                <span className="relative inline-block">
                    <span
                        className="absolute inset-0 bg-purple-200/50 -rotate-2 rounded-lg transform -skew-y-1"
                        aria-hidden="true"
                    />
                    <span className="relative z-10 px-2">tu PDF</span>
                </span> {' '}
            </div>


            <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl">
                <p className="text-base mb-4">
                    y deja que Apunt IA haga la magia ✨
                </p>
            </div>
        </>
    )
}