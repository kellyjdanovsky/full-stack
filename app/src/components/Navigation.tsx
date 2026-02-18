import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'JavaScript', href: '/javascript' },
  { label: 'Python', href: '/python' },
  { label: 'SQL', href: '/sql' },
  { label: 'Architecture', href: '/project-structure' },
  { label: 'Art du Code', href: '/clean-code' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || !isHome
          ? 'bg-[#07040A]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B2D8E] to-[#2ED9FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#F4F2F7]">
                CodeMaster
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors relative group ${location.pathname === link.href ? 'text-[#F4F2F7] font-medium' : 'text-[#B8B2C6] hover:text-[#F4F2F7]'
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#7B2D8E] transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/javascript"
                className="px-5 py-2.5 bg-[#7B2D8E] hover:bg-[#9B3DB2] text-white text-sm font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#7B2D8E]/30"
              >
                Gémarrer
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F4F2F7]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#07040A]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative pt-24 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="block text-2xl font-semibold text-[#F4F2F7] text-left py-3 border-b border-white/10"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/javascript"
                    className="block mt-6 px-6 py-4 bg-[#7B2D8E] text-white text-lg font-medium rounded-full text-center"
                  >
                    Commencer
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
