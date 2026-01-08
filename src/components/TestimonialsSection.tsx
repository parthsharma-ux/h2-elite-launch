import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    text: "H2 FITNESS transformed my life. Lost 20kg in 4 months with their expert guidance. The trainers are incredibly supportive and the equipment is world-class.",
  },
  {
    name: 'Sneha Patel',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    text: "The AI fitness coach feature is amazing! It gave me a personalized plan that actually works. I've never felt stronger or more confident.",
  },
  {
    name: 'Arjun Mehta',
    role: 'Doctor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    text: "As a doctor, I appreciate how H2 FITNESS focuses on sustainable fitness. Their scientific approach to training is exactly what I was looking for.",
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    text: "The atmosphere at H2 FITNESS is unmatched. From the moment you walk in, you feel motivated. Best investment I've made in myself!",
  },
  {
    name: 'Vikash Singh',
    role: 'Athlete',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    rating: 5,
    text: "Training at H2 FITNESS has taken my athletic performance to the next level. The CrossFit coaches here are exceptional.",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(200_55%_50%_/_0.03)_0%,transparent_50%)]" />

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
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">WHAT OUR </span>
            <span className="text-primary text-glow">MEMBERS SAY</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 50,
                  position: index === currentIndex ? 'relative' : 'absolute',
                }}
                transition={{ duration: 0.5 }}
                className="w-full"
                style={{ visibility: index === currentIndex ? 'visible' : 'hidden' }}
              >
                <div className="card-premium p-8 md:p-12 text-center">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />

                  {/* Text */}
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-body">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="text-left">
                      <div className="font-display text-lg font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Scrolling Logos / Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border"
        >
          <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex items-center justify-center flex-wrap gap-12 opacity-50">
            {['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta'].map((company) => (
              <div key={company} className="font-display text-2xl text-metallic font-bold">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
