import { useRef, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Brain, Sparkles, Network, Database, ArrowRight } from 'lucide-react';

interface AIMLTunnelProps {
  className?: string;
}

// Tunnel rings component
function TunnelRings({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringsCount = 12;
  
  const rings = useMemo(() => {
    return Array.from({ length: ringsCount }, (_, i) => ({
      id: i,
      z: -i * 3,
      scale: 1 + i * 0.15,
      color: new THREE.Color().setHSL(0.8 + i * 0.02, 0.8, 0.5),
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Forward movement based on scroll
      const scrollOffset = scrollProgress.current * 15;
      groupRef.current.position.z = scrollOffset;
      
      // Subtle rotation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring) => (
        <mesh key={ring.id} position={[0, 0, ring.z]}>
          <torusGeometry args={[ring.scale * 3, 0.05, 16, 100]} />
          <meshBasicMaterial 
            color={ring.color} 
            transparent 
            opacity={0.6 - ring.id * 0.04}
          />
        </mesh>
      ))}
      
      {/* Center particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            -Math.random() * 30
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FF2ECC" />
        </mesh>
      ))}
    </group>
  );
}

// 3D Scene
function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#FF2ECC" />
      <pointLight position={[5, 5, 0]} intensity={0.5} color="#7B2D8E" />
      <TunnelRings scrollProgress={scrollProgress} />
    </>
  );
}

const aiFeatures = [
  { name: 'LLMs', icon: Brain, description: 'Large Language Models' },
  { name: 'Embeddings', icon: Network, description: 'Vector representations' },
  { name: 'RAG', icon: Database, description: 'Retrieval Augmented Generation' },
  { name: 'MLOps', icon: Sparkles, description: 'ML Operations' },
];

export default function AIMLTunnel({ className = '' }: AIMLTunnelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          }
        }
      });

      const trigger = scrollTl.scrollTrigger;
      if (trigger) {
        localTriggersRef.current.push(trigger);
      }

      // ENTRANCE (0-30%)
      scrollTl.fromTo(canvasContainerRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(card,
        { z: -600, rotateX: 25, opacity: 0 },
        { z: 0, rotateX: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.aiml-headline',
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo('.aiml-caption',
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Tunnel moves forward

      // EXIT (70-100%)
      scrollTl.fromTo(canvasContainerRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.25, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(card,
        { scale: 1, opacity: 1 },
        { scale: 0.9, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo('.aiml-headline, .aiml-caption',
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
      id="aiml"
      className={`relative w-full h-screen bg-[#07040A] overflow-hidden ${className}`}
    >
      {/* 3D Tunnel Canvas */}
      <div 
        ref={canvasContainerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <h2 className="aiml-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] text-center mb-8">
          Add{' '}
          <span className="text-[#FF2ECC]">intelligence.</span>
        </h2>

        {/* Center Card */}
        <div
          ref={cardRef}
          className="glass-card p-6 sm:p-8 max-w-lg w-full mx-auto perspective-1000"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-[#FF2ECC]/20 flex items-center justify-center">
              <Brain className="w-7 h-7 text-[#FF2ECC]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#F4F2F7]">AI / ML</h3>
              <p className="text-sm text-[#B8B2C6]">Machine Learning & Intelligence</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {aiFeatures.map((feature) => (
              <div 
                key={feature.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-[#FF2ECC]" />
                <div>
                  <span className="text-sm font-medium text-[#F4F2F7] block">{feature.name}</span>
                  <span className="text-xs text-[#B8B2C6]">{feature.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <p className="aiml-caption text-center text-[#B8B2C6] max-w-xl mt-8 mb-4">
          Integrate models, build pipelines, and ship features that learn.
        </p>

        <button className="aiml-caption group px-8 py-4 bg-[#FF2ECC]/20 hover:bg-[#FF2ECC]/30 text-[#FF2ECC] font-medium rounded-full border border-[#FF2ECC]/30 transition-all hover:scale-105 flex items-center gap-2">
          Explore AI/ML path
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
