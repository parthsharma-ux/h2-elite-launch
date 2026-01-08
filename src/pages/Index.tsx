import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhyH2Section from '@/components/WhyH2Section';
import ProgramsSection from '@/components/ProgramsSection';
import PricingSection from '@/components/PricingSection';
import AICoachSection from '@/components/AICoachSection';
import TransformationsSection from '@/components/TransformationsSection';
import TrainersSection from '@/components/TrainersSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Toaster position="top-center" richColors />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <HeroSection />
          <WhyH2Section />
          <ProgramsSection />
          <PricingSection />
          <AICoachSection />
          <TransformationsSection />
          <TrainersSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
