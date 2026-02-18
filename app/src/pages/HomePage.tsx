import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import {
    ArrowRight,
    Code2,
    Database,
    Terminal,
    Server,
    Cpu,
    Layers,
    BookOpen,
    Sparkles,
    FolderTree,
    Zap,
    Globe,
    Palette,
    Shield,
    Smartphone,
    BarChart3,
    Boxes,
    Braces,
    GitBranch,
} from 'lucide-react';

// 3D Floating Prism for Hero
function FloatingPrism() {
    const meshRef = useRef<THREE.Mesh>(null);
    const edgesRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
        if (edgesRef.current) {
            edgesRef.current.rotation.copy(meshRef.current?.rotation || new THREE.Euler());
            edgesRef.current.position.copy(meshRef.current?.position || new THREE.Vector3());
        }
    });

    return (
        <group>
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
            <lineSegments ref={edgesRef}>
                <edgesGeometry args={[new THREE.OctahedronGeometry(2.55, 0)]} />
                <lineBasicMaterial color="#2ED9FF" linewidth={2} />
            </lineSegments>
            <mesh>
                <octahedronGeometry args={[1.2, 0]} />
                <meshBasicMaterial color="#2ED9FF" transparent opacity={0.3} wireframe />
            </mesh>
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.cos((i / 8) * Math.PI * 2) * 4,
                        Math.sin((i / 8) * Math.PI * 2) * 0.5,
                        Math.sin((i / 8) * Math.PI * 2) * 4,
                    ]}
                >
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshBasicMaterial color="#FF2ECC" />
                </mesh>
            ))}
        </group>
    );
}

function HeroScene() {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2ED9FF" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF2ECC" />
            <pointLight position={[0, 5, -5]} intensity={0.8} color="#7B2D8E" />
            <FloatingPrism />
            <Environment preset="city" />
        </>
    );
}

