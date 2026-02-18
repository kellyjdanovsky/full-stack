import { useEffect, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  className?: string;
}

// 3D Prism Component
function CodePrism({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Ambient rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      
      // Scroll-driven rotation
      const scrollRot = scrollProgress.current * Math.PI * 0.5;
      meshRef.current.rotation.y += scrollRot;
      
      // Scale based on scroll
      const scale = 1 - scrollProgress.current * 0.18;
      meshRef.current.scale.setScalar(scale);
    }
    
    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current?.rotation || new THREE.Euler());
      edgesRef.current.scale.copy(meshRef.current?.scale || new THREE.Vector3(1, 1, 1));
    }
  });

  return (
    <group>
      {/* Main prism */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2.5, 0]} />
        <meshPhysicalMaterial
          color="#7B2D8E"
          metalness={0.9}
          roughness={0.1}
          transmission={0.3}
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#2ED9FF"
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Wireframe edges */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new THREE.OctahedronGeometry(2.55, 0)]} />
        <lineBasicMaterial color="#2ED9FF" linewidth={2} />
      </lineSegments>
      
      {/* Inner core */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial
          color="#2ED9FF"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Orbiting particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 4,
            Math.sin((i / 6) * Math.PI * 2) * 0.5,
            Math.sin((i / 6) * Math.PI * 2) * 4
          ]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FF2ECC" />
        </mesh>
      ))}
    </group>
  );
}

// Scene component
function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#2ED9FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF2ECC" />
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#7B2D8E" />
      <CodePrism scrollProgress={scrollProgress} />
      <Environment preset="city" />
    </>
  );
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo('.hero-tag', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo('.hero-headline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-subheadline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set('.hero-tag, .hero-headline, .hero-subheadline, .hero-cta', {
              opacity: 1, y: 0, x: 0
            });
          }
        }
      });

      // Store the trigger for cleanup
      const trigger = scrollTl.scrollTrigger;
      if (trigger) {
        localTriggersRef.current.push(trigger);
      }

      // ENTRANCE (0-30%): Hold - elements already visible from load animation
      
      // SETTLE (30-70%): Subtle ambient motion handled by useFrame
      
      // EXIT (70-100%): Elements exit
      scrollTl.fromTo('.hero-content',
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
      
      scrollTl.fromTo(canvasContainerRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-18vw', scale: 0.82, opacity: 0, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => {
      localTriggersRef.current.forEach(st => st.kill());
      localTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#2ED9FF]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-[#7B2D8E]/15 rounded-full blur-[120px]" />
      </div>

      {/* 3D Canvas */}
      <div 
        ref={canvasContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: '8vh' }}
      >
        <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Scene scrollProgress={scrollProgress} />
          </Canvas>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="hero-content relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Tag */}
        <div className="hero-tag mb-6">
          <span className="mono text-xs tracking-[0.2em] text-[#2ED9FF] uppercase">
            Full-Stack Academy
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline text-center max-w-4xl mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#F4F2F7] leading-[0.95]">
            Learn to build
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gradient-cyan leading-[0.95] mt-2">
            the future.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subheadline text-center max-w-xl text-[#B8B2C6] text-base sm:text-lg mb-10 px-4">
          A complete, hands-on curriculum: front-end, back-end, AI/ML, and real-time 3D.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => scrollToSection('#contact')}
            className="hero-cta group px-8 py-4 bg-[#7B2D8E] hover:bg-[#9B3DB2] text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#7B2D8E]/40 flex items-center gap-2"
          >
            Start learning
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => scrollToSection('#roadmap')}
            className="hero-cta group px-8 py-4 bg-white/5 hover:bg-white/10 text-[#F4F2F7] font-medium rounded-full border border-white/10 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Explore the path
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07040A] to-transparent pointer-events-none" />
    </section>
  );
}
