import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiReact, SiNodedotjs, SiTypescript, SiPostgresql, 
  SiTailwindcss, SiMongodb, SiNextdotjs, SiRedis
} from 'react-icons/si';
import { Layers, Server, ArrowRight } from 'lucide-react';

interface StackSelectorProps {
  className?: string;
}

const frontendTechs = [
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Next.js', icon: SiNextdotjs },
];

const backendTechs = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Redis', icon: SiRedis },
];

export default function StackSelector({ className = '' }: StackSelectorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    if (!section || !leftCard || !rightCard) return;

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
      scrollTl.fromTo(leftCard,
        { x: '-60vw', rotateY: 55, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(rightCard,
        { x: '60vw', rotateY: -55, opacity: 0 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo('.stack-headline',
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.stack-cta',
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(leftCard,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '-28vw', rotateY: -35, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(rightCard,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '28vw', rotateY: 35, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.stack-headline, .stack-cta',
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
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
      id="stacks"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-[#FFB300]/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12">
        {/* Headline */}
        <h2 className="stack-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F2F7] text-center mb-8 lg:mb-12">
          Pick your{' '}
          <span className="text-[#FFB300]">foundation.</span>
        </h2>

        {/* Cards Container */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch perspective-1000">
          {/* Front-End Card */}
          <div
            ref={leftCardRef}
            className="flex-1 glass-card p-6 sm:p-8 lg:p-10 preserve-3d hover:bg-white/8 transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#2ED9FF]/20 flex items-center justify-center">
                <Layers className="w-6 h-6 lg:w-7 lg:h-7 text-[#2ED9FF]" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#F4F2F7]">Front-End</h3>
                <p className="text-sm text-[#B8B2C6]">User interfaces & experiences</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {frontendTechs.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <tech.icon className="w-5 h-5 text-[#2ED9FF]" />
                  <span className="text-sm text-[#F4F2F7]">{tech.name}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-[#B8B2C6] mb-2">Core Skills:</p>
              <div className="flex flex-wrap gap-2">
                {['Components', 'State', 'Hooks', 'Animations', 'Responsive'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-xs bg-[#2ED9FF]/10 text-[#2ED9FF] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Back-End Card */}
          <div
            ref={rightCardRef}
            className="flex-1 glass-card p-6 sm:p-8 lg:p-10 preserve-3d hover:bg-white/8 transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#00E676]/20 flex items-center justify-center">
                <Server className="w-6 h-6 lg:w-7 lg:h-7 text-[#00E676]" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#F4F2F7]">Back-End</h3>
                <p className="text-sm text-[#B8B2C6]">Servers, APIs & databases</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {backendTechs.map((tech) => (
                <div 
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <tech.icon className="w-5 h-5 text-[#00E676]" />
                  <span className="text-sm text-[#F4F2F7]">{tech.name}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-[#B8B2C6] mb-2">Core Skills:</p>
              <div className="flex flex-wrap gap-2">
                {['REST APIs', 'GraphQL', 'Auth', 'Caching', 'Security'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-xs bg-[#00E676]/10 text-[#00E676] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="stack-cta mt-8 lg:mt-12 group px-8 py-4 bg-white/5 hover:bg-white/10 text-[#F4F2F7] font-medium rounded-full border border-white/10 transition-all hover:scale-105 flex items-center gap-2">
          Compare stacks
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
