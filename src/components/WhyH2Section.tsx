import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Award, Dumbbell, Users, Zap, Heart, Trophy } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Certified Expert Trainers',
    description: 'Our trainers are internationally certified with years of experience in transforming bodies.',
  },
  {
    icon: Dumbbell,
    title: 'Modern Imported Equipment',
    description: 'Train with state-of-the-art equipment imported from leading fitness brands worldwide.',
  },
  {
    icon: Users,
    title: 'Personal Training',
    description: 'One-on-one personalized training programs tailored to your specific goals.',
  },
  {
    icon: Zap,
    title: 'CrossFit & Functional',
    description: 'High-intensity CrossFit and functional training for peak athletic performance.',
  },
  {
    icon: Heart,
    title: 'Cardio Excellence',
    description: 'Premium cardio zone with latest machines for optimal heart health.',
  },
  {
    icon: Trophy,
    title: 'Transformation Programs',
    description: 'Proven fat loss and muscle building programs with guaranteed results.',
  },
];

const WhyH2Section = () => {
  const ref = useRef(null);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

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
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">WHY </span>
            <span className="text-primary text-glow">H2 FITNESS</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium group p-8"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyH2Section;
