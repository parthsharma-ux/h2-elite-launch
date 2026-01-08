import { motion } from 'framer-motion';
import { Dumbbell, Instagram, Facebook, Youtube, Twitter, Heart, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#trainers' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Contact', href: '#contact' },
    ],
    programs: [
      { name: 'Fat Loss', href: '#programs' },
      { name: 'Muscle Building', href: '#programs' },
      { name: 'Personal Training', href: '#programs' },
      { name: 'CrossFit', href: '#programs' },
    ],
    support: [
      { name: 'FAQs', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Membership', href: '#pricing' },
    ],
  };

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold">
                <span className="text-foreground">H2</span>
                <span className="text-primary"> FITNESS</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-4 max-w-sm leading-relaxed">
              Transform your body and mind with premium fitness training. Join the elite community of fitness enthusiasts at H2 FITNESS.
            </p>
            <div className="text-muted-foreground text-sm space-y-2 mb-6">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Hathoj, Jaipur, Rajasthan
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 93140 10442
              </p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">
              Programs
            </h4>
            <ul className="space-y-3">
              {links.programs.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} H2 FITNESS. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for fitness enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
