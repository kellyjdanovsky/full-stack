import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Layout, Server, Layers, Sparkles,
  Circle, ArrowRight, Download
} from 'lucide-react';

interface RoadmapTimelineProps {
  className?: string;
}

const phases = [
  {
    number: '01',
    title: 'Foundations',
    description: 'Master the building blocks of the web. HTML semantics, CSS layout, JavaScript fundamentals, and algorithmic thinking.',
    icon: Code2,
    color: '#2ED9FF',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'CLI'],
    duration: '3-6 months'
  },
  {
    number: '02',
    title: 'Front-End',
    description: 'Build modern user interfaces with React, TypeScript, and Tailwind CSS. Learn component architecture and state management.',
    icon: Layout,
    color: '#FF2ECC',
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Figma'],
    duration: '3-6 months'
  },
  {
    number: '03',
    title: 'Back-End',
    description: 'Create robust APIs and manage databases. Node.js, Express, PostgreSQL, MongoDB, authentication, and authorization.',
    icon: Server,
    color: '#00E676',
    skills: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST', 'Auth'],
    duration: '3-6 months'
  },
  {
    number: '04',
    title: 'Full-Stack',
    description: 'Combine everything into production-ready applications. Testing, CI/CD, deployment, and advanced patterns.',
    icon: Layers,
    color: '#FFB300',
    skills: ['Next.js', 'Testing', 'Docker', 'CI/CD', 'AWS'],
    duration: '6-12 months'
  },
  {
    number: '05',
    title: 'Specialize',
    description: 'Choose your path: AI/ML with Python, 3D/WebGL with Three.js, DevOps with Kubernetes, or Design Systems.',
    icon: Sparkles,
    color: '#7B2D8E',
    skills: ['AI/ML', 'WebGL', 'DevOps', 'Design', 'Leadership'],
    duration: 'Ongoing'
  },
];

export default function RoadmapTimeline({ className = '' }: RoadmapTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Line draw animation
      gsap.fromTo(line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.4,
          }
        }
      );

      // Phase cards animation
      const cards = section.querySelectorAll('.phase-card');
      cards.forEach((card) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.4,
          onUpdate: (self) => {
            gsap.set(card, {
              y: 40 - self.progress * 40,
              opacity: self.progress
            });
          }
        });
        localTriggersRef.current.push(st);
      });
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
      id="roadmap"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#7B2D8E]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#2ED9FF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Your learning{' '}
            <span className="text-gradient-cyan">path.</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-xl mx-auto">
            A structured journey from beginner to expert. Follow the phases or jump to what you need.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2ED9FF] via-[#FF2ECC] to-[#7B2D8E] origin-top hidden sm:block"
          />

          {/* Phases */}
          <div className="space-y-12 lg:space-y-0">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className={`phase-card relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 0 ? '' : 'lg:text-right'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-8 h-8 rounded-full bg-[#07040A] border-2 flex items-center justify-center z-10 hidden sm:flex"
                  style={{ borderColor: phase.color }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: phase.color }} />
                </div>

                {/* Content */}
                <div className={`pl-12 sm:pl-0 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                  <div className="glass-card-sm p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                    {/* Header */}
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${phase.color}20` }}
                      >
                        <phase.icon className="w-6 h-6" style={{ color: phase.color }} />
                      </div>
                      <div>
                        <span className="mono text-xs tracking-wider text-[#B8B2C6]">
                          PHASE {phase.number}
                        </span>
                        <h3 className="text-xl font-bold text-[#F4F2F7]">{phase.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#B8B2C6] text-sm mb-4 leading-relaxed">
                      {phase.description}
                    </p>

                    {/* Skills */}
                    <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? '' : 'lg:justify-end'}`}>
                      {phase.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 text-[#B8B2C6]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className={`flex items-center gap-2 text-sm ${index % 2 === 0 ? '' : 'lg:justify-end'}`}>
                      <Circle className="w-3 h-3 text-[#B8B2C6]" />
                      <span className="text-[#B8B2C6]">{phase.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-[#7B2D8E] hover:bg-[#9B3DB2] text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#7B2D8E]/40 flex items-center gap-2 mx-auto">
            <Download className="w-5 h-5" />
            Download the full roadmap
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
