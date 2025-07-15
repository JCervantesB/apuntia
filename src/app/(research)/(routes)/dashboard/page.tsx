import Dashboard from '@/components/ui/deep-research/Dashboard';
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12">
      <h2 className="text-lg font-semibold mt-8">Dashboard</h2>

      <div className="flex items-center flex-col px-4 lg:px-8 space-y-2 mt-6 border rounded-xl p-4 w-2/3">
        <Dashboard />
      </div>
    </div>

  );
}

export default page