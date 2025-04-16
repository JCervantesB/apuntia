import React from 'react';
import { checkSubscription } from '@/lib/subscription';
import PanelClient from './PanelClient';


const PanelPage = async () => {
  const isPro = await checkSubscription();

  return <PanelClient isPro={isPro} />;
};

export default PanelPage;