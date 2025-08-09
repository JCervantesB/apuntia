'use client';
import React, { useState, useEffect } from 'react';
import PanelMobile from './PanelMobile';
import PanelDesktop from './PanelDesktop';

const PanelClient = ({ isPro }: { isPro: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      setIsLoading(false);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return isMobile ? <PanelMobile isPro={isPro} /> : <PanelDesktop isPro={isPro} />;
};

export default PanelClient;