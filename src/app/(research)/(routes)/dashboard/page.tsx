import Dashboard from '@/components/ui/deep-research/Dashboard';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <section className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge 
              variant="secondary" 
              className="mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm animate-pulse"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Panel de Control
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tu{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Visualiza y gestiona toda tu actividad en{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                ApuntIA
              </span>
            </p>
          </div>

          {/* Main Content */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
              <Dashboard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page