import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const transformations = [
  {
    name: 'Rahul Sharma',
    duration: '3 Months',
    weightLoss: '15 kg',
    before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=500&fit=crop&crop=faces',
    after: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=400&h=500&fit=crop&crop=faces',
    program: 'Fat Loss',
  },
  {
    name: 'Priya Singh',
    duration: '4 Months',
    weightLoss: '12 kg',
    before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&crop=faces',
    after: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=500&fit=crop&crop=faces',
    program: 'Transformation',
  },
  {
    name: 'Amit Patel',
    duration: '6 Months',
    weightLoss: '+8 kg Muscle',
    before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop&crop=faces',
    after: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=500&fit=crop&crop=faces',
    program: 'Muscle Building',
  },
];

const TransformationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="transformations" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Real Results
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">BODY </span>
            <span className="text-primary text-glow">TRANSFORMATIONS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real members. Real transformations. See what's possible at H2 FITNESS.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Transformations Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {transformations.map((transformation, index) => (
            <motion.div
              key={transformation.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TransformationCard {...transformation} />
            </motion.div>
          ))}
        </div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '1000+', label: 'Transformations' },
            { value: '98%', label: 'Success Rate' },
            { value: '50,000+', label: 'Kg Lost' },
            { value: '4.9/5', label: 'Member Rating' },
          ].map((stat, i) => (
            <div key={stat.label} className="card-premium p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TransformationCard = ({
  name,
  duration,
  weightLoss,
  before,
  after,
  program,
}: {
  name: string;
  duration: string;
  weightLoss: string;
  before: string;
  after: string;
  program: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="card-premium overflow-hidden group">
      {/* Before/After Slider */}
      <div className="relative h-80 overflow-hidden">
        {/* After Image (Background) */}
        <img
          src={after}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Before Image (Overlay with clip) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={before}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-background/30" />
        </div>

        {/* Slider Control */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_hsl(195_100%_50%)] z-5"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-primary-foreground -rotate-180" />
            <ArrowRight className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium">
          Before
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
          After
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl font-bold text-foreground">{name}</h3>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {program}
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <span>{duration}</span>
          <span className="text-primary font-semibold">{weightLoss}</span>
        </div>
      </div>
    </div>
  );
};

export default TransformationsSection;
