import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiJavascript, SiTypescript, SiPython, SiGo, SiRust, 
  SiKotlin, SiPhp
} from 'react-icons/si';
import { Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageCarouselProps {
  className?: string;
}

const languages = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', description: 'The language of the web' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', description: 'Typed JavaScript' },
  { name: 'Python', icon: SiPython, color: '#3776AB', description: 'AI & Data Science' },
  { name: 'Go', icon: SiGo, color: '#00ADD8', description: 'High-performance backend' },
  { name: 'Rust', icon: SiRust, color: '#DEA584', description: 'Systems programming' },
  { name: 'Java', icon: Coffee, color: '#007396', description: 'Enterprise standard' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', description: 'Modern Android' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4', description: 'Web backend' },
];

export default function LanguageCarousel({ className = '' }: LanguageCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;
    if (!section || !carousel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const trigger = scrollTl.scrollTrigger;
      if (trigger) {
        localTriggersRef.current.push(trigger);
      }

      // ENTRANCE (0-30%)
      scrollTl.fromTo(carousel,
        { scale: 0.65, rotateZ: -12, opacity: 0 },
        { scale: 1, rotateZ: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo('.lang-headline',
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo('.lang-caption',
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.lang-card',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.05
      );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%)
      scrollTl.fromTo(carousel,
        { x: 0, scale: 1, opacity: 1 },
        { x: '18vw', scale: 0.78, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.lang-headline',
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.lang-caption',
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => {
      localTriggersRef.current.forEach(st => st.kill());
      localTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="languages"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#FF2ECC]/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2 className="lang-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] text-center mb-4">
          Speak every{' '}
          <span className="text-[#FF2ECC]">stack.</span>
        </h2>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="relative w-full max-w-5xl my-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="lang-card group"
              >
                <div className="glass-card-sm p-5 lg:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full">
                  <div 
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${lang.color}20` }}
                  >
                    <lang.icon 
                      className="w-6 h-6 lg:w-8 lg:h-8" 
                      style={{ color: lang.color }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#F4F2F7] mb-1">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-[#B8B2C6]">
                    {lang.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="lang-caption text-center text-[#B8B2C6] max-w-xl mb-6">
          From JavaScript to Rust—master the languages that run the modern web.
        </p>

        <button className="lang-caption text-[#FF2ECC] hover:text-[#FF5ED7] font-medium flex items-center gap-2 transition-colors">
          See the full list
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
