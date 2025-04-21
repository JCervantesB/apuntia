import React from 'react';
import { checkSubscription } from '@/lib/subscription';
import PanelClient from './PanelClient';

export const runtime = 'edge';
const PanelPage = async () => {
  const isPro = await checkSubscription();

  return <PanelClient isPro={isPro} />;
};

export default PanelPage;