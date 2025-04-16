'use client';
import React from 'react';
import Navigation from '@/components/ui/deep-research/Navigation';
import { UserProfile, useUser } from '@clerk/nextjs';
import { SubscriptionButton } from '@/components/ui/subscription-button';

const PanelClient = ({ isPro }: { isPro: boolean }) => {
    const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-start gap-8 py-16">
      <Navigation />
      <div>
        <UserProfile />
      </div>
      <div className="flex items-center flex-col px-4 lg:px-8 space-y-2 mt-6 border rounded-xl p-4 w-full max-w-md bg-muted/50 shadow-sm">
  <h2 className="text-lg font-semibold">Estado de tu suscripción</h2>
  <p className="text-muted-foreground text-sm">
    Hola <span className='font-bold'>{user?.username} </span>
    {isPro
      ? "actualmente tienes un plan Pro con acceso ilimitado."
      : "actualmente cuentas con un plan gratuito con acceso limitado."}
  </p>
  <SubscriptionButton isPro={isPro} />
</div>
    </div>
  );
};

export default PanelClient;