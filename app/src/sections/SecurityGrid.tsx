import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Key, Eye, ArrowRight } from 'lucide-react';

interface SecurityGridProps {
  className?: string;
}

const securityFeatures = [
  { name: 'Auth', icon: Lock, description: 'JWT, OAuth, Sessions' },
  { name: 'Secrets', icon: Key, description: 'Env vars, Vaults' },
  { name: 'Validation', icon: Shield, description: 'Input sanitization' },
  { name: 'Monitoring', icon: Eye, description: 'Logs, alerts' },
];

export default function SecurityGrid({ className = '' }: SecurityGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const card = cardRef.current;
    if (!section || !grid || !card) return;

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
      scrollTl.fromTo(grid,
        { rotateX: 70, opacity: 0 },
        { rotateX: 55, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { y: '16vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.sec-headline',
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.sec-caption',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Grid background position shifts

      // EXIT (70-100%)
      scrollTl.fromTo(grid,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.sec-headline, .sec-caption',
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
      id="security"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* Neon Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 pointer-events-none perspective-1000"
        style={{
          background: `
            linear-gradient(rgba(123, 45, 142, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 45, 142, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'rotateX(55deg) translateY(-20%)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Additional glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[#7B2D8E]/20 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2 className="sec-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] text-center mb-8">
          Ship with{' '}
          <span className="text-[#7B2D8E]">confidence.</span>
        </h2>

        {/* Center Card */}
        <div
          ref={cardRef}
          className="glass-card p-6 sm:p-8 max-w-lg w-full mx-auto"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#7B2D8E]/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#7B2D8E]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#F4F2F7]">Security</h3>
              <p className="text-sm text-[#B8B2C6]">Production-grade practices</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {securityFeatures.map((feature) => (
              <div 
                key={feature.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-[#7B2D8E]" />
                <div>
                  <span className="text-sm font-medium text-[#F4F2F7] block">{feature.name}</span>
                  <span className="text-xs text-[#B8B2C6]">{feature.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="sec-caption text-center text-[#B8B2C6] max-w-xl mt-8 mb-4">
          Production-grade practices from day one.
        </p>

        <button className="sec-caption group px-8 py-4 bg-[#7B2D8E]/20 hover:bg-[#7B2D8E]/30 text-[#B8B2C6] hover:text-[#F4F2F7] font-medium rounded-full border border-[#7B2D8E]/30 transition-all hover:scale-105 flex items-center gap-2">
          Read the security guide
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
