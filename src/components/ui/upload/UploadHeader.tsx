import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function UploadHeader() {
    return (
        <>
            <Badge variant={"premium"} className='p-3 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'>
                <Sparkles className='h-5 w-5 animate-pulse mr-2' />
                <span className='font-semibold'>Resúmenes Potenciados con IA</span>
            </Badge>

            <div className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6'>
                Comienza subiendo{' '}
                <span className="relative inline-block">
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 -rotate-2 rounded-lg transform -skew-y-1 blur-sm"
                        aria-hidden="true"
                    />
                    <span className="relative z-10 px-3 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">tu PDF</span>
                </span>
            </div>

            <div className="text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                <p className="text-xl mb-4">
                    y deja que <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">ApuntIA</span> haga la magia ✨
                </p>
            </div>
        </>
    )
}