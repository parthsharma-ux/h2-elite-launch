import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from './ui/button';

const WHATSAPP_NUMBER = '919314010442';

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const plans = [
    {
      name: 'Basic',
      price: '1,499',
      period: '/month',
      icon: Zap,
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Full Gym Access',
        'Locker Room Access',
        'Basic Equipment Training',
        'Group Classes (2/week)',
        'Fitness Assessment',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '2,499',
      period: '/month',
      icon: Star,
      description: 'Most popular choice for serious fitness enthusiasts',
      features: [
        'Everything in Basic',
        'Unlimited Group Classes',
        'Personal Training (4 sessions)',
        'Nutrition Consultation',
        'Body Composition Analysis',
        'Priority Equipment Access',
      ],
      popular: true,
    },
    {
      name: 'Elite',
      price: '4,999',
      period: '/month',
      icon: Crown,
      description: 'Ultimate transformation with personal attention',
      features: [
        'Everything in Pro',
        'Unlimited Personal Training',
        'Custom Diet Plan',
        'Recovery Sessions',
        'Premium Supplements',
        '24/7 Trainer Support',
        'VIP Locker',
      ],
      popular: false,
    },
  ];

  const handleJoinNow = (planName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in the ${planName} membership plan at H2 FITNESS. Please share more details.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Membership Plans
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">CHOOSE YOUR </span>
            <span className="text-primary text-glow">PLAN</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Invest in yourself with our flexible membership options designed for every fitness level.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative card-premium p-8 ${plan.popular ? 'border-primary/50 scale-105 lg:scale-110' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>

              {/* Plan Name & Description */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 h-12">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-muted-foreground text-lg">₹</span>
                <span className={`font-display text-5xl font-bold ${plan.popular ? 'text-primary text-glow' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? 'hero' : 'heroOutline'}
                size="xl"
                className="w-full"
                onClick={() => handleJoinNow(plan.name)}
              >
                Join Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            🔒 7-Day Money Back Guarantee • No Hidden Fees • Cancel Anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
