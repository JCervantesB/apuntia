import { Badge } from '@/components/ui/badge'
import UploadForm from '@/components/ui/upload/UploadForm'
import UploadHeader from '@/components/ui/upload/UploadHeader'
import { Sparkles } from 'lucide-react'
import React from 'react'

const UploadPage = () => {
    return (
        <section className='min-h-screen flex flex-col items-center'>
            <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
                <UploadHeader />
                <UploadForm />
            </div>
        </section>
    )
}

export default UploadPage