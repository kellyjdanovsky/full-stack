import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Youtube, Twitter, Mail, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: form,
        start: 'top 85%',
        end: 'top 55%',
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.set(form, {
            y: 50 - self.progress * 50,
            opacity: self.progress
          });
        }
      });
      localTriggersRef.current.push(st);
    }, section);

    return () => {
      localTriggersRef.current.forEach(st => st.kill());
      localTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative w-full bg-[#0B0B10] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-[#7B2D8E]/15 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Ready to{' '}
            <span className="text-gradient-cyan">start?</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-xl mx-auto">
            Tell us what you're building. We'll help you choose the right path.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card p-8 lg:p-12 max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#00E676]/20 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-[#00E676]" />
              </div>
              <h3 className="text-2xl font-bold text-[#F4F2F7] mb-2">Message sent!</h3>
              <p className="text-[#B8B2C6]">We'll get back to you within 24 hours.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[#7B2D8E] hover:text-[#9B3DB2] font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#B8B2C6] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F4F2F7] placeholder-[#B8B2C6]/50 focus:outline-none focus:border-[#7B2D8E] focus:ring-1 focus:ring-[#7B2D8E] transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#B8B2C6] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F4F2F7] placeholder-[#B8B2C6]/50 focus:outline-none focus:border-[#7B2D8E] focus:ring-1 focus:ring-[#7B2D8E] transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#B8B2C6] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F4F2F7] placeholder-[#B8B2C6]/50 focus:outline-none focus:border-[#7B2D8E] focus:ring-1 focus:ring-[#7B2D8E] transition-all resize-none"
                    placeholder="Tell us about your goals..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 px-8 py-4 bg-[#7B2D8E] hover:bg-[#9B3DB2] disabled:bg-[#7B2D8E]/50 text-white font-medium rounded-full transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </>
          )}
        </form>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Email */}
            <a 
              href="mailto:hello@codemaster.academy"
              className="flex items-center gap-2 text-[#B8B2C6] hover:text-[#F4F2F7] transition-colors"
            >
              <Mail className="w-5 h-5" />
              hello@codemaster.academy
            </a>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#B8B2C6] hover:text-[#F4F2F7] transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-[#B8B2C6]">
              © 2025 CodeMaster Academy
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
