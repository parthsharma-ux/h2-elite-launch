import { motion } from 'framer-motion';
import { Play, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const WHATSAPP_NUMBER = '919314010442';

const HeroSection = () => {
  const handleJoinNow = () => {
    const message = encodeURIComponent("Hi! I'm interested in joining H2 FITNESS. Please share membership details.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.9)' }}
        >
          <source src="/videos/hero-gym.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 video-overlay" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div
          className="mb-4 md:mb-6"
        >
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 border border-primary/30 rounded-full text-primary text-xs md:text-sm font-medium uppercase tracking-widest">
            Premium Fitness
          </span>
        </div>

        <h1
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6"
        >
          <span className="text-foreground">TRANSFORM YOUR</span>
          <br />
          <span className="text-foreground">BODY AT </span>
          <span className="text-primary text-glow-intense">H2 FITNESS</span>
        </h1>

        <p
          className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 font-body px-4"
        >
          Train like an athlete. Look like a champion.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <Button variant="hero" size="xl" className="pulse-glow w-full sm:w-auto" onClick={handleJoinNow}>
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Join Now
          </Button>
          <Button variant="heroOutline" size="xl" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Free Trial
          </Button>
        </div>

        {/* Heartbeat Effect */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div
          className="absolute bottom-8 md:bottom-10 left-0 right-0"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
              {[
                { value: '5000+', label: 'Members' },
                { value: '20+', label: 'Trainers' },
                { value: '15+', label: 'Years' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <div className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-primary text-glow">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
