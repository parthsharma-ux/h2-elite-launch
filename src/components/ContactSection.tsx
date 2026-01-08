import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '919314010442';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.goal) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          goal: formData.goal,
        });

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', goal: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      info: 'Hathoj, Jaipur',
      subInfo: 'Rajasthan, India',
    },
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 93140 10442',
      subInfo: 'Mon-Sat: 6AM - 10PM',
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'info@h2fitness.com',
      subInfo: 'We reply within 24 hours',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      info: 'Mon - Sat: 6:00 AM - 10:00 PM',
      subInfo: 'Sunday: 7:00 AM - 8:00 PM',
    },
  ];

  const goals = [
    'Fat Loss',
    'Muscle Building',
    'General Fitness',
    'Strength Training',
    'Personal Training',
    'Other',
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">START YOUR </span>
            <span className="text-primary text-glow">JOURNEY</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to transform? Get in touch with us and take the first step towards your fitness goals.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground text-sm">{item.info}</p>
                  <p className="text-muted-foreground text-sm">{item.subInfo}</p>
                </motion.div>
              ))}
            </div>

            {/* Map - Hathoj, Jaipur */}
            <div className="card-premium overflow-hidden h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14231.41234567890!2d75.7849!3d26.9550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3d1234567890%3A0xabcdef123456!2sHathoj%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="hero" size="xl" className="w-full bg-green-600 hover:bg-green-700 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
              <a href="tel:+919314010442" className="flex-1">
                <Button variant="heroOutline" size="xl" className="w-full">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right - Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-premium p-8 border-electric">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Get a Free Consultation
              </h3>
              <p className="text-muted-foreground mb-8">
                Fill the form below and our team will contact you within 24 hours.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-foreground mb-2">
                    Thank You!
                  </h4>
                  <p className="text-muted-foreground">
                    We'll contact you shortly to schedule your free consultation.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Fitness Goal */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fitness Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select your goal</option>
                      {goals.map((goal) => (
                        <option key={goal} value={goal}>{goal}</option>
                      ))}
                    </select>
                  </div>

                  <Button variant="hero" size="xl" className="w-full" type="submit" disabled={isLoading}>
                    <Send className="w-5 h-5 mr-2" />
                    {isLoading ? 'Submitting...' : 'Request Free Consultation'}
                  </Button>

                  <p className="text-center text-muted-foreground text-xs">
                    By submitting, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
