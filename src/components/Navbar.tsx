import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#programs' },
    { name: 'AI Coach', href: '#ai-coach' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-display text-2xl font-bold">
            <span className="text-foreground">H2</span>
            <span className="text-primary text-glow"> FITNESS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium uppercase tracking-wider text-sm"
            >
              {link.name}
            </a>
          ))}
          <Button variant="hero" size="default">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden glass"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium uppercase tracking-wider text-sm py-2"
            >
              {link.name}
            </a>
          ))}
          <Button variant="hero" size="default" className="mt-2">
            Join Now
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
