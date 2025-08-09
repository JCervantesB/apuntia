'use client';
import React from 'react';
import Navigation from '@/components/ui/deep-research/Navigation';
import { UserProfile, useUser } from '@clerk/nextjs';
import { SubscriptionButton } from '@/components/ui/subscription-button';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

const PanelMobile = ({ isPro }: { isPro: boolean }) => {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge 
            variant="secondary" 
            className="mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 backdrop-blur-sm"
          >
            <User className="w-4 h-4 mr-2" />
            Panel de Usuario
          </Badge>
          <h1 className="text-2xl font-bold text-white mb-2">
            Gestiona tu{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              cuenta
            </span>
          </h1>
          <p className="text-sm text-gray-300">
            Administra tu perfil y suscripción
          </p>
        </div>

        {/* Subscription Status Section - Mobile First */}
        <div className="mb-6">
          <div className={`backdrop-blur-sm rounded-xl p-4 shadow-lg transition-all duration-500 ${
            isPro 
              ? "bg-gradient-to-br from-green-900/30 to-emerald-800/40 border border-green-500/20" 
              : "bg-gradient-to-br from-purple-600/70 to-pink-600/70 border-2 border-purple-400/90 shadow-2xl shadow-purple-500/40"
          }`}>

            <div className="relative">
              <h2 className={`text-lg font-semibold mb-3 text-center transition-all duration-300 ${
                isPro 
                  ? "text-green-100" 
                  : "text-white font-bold text-xl drop-shadow-lg"
              }`}>
                {isPro ? "✅ Estado de tu suscripción" : "🚀 ¡Mejora tu experiencia!"}
              </h2>
              <div className="text-center mb-4">
                <p className={`text-sm leading-relaxed transition-all duration-300 ${
                  isPro 
                    ? "text-green-200" 
                    : "text-purple-50 font-semibold drop-shadow-md"
                }`}>
                  Hola{" "}
                  <span className={`font-bold ${
                    isPro 
                      ? "bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent" 
                      : "text-purple-100 drop-shadow-lg"
                  }`}>
                    {user?.username}
                  </span>
                  {" "}{isPro
                    ? "tienes acceso completo a todas las funciones premium."
                    : "¡desbloquea todo el potencial de la IA más avanzada!"}
                </p>
                {!isPro && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-lg border border-slate-500/30">
                      <div className="text-center mb-2">
                        <span className="text-white font-semibold text-lg">
                          Versión
                        </span>
                        <span className="ml-2 text-purple-300 font-bold text-base">
                          PRO
                        </span>
                     </div>
                     <p className="text-purple-50 text-xs font-medium drop-shadow-md text-center">
                       🔥 ¡IA avanzada ilimitada!
                     </p>
                   </div>
                 )}
              </div>
              <div className="flex justify-center">
                <div className={isPro ? "" : "animate-bounce"}>
                  <SubscriptionButton isPro={isPro} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section - Mobile Optimized */}
        <div className="w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelMobile;