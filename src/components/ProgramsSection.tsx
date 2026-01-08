import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Flame, Dumbbell, TrendingUp, Zap, User, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const WHATSAPP_NUMBER = '919314010442';

const programs = [
  {
    icon: Dumbbell,
    title: 'Muscle Building',
    subtitle: 'Build Lean Mass',
    description: 'Comprehensive strength training program designed to build muscle mass and increase overall strength.',
    details: [
      'Progressive overload training',
      'Compound & isolation exercises',
      'Customized nutrition plan',
      'Weekly progress tracking',
      '3-6 month transformation timeline',
    ],
    color: 'from-blue-500 to-primary',
  },
  {
    icon: Flame,
    title: 'Fat Loss',
    subtitle: 'Burn & Tone',
    description: 'High-intensity fat burning program combining cardio and strength training for maximum calorie burn.',
    details: [
      'HIIT cardio sessions',
      'Metabolic resistance training',
      'Calorie deficit meal plans',
      'Body composition analysis',
      'Sustainable lifestyle habits',
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Weight Gain',
    subtitle: 'Healthy Mass',
    description: 'Structured program for healthy weight gain through proper nutrition and strength training.',
    details: [
      'Caloric surplus diet plan',
      'Heavy compound movements',
      'Rest and recovery protocols',
      'Supplement guidance',
      'Weekly weigh-ins & adjustments',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'CrossFit Training',
    subtitle: 'Peak Performance',
    description: 'Intense functional fitness program for athletes seeking peak physical performance.',
    details: [
      'WOD (Workout of the Day)',
      'Olympic lifting techniques',
      'Gymnastics movements',
      'Endurance conditioning',
      'Competition preparation',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: User,
    title: 'Personal Training',
    subtitle: '1-on-1 Coaching',
    description: 'Private one-on-one sessions with expert trainers for personalized attention and faster results.',
    details: [
      'Custom workout programs',
      'Form correction & technique',
      'Injury prevention',
      'Flexible scheduling',
      'Accountability coaching',
    ],
    color: 'from-primary to-cyan-400',
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  const handleStartProgram = (programTitle: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${programTitle} program at H2 FITNESS. Please share more details.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="programs" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Our Programs
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">TRAINING </span>
            <span className="text-primary text-glow">PROGRAMS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your path to greatness. Each program is designed by experts for maximum results.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium group cursor-pointer overflow-hidden"
              onClick={() => setSelectedProgram(program)}
            >
              {/* Gradient Top */}
              <div className={`h-2 bg-gradient-to-r ${program.color}`} />
              
              <div className="p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
                  {program.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {program.description}
                </p>

                <Button variant="heroOutline" size="default" className="w-full">
                  Learn More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-premium max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient Top */}
              <div className={`h-2 bg-gradient-to-r ${selectedProgram.color}`} />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedProgram.color} flex items-center justify-center shadow-lg`}>
                      <selectedProgram.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {selectedProgram.title}
                      </h3>
                      <p className="text-primary text-sm font-medium uppercase tracking-wider">
                        {selectedProgram.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedProgram.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-8">
                  {selectedProgram.details.map((detail, index) => (
                    <motion.div
                      key={detail}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedProgram.color}`} />
                      <span className="text-foreground">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  onClick={() => handleStartProgram(selectedProgram.title)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start This Program
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProgramsSection;
