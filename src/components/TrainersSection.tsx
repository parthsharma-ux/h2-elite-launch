import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Award, Users } from 'lucide-react';

const trainers = [
  {
    name: 'Vikram Singh',
    role: 'Head Trainer',
    specialization: 'Strength & Conditioning',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop&crop=faces',
    certifications: ['NSCA-CPT', 'CrossFit L2'],
  },
  {
    name: 'Ananya Rao',
    role: 'Senior Trainer',
    specialization: 'Weight Loss & HIIT',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&crop=faces',
    certifications: ['ACE', 'Nutrition Coach'],
  },
  {
    name: 'Arjun Reddy',
    role: 'CrossFit Coach',
    specialization: 'CrossFit & Functional',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=500&fit=crop&crop=faces',
    certifications: ['CrossFit L3', 'Olympic Lifting'],
  },
  {
    name: 'Meera Kapoor',
    role: 'Yoga & Wellness',
    specialization: 'Yoga & Flexibility',
    experience: '7+ Years',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&crop=faces',
    certifications: ['RYT-500', 'Meditation'],
  },
];

const TrainersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trainers" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-muted/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Expert Team
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">MEET OUR </span>
            <span className="text-primary text-glow">TRAINERS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            World-class certified trainers dedicated to your transformation journey.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-premium overflow-hidden">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(195_100%_50%_/_0.2)_0%,transparent_70%)]" />
                  </div>

                  {/* Social Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:bg-primary"
                  >
                    <Instagram className="w-5 h-5 text-foreground" />
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
                    {trainer.role}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Award className="w-4 h-4 text-primary" />
                      <span>{trainer.specialization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{trainer.experience}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
