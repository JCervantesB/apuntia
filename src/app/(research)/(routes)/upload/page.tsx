'use client';

import UploadForm from '@/components/ui/upload/UploadForm'
import UploadHeader from '@/components/ui/upload/UploadHeader'
import React from 'react'

export const dynamic = 'force-dynamic';

const UploadPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <section className='min-h-screen flex flex-col items-center justify-center px-4'>
            <div className='mx-auto max-w-4xl w-full'>
                <div className='text-center mb-12'>
                    <UploadHeader />
                </div>
                <div className='bg-gradient-to-br from-purple-900/40 via-slate-800/50 to-indigo-900/40 backdrop-blur-xl border border-purple-300/30 rounded-2xl p-6 shadow-2xl ring-1 ring-purple-400/20'>
                    <UploadForm />
                </div>
            </div>
        </section>
        </div>
    )
}

export default UploadPage