// Language cards data
const essentialLanguages = [
    {
        rank: '01',
        icon: Globe,
        title: 'HTML & CSS',
        description: "Les fondations du web. Structure sémantique et design moderne. Flexbox, Grid, Animations.",
        color: '#E34F26',
        accentColor: '#264DE4',
        gradient: 'from-[#E34F26]/20 to-[#264DE4]/20',
        borderColor: 'border-[#E34F26]/30',
        glowColor: 'shadow-[#E34F26]/20',
        path: '/html-css',
        sections: ['Sémantique HTML5', 'CSS Grid & Flexbox', 'Responsive Design', 'Animations', 'Accessibilité'],
        tag: '⭐ FONDATION',
    },
    {
        rank: '02',
        icon: Braces,
        title: 'JavaScript / TypeScript',
        description:
            "Le langage universel du web. Des navigateurs aux serveurs. TypeScript ajoute la puissance du typage statique.",
        color: '#FFD600',
        accentColor: '#3178C6',
        gradient: 'from-[#FFD600]/20 to-[#3178C6]/20',
        borderColor: 'border-[#FFD600]/30',
        glowColor: 'shadow-[#FFD600]/20',
        path: '/javascript',
        sections: ['Fondations JS', 'Closures', 'Async/Await', 'DOM', 'ES6+', 'TypeScript', 'Event Loop'],
        tag: '⭐ ESSENTIEL',
    },
    {
        rank: '03',
        icon: Code2,
        title: 'Python',
        description:
            "Le couteau suisse. IA/ML, data science, web, automatisation. Syntaxe élégante et lisible.",
        color: '#3776AB',
        accentColor: '#FFD43B',
        gradient: 'from-[#3776AB]/20 to-[#FFD43B]/20',
        borderColor: 'border-[#3776AB]/30',
        glowColor: 'shadow-[#3776AB]/20',
        path: '/python',
        sections: ['Types & Fonctions', 'OOP', 'Décorateurs', 'Générateurs', 'Async', 'IA/ML Libraries'],
        tag: '⭐ ESSENTIEL',
    },
    {
        rank: '04',
        icon: Layers,
        title: 'React',
        description:
            "La bibliothèque UI de référence. Composants, Hooks, Virtual DOM. L'art de créer des interfaces interactives.",
        color: '#61DAFB',
        accentColor: '#20232A',
        gradient: 'from-[#61DAFB]/20 to-[#20232A]/20',
        borderColor: 'border-[#61DAFB]/30',
        glowColor: 'shadow-[#61DAFB]/20',
        path: '/react',
        sections: ['Components', 'Hooks (useState, useEffect)', 'Context', 'State Management', 'Patterns'],
        tag: '⭐ FRONTEND',
    },
    {
        rank: '05',
        icon: Server,
        title: 'Node.js',
        description:
            "JavaScript côté serveur. Runtime asynchrone orienté événements pour des backends scalables.",
        color: '#339933',
        accentColor: '#FFFFFF',
        gradient: 'from-[#339933]/20 to-[#FFFFFF]/10',
        borderColor: 'border-[#339933]/30',
        glowColor: 'shadow-[#339933]/20',
        path: '/node',
        sections: ['Event Loop', 'Modules', 'Express / NestJS', 'API REST', 'Streams', 'File System'],
        tag: '⭐ BACKEND',
    },
    {
        rank: '06',
        icon: Database,
        title: 'SQL',
        description:
            "Le langage des données. PostgreSQL, MySQL — les bases de données relationnelles sont le cœur du stockage.",
        color: '#336791',
        accentColor: '#FF6B35',
        gradient: 'from-[#336791]/20 to-[#FF6B35]/20',
        borderColor: 'border-[#336791]/30',
        glowColor: 'shadow-[#336791]/20',
        path: '/sql',
        sections: ['Modèle Relationnel', 'SELECT & JOINs', 'Window Functions', 'Index', 'Transactions', 'ACID'],
        tag: '⭐ DATA',
    },
    {
        rank: '07',
        icon: GitBranch,
        title: 'Git',
        description:
            "Le système de contrôle de version. Indispensable pour collaborer et gérer l'historique du code.",
        color: '#F05032',
        accentColor: '#F05032',
        gradient: 'from-[#F05032]/20 to-[#F05032]/10',
        borderColor: 'border-[#F05032]/30',
        glowColor: 'shadow-[#F05032]/20',
        path: '/git',
        sections: ['Commit & Push', 'Branches & Merge', 'Rebase', 'Pull Requests', 'Workflows'],
        tag: '⭐ OUTILS',
    },
    {
        rank: '08',
        icon: Terminal,
        title: 'Bash / Shell',
        description:
            "Automatisation, scripting, navigation terminal. La maîtrise de Linux commence ici.",
        color: '#4EAA25',
        accentColor: '#FFFFFF',
        gradient: 'from-[#4EAA25]/20 to-white/5',
        borderColor: 'border-[#4EAA25]/30',
        glowColor: 'shadow-[#4EAA25]/20',
        path: '/bash',
        sections: ['Fichiers', 'Pipes', 'Scripting', 'Permissions', 'SSH', 'Process'],
        tag: '⭐ SYSTEM',
    },
    {
        rank: '09',
        icon: Cpu,
        title: 'Go (Golang)',
        description:
            "Performance et simplicité. Concurrence native (Goroutines). L'avenir de l'infrastructure cloud.",
        color: '#00ADD8',
        accentColor: '#FFFFFF',
        gradient: 'from-[#00ADD8]/20 to-white/5',
        borderColor: 'border-[#00ADD8]/30',
        glowColor: 'shadow-[#00ADD8]/20',
        path: '/go',
        sections: ['Structs', 'Interfaces', 'Goroutines', 'Channels', 'Microservices'],
        tag: '⭐ PERFORMANCE',
    },
];

