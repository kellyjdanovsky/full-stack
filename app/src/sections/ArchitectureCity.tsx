import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Folder, FolderOpen, FileCode, 
  FileType, Settings, Database, Layout 
} from 'lucide-react';

interface ArchitectureCityProps {
  className?: string;
}

const folderStructure = [
  {
    name: 'apps',
    type: 'folder',
    icon: FolderOpen,
    color: '#2ED9FF',
    children: [
      { name: 'web', type: 'folder', icon: Layout },
      { name: 'api', type: 'folder', icon: Database },
    ]
  },
  {
    name: 'packages',
    type: 'folder',
    icon: FolderOpen,
    color: '#FF2ECC',
    children: [
      { name: 'ui', type: 'folder', icon: Folder },
      { name: 'config', type: 'folder', icon: Settings },
      { name: 'types', type: 'file', icon: FileType },
      { name: 'utils', type: 'file', icon: FileCode },
    ]
  },
  {
    name: 'infrastructure',
    type: 'folder',
    icon: FolderOpen,
    color: '#00E676',
    children: [
      { name: 'docker', type: 'folder', icon: Folder },
      { name: 'kubernetes', type: 'folder', icon: Folder },
      { name: 'terraform', type: 'folder', icon: Folder },
    ]
  },
  {
    name: 'ml',
    type: 'folder',
    icon: FolderOpen,
    color: '#FFB300',
    children: [
      { name: 'models', type: 'folder', icon: Folder },
      { name: 'notebooks', type: 'folder', icon: Folder },
      { name: 'pipelines', type: 'folder', icon: Folder },
    ]
  },
];

export default function ArchitectureCity({ className = '' }: ArchitectureCityProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const city = cityRef.current;
    if (!section || !city) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      const trigger = scrollTl.scrollTrigger;
      if (trigger) {
        localTriggersRef.current.push(trigger);
      }

      // ENTRANCE (0-30%)
      scrollTl.fromTo(city,
        { y: '70vh', scale: 0.82, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo('.arch-headline',
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.arch-caption',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo('.arch-folder',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Subtle rotation
      scrollTl.fromTo(city,
        { rotateZ: 0 },
        { rotateZ: 2, ease: 'none' },
        0.30
      );

      // EXIT (70-100%)
      scrollTl.fromTo(city,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-18vh', scale: 0.86, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.arch-headline, .arch-caption',
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
      id="architecture"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-[#00E676]/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2 className="arch-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] text-center mb-4">
          Structure that{' '}
          <span className="text-[#00E676]">scales.</span>
        </h2>

        {/* City / Folder Structure */}
        <div 
          ref={cityRef}
          className="w-full max-w-5xl my-8 lg:my-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {folderStructure.map((folder, index) => (
              <div
                key={folder.name}
                className="arch-folder glass-card-sm p-5 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Folder Header */}
                <div className="flex items-center gap-3 mb-4">
                  <folder.icon 
                    className="w-6 h-6"
                    style={{ color: folder.color }}
                  />
                  <span className="font-semibold text-[#F4F2F7] mono text-sm">
                    {folder.name}
                  </span>
                </div>

                {/* Children */}
                <div className="space-y-2 pl-2">
                  {folder.children?.map((child) => (
                    <div 
                      key={child.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <child.icon className="w-4 h-4 text-[#B8B2C6]" />
                      <span className="text-sm text-[#B8B2C6]">{child.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="mt-8 glass-card-sm p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2ED9FF]/10 border border-[#2ED9FF]/30">
                <Layout className="w-4 h-4 text-[#2ED9FF]" />
                <span className="text-sm text-[#2ED9FF]">Frontend</span>
              </div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E676]/10 border border-[#00E676]/30">
                <Database className="w-4 h-4 text-[#00E676]" />
                <span className="text-sm text-[#00E676]">API</span>
              </div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB300]/10 border border-[#FFB300]/30">
                <Database className="w-4 h-4 text-[#FFB300]" />
                <span className="text-sm text-[#FFB300]">Database</span>
              </div>
              <div className="w-8 h-px bg-white/20" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF2ECC]/10 border border-[#FF2ECC]/30">
                <Settings className="w-4 h-4 text-[#FF2ECC]" />
                <span className="text-sm text-[#FF2ECC]">ML</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="arch-caption text-center text-[#B8B2C6] max-w-xl mb-4">
          Monorepo architecture, shared packages, and production-ready conventions.
        </p>

        <button className="arch-caption text-[#00E676] hover:text-[#33EB85] font-medium flex items-center gap-2 transition-colors">
          View the blueprint
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
