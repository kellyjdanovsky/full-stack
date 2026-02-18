import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target,
    Play, Zap, Monitor, Info
} from 'lucide-react';
import { pythonContent } from '../data/courseContent';
import type { Lesson } from '../data/courseContent';
import LessonDialog from '../components/LessonDialog';

interface PythonCourseProps { className?: string; }

const pythonTopics = [
    {
        id: 'basics', name: 'Bases & Syntaxe', color: '#3776AB', items: [
            { name: 'Variables', desc: 'Typage dynamique, pas de déclaration nécessaire', example: 'x = 5\nname = "Python"' },
            { name: 'Listes', desc: 'Séquences ordonnées et modifiables', example: 'fruits = ["pomme", "banane"]' },
            { name: 'Dictionnaires', desc: 'Paires clé-valeur (objets JSON)', example: 'user = {"name": "Alice", "age": 25}' },
        ]
    },
    {
        id: 'control', name: 'Flux de Contrôle', color: '#FFD43B', items: [
            { name: 'if/elif/else', desc: 'Logique conditionnelle par indentation', example: 'if x > 10:\n    print("Grand")' },
            { name: 'for', desc: 'Itération sur des collections', example: 'for item in list:\n    print(item)' },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Oublier l\'indentation', solution: 'Python utilise l\'indentation (4 espaces) pour définir les blocs, pas les { }', tip: 'Une erreur d\'indentation empêchera le script de tourner' },
    { mistake: 'Mélanger types dans opérations', solution: 'Utiliser str(), int(), float() pour convertir si nécessaire', tip: 'print("Age: " + 25) causera une erreur, utiliser str(25)' },
    { mistake: 'Modifier une liste en itérant dessus', solution: 'Itérer sur une copie ou utiliser une compréhension de liste', tip: 'for x in my_list[:]: # crée une copie' },
];

export default function PythonCourse({ className = '' }: PythonCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('basics');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.py-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const currentTopic = pythonTopics.find(t => t.id === activeTopic);

    return (
        <section ref={sectionRef} id="python" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <LessonDialog
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                color={pythonContent[pathLevel]?.color || '#3776AB'}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] bg-[#3776AB]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#FFD43B]/8 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#3776AB] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#3776AB]">Python</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Le langage de la Data Science, de l'IA et de l'automatisation. Apprenez une syntaxe claire
                        et puissante pour réaliser vos projets les plus ambitieux.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#3776AB]" /> 15-25 semaines</span>
                        <span className="flex items-center gap-2"><Target className="w-4 h-4 text-[#00E676]" /> 5 projets pratiques</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#FFD43B]" /> Automatisation & Data</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {([
                        { id: 'syntax', label: 'Syntaxe & Concepts', icon: Code2 },
                        { id: 'path', label: 'Parcours', icon: BookOpen },
                        { id: 'mistakes', label: 'Erreurs Courantes', icon: AlertTriangle },
                    ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#3776AB] text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'syntax' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {pythonTopics.map(t => (
                                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: activeTopic === t.id ? t.color : undefined }}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                        {currentTopic && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentTopic.items.map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <h4 className="font-bold text-[#F4F2F7] mb-1">{item.name}</h4>
                                        <p className="text-sm text-[#B8B2C6] mb-3">{item.desc}</p>
                                        <div className="relative">
                                            <div className="absolute top-2 right-2 flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                                                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                                                <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                                            </div>
                                            <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-4 rounded overflow-x-auto pt-8">
                                                {item.example}
                                            </pre>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'path' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">📚 Parcours d'Apprentissage Python</h3>
                        <div className="flex gap-2 mb-6">
                            {pythonContent.map((lp, i) => (
                                <button key={i} onClick={() => setPathLevel(i)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>
                                    {lp.level}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-[#B8B2C6] mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4" style={{ color: pythonContent[pathLevel]?.color }} />
                            Durée estimée: <strong className="text-[#F4F2F7]">{pythonContent[pathLevel]?.duration}</strong>
                        </p>
                        <div className="space-y-4">
                            {pythonContent[pathLevel]?.modules.map((mod, i) => (
                                <div key={i}
                                    className={`group flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 ${mod.lesson ? 'cursor-pointer' : ''}`}
                                    onClick={() => mod.lesson && setSelectedLesson(mod.lesson)}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${pythonContent[pathLevel].color}20` }}>
                                        <span className="text-lg font-bold" style={{ color: pythonContent[pathLevel].color }}>{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-[#F4F2F7] text-lg">{mod.title}</h4>
                                            <span className="text-xs text-[#B8B2C6]">{mod.duration}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {mod.topics.map((t, j) => (
                                                <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded border border-white/5">{t}</span>
                                            ))}
                                        </div>
                                        {mod.lesson && (
                                            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: pythonContent[pathLevel].color }}>
                                                <Info className="w-3.5 h-3.5" />
                                                Cliquez pour voir la leçon complète
                                            </div>
                                        )}
                                    </div>
                                    {mod.lesson && (
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <Play className="w-4 h-4" style={{ color: pythonContent[pathLevel].color }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'mistakes' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#FFB300]" /> ⚠️ Pièges à Éviter
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {commonMistakes.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                    <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                                    <p className="text-xs text-[#B8B2C6]/60 mt-2 italic">💡 {item.tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