const otherLanguages = [
    {
        icon: Shield,
        title: 'Rust',
        description: 'Sécurité mémoire sans garbage collector. Ownership, borrowing, lifetimes.',
        color: '#DEA584',
        path: '/other-languages#rust',
        tag: 'Systèmes',
    },
    {
        icon: Cpu,
        title: 'Java / Kotlin',
        description: 'JVM, OOP, Spring Boot. Kotlin modernise Java avec null safety et coroutines.',
        color: '#B07219',
        path: '/other-languages#java',
        tag: 'Enterprise',
    },
    {
        icon: Layers,
        title: 'C#',
        description: 'LINQ, async/await, Unity. ASP.NET Core et l\'écosystème .NET.',
        color: '#68217A',
        path: '/other-languages#csharp',
        tag: 'Microsoft',
    },
    {
        icon: Globe,
        title: 'PHP / Laravel',
        description: 'Eloquent ORM, Blade, Queues. Le web backend classique modernisé.',
        color: '#777BB4',
        path: '/other-languages#php',
        tag: 'Web',
    },
    {
        icon: Palette,
        title: 'GLSL / Shaders',
        description: 'Programmation GPU. Vertex & fragment shaders, raymarching, SDF.',
        color: '#FF2ECC',
        path: '/other-languages#glsl',
        tag: '3D / GPU',
    },
    {
        icon: Smartphone,
        title: 'Swift',
        description: 'iOS/macOS natif. Optionals, protocols, SwiftUI, concurrency.',
        color: '#F05138',
        path: '/other-languages#swift',
        tag: 'Mobile',
    },
    {
        icon: Smartphone,
        title: 'Dart / Flutter',
        description: 'UI multiplateforme. Widgets, state management, hot reload.',
        color: '#0175C2',
        path: '/other-languages#dart',
        tag: 'Cross-Platform',
    },
    {
        icon: Boxes,
        title: 'Scala',
        description: 'Fonctionnel + OOP. Apache Spark, Akka, case classes.',
        color: '#DC322F',
        path: '/other-languages#scala',
        tag: 'Big Data',
    },
    {
        icon: BarChart3,
        title: 'R',
        description: 'Statistiques et data viz. ggplot2, dplyr, tidyverse.',
        color: '#276DC3',
        path: '/other-languages#r',
        tag: 'Data Science',
    },
    {
        icon: Zap,
        title: 'Julia',
        description: 'Performance C, syntaxe Python. JIT compilation, multiple dispatch.',
        color: '#9558B2',
        path: '/other-languages#julia',
        tag: 'Science',
    },
    {
        icon: Sparkles,
        title: 'Solidity',
        description: 'Smart contracts Ethereum. Sécurité blockchain, modifiers, events.',
        color: '#363636',
        path: '/other-languages#solidity',
        tag: 'Web3',
    },
];

const projectStructureCard = {
    icon: FolderTree,
    title: 'Architecture & Structure de Projet',
    description:
        "Dossiers, fichiers et logiques d'implémentation complètes. Front-end, back-end, IA/ML, infrastructure, tests.",
    color: '#2ED9FF',
    path: '/project-structure',
};

export default function HomePage() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });
            tl.fromTo('.hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
                .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3')
                .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
                .fromTo('.hero-stats', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.4');

            // Stagger cards
            gsap.fromTo(
                '.lang-card',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1, delay: 1 }
            );
            gsap.fromTo(
                '.other-lang-card',
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05, delay: 1.5 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} className="min-h-screen bg-[#07040A]">
            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#2ED9FF]/8 rounded-full blur-[150px]" />
                    <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-[#7B2D8E]/12 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#FF2ECC]/8 rounded-full blur-[100px]" />
                </div>

                {/* 3D Canvas */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 lg:opacity-60">
                    <div className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]">
                        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                            <HeroScene />
                        </Canvas>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 pt-24 pb-16 max-w-5xl mx-auto">
                    <div className="hero-tag mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B2D8E]/20 border border-[#7B2D8E]/30 text-[#2ED9FF] text-xs tracking-[0.2em] uppercase font-medium mono">
                            <BookOpen className="w-3.5 h-3.5" />
                            Guide Complet d'Apprentissage
                        </span>
                    </div>

                    <h1 className="hero-title mb-6">
                        <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4F2F7] leading-[1.05]">
                            Maîtrisez tous les
                        </span>
                        <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mt-2 text-gradient-animated">
                            langages de programmation
                        </span>
                    </h1>

                    <p className="hero-subtitle text-[#B8B2C6] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10">
                        Détails complets sur quoi étudier, dans quel ordre, et pourquoi.
                        <br className="hidden sm:block" />
                        Des fondations aux concepts avancés, chaque langage décortiqué en profondeur.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
                        {[
                            { value: '16+', label: 'Langages' },
                            { value: '100+', label: 'Concepts' },
                            { value: '50+', label: 'Sections' },
                            { value: '∞', label: 'Profondeur' },
                        ].map((stat) => (
                            <div key={stat.label} className="hero-stats text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-[#F4F2F7]">{stat.value}</div>
                                <div className="text-xs text-[#B8B2C6] mt-1 mono uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Scroll */}
                    <a
                        href="#essential"
                        className="hero-stats inline-flex items-center gap-2 px-8 py-4 bg-[#7B2D8E] hover:bg-[#9B3DB2] text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#7B2D8E]/40 btn-shine"
                    >
                        Explorer les langages
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07040A] to-transparent pointer-events-none" />
            </section>

            {/* ===== 5 LANGAGES ESSENTIELS ===== */}
            <section id="essential" className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/20 text-[#FFD600] text-xs tracking-[0.15em] uppercase font-medium mono mb-6">
                            <Sparkles className="w-3.5 h-3.5" />
                            Foundation
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F2F7] mb-4">
                            Les 5 Langages{' '}
                            <span className="text-gradient-cyan">Essentiels</span>
                        </h2>
                        <p className="text-[#B8B2C6] text-base sm:text-lg max-w-2xl mx-auto">
                            Maîtrisez profondément ces langages en priorité. Ils couvrent
                            front-end, back-end, données, systèmes et automatisation.
                        </p>
                    </div>

                    {/* Essential Language Cards */}
                    <div className="space-y-6">
                        {essentialLanguages.map((lang) => {
                            const Icon = lang.icon;
                            return (
                                <Link
                                    to={lang.path}
                                    key={lang.title}
                                    className={`lang-card group block relative overflow-hidden rounded-[24px] bg-gradient-to-r ${lang.gradient} border ${lang.borderColor} p-6 sm:p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${lang.glowColor}`}
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        {/* Left: Icon + Rank */}
                                        <div className="flex items-center gap-4 lg:w-[300px] shrink-0">
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                                style={{ backgroundColor: `${lang.color}20`, border: `1px solid ${lang.color}40` }}
                                            >
                                                <Icon className="w-7 h-7" style={{ color: lang.color }} />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-medium uppercase tracking-widest mono" style={{ color: lang.color }}>
                                                    {lang.tag}
                                                </span>
                                                <h3 className="text-xl font-bold text-[#F4F2F7] group-hover:text-white transition-colors">
                                                    {lang.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Center: Description */}
                                        <div className="flex-1">
                                            <p className="text-[#B8B2C6] text-sm leading-relaxed">{lang.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {lang.sections.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-[#B8B2C6] mono border border-white/5"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Arrow */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                                                <ArrowRight className="w-4 h-4 text-[#B8B2C6] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rank number in background */}
                                    <div className="absolute top-4 right-6 text-6xl sm:text-8xl font-bold opacity-[0.04] select-none pointer-events-none">
                                        {lang.rank}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== AUTRES LANGAGES ===== */}
            <section className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF2ECC]/10 border border-[#FF2ECC]/20 text-[#FF2ECC] text-xs tracking-[0.15em] uppercase font-medium mono mb-6">
                            <Layers className="w-3.5 h-3.5" />
                            Exploration
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F2F7] mb-4">
                            Les Autres{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF2ECC] to-[#7B2D8E]">
                                Langages
                            </span>
                        </h2>
                        <p className="text-[#B8B2C6] text-base sm:text-lg max-w-2xl mx-auto">
                            Explorez selon vos projets et vos curiosités. Chaque langage est
                            un outil avec ses forces et ses contextes.
                        </p>
                    </div>

                    {/* Other Language Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherLanguages.map((lang) => {
                            const Icon = lang.icon;
                            return (
                                <Link
                                    to={lang.path}
                                    key={lang.title}
                                    className="other-lang-card group relative overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/[0.06] p-5 transition-all duration-400 hover:bg-white/[0.06] hover:border-white/[0.12] hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${lang.color}15`, border: `1px solid ${lang.color}25` }}
                                        >
                                            <Icon className="w-5 h-5" style={{ color: lang.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-sm font-semibold text-[#F4F2F7] group-hover:text-white truncate">
                                                    {lang.title}
                                                </h3>
                                                <span
                                                    className="px-2 py-0.5 rounded-md text-[9px] font-medium mono shrink-0"
                                                    style={{ backgroundColor: `${lang.color}15`, color: lang.color }}
                                                >
                                                    {lang.tag}
                                                </span>
                                            </div>
                                            <p className="text-[#8A849A] text-xs leading-relaxed">{lang.description}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="absolute top-5 right-5 w-3.5 h-3.5 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== ARCHITECTURE & STRUCTURE ===== */}
            <section className="relative py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link
                        to={projectStructureCard.path}
                        className="lang-card group block relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2ED9FF]/10 via-[#7B2D8E]/10 to-[#FF2ECC]/10 border border-[#2ED9FF]/20 p-8 sm:p-12 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#2ED9FF]/10"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-3xl bg-[#2ED9FF]/10 border border-[#2ED9FF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FolderTree className="w-10 h-10 text-[#2ED9FF]" />
                            </div>
                            <span className="text-[10px] font-medium uppercase tracking-widest mono text-[#2ED9FF] mb-2">
                                📁 Architecture Complète
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F2F7] mb-3 group-hover:text-white transition-colors">
                                {projectStructureCard.title}
                            </h3>
                            <p className="text-[#B8B2C6] text-sm sm:text-base max-w-xl leading-relaxed mb-6">
                                {projectStructureCard.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['Front-End', 'Back-End', 'IA/ML', 'Infrastructure', 'Docker', 'Kubernetes', 'Tests'].map((t) => (
                                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-[11px] text-[#B8B2C6] mono border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-[#2ED9FF] text-sm font-medium group-hover:gap-3 transition-all">
                                Voir la structure complète
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ===== COMPARAISON FOOTER ===== */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F2F7] mb-4">
                            Tableaux <span className="text-gradient-cyan">Récapitulatifs</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Paradigmes */}
                        <div className="glass-card-sm p-6">
                            <h3 className="text-sm font-semibold text-[#2ED9FF] mb-4 mono uppercase tracking-wider">Paradigmes</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Impératif', desc: 'Comment faire', langs: 'JS, Python, Go' },
                                    { name: 'Déclaratif', desc: 'Quoi vouloir', langs: 'SQL, HTML, React' },
                                    { name: 'Fonctionnel', desc: 'Fonctions pures', langs: 'Haskell, Scala, Elixir' },
                                    { name: 'Orienté Objet', desc: 'Encapsulation', langs: 'Java, C#, Python' },
                                    { name: 'Réactif', desc: 'Flux de données', langs: 'RxJS, Reactor' },
                                ].map((p) => (
                                    <div key={p.name} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2ED9FF] mt-2 shrink-0" />
                                        <div>
                                            <span className="text-xs font-medium text-[#F4F2F7]">{p.name}</span>
                                            <span className="text-[10px] text-[#8A849A] ml-2">— {p.desc}</span>
                                            <div className="text-[10px] text-[#6A647A] mono">{p.langs}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vitesse */}
                        <div className="glass-card-sm p-6">
                            <h3 className="text-sm font-semibold text-[#FF2ECC] mb-4 mono uppercase tracking-wider">Vitesse d'Exécution</h3>
                            <div className="space-y-3">
                                {[
                                    { tier: 'Ultra-rapide', color: '#00E676', langs: 'C, C++, Rust' },
                                    { tier: 'Très rapide', color: '#2ED9FF', langs: 'Go, Java, C#, Swift' },
                                    { tier: 'Rapide', color: '#FFD600', langs: 'Julia, Dart' },
                                    { tier: 'Modéré', color: '#FFB300', langs: 'JavaScript, TypeScript' },
                                    { tier: 'Plus lent', color: '#FF6B35', langs: 'Python, Ruby, PHP' },
                                ].map((t) => (
                                    <div key={t.tier} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                                        <div>
                                            <span className="text-xs font-medium text-[#F4F2F7]">{t.tier}</span>
                                            <span className="text-[10px] text-[#6A647A] mono ml-2">{t.langs}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Courbe d'apprentissage */}
                        <div className="glass-card-sm p-6">
                            <h3 className="text-sm font-semibold text-[#FFB300] mb-4 mono uppercase tracking-wider">Courbe d'Apprentissage</h3>
                            <div className="space-y-3">
                                {[
                                    { level: 'Douce', color: '#00E676', langs: 'Python, JS, PHP, SQL' },
                                    { level: 'Modérée', color: '#2ED9FF', langs: 'TypeScript, Go, Kotlin' },
                                    { level: 'Raide', color: '#FFB300', langs: 'Rust, C++, Scala' },
                                    { level: 'Très raide', color: '#FF6B35', langs: 'C, Assembly, GLSL' },
                                ].map((l) => (
                                    <div key={l.level} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                                        <div>
                                            <span className="text-xs font-medium text-[#F4F2F7]">{l.level}</span>
                                            <span className="text-[10px] text-[#6A647A] mono ml-2">{l.langs}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xs text-[#6A647A] mono">
                        Chaque langage est un outil avec ses forces et ses contextes d'application.
                        <br />
                        Maîtrisez profondément les 5 essentiels, puis explorez les autres selon vos projets.
                    </p>
                    <p className="text-[10px] text-[#4A4460] mt-4 mono">
                        La profondeur vaut mieux que la largeur.
                    </p>
                </div>
            </footer>
        </div>
    );
}
