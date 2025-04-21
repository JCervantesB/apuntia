import LandingContent from '@/components/ui/deep-research/LandingContent'
import { LandingHero } from '@/components/ui/deep-research/LandingHero'
import LandingNavbar from '@/components/ui/deep-research/LandingNavbar'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='h-full'>
       <LandingNavbar /> 
       <LandingHero />
       <LandingContent />
    </div>
  )
}

export default LandingPage