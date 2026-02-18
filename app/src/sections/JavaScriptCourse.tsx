import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, BookOpen, Clock, AlertTriangle, Target,
    Play, Zap, Info, Monitor
} from 'lucide-react';
import { javaScriptContent } from '../data/courseContent';
import type { Lesson } from '../data/courseContent';
import LessonDialog from '../components/LessonDialog';

interface JavaScriptCourseProps { className?: string; }

const jsTopics = [
    {
        id: 'variables', name: 'Variables & Types', color: '#F7DF1E', items: [
            { name: 'let', desc: 'Variable modifiable, portée de bloc', example: 'let age = 25; age = 26;' },
            { name: 'const', desc: 'Constante, ne peut être réassignée', example: 'const PI = 3.14159;' },
            { name: 'string', desc: 'Chaîne de caractères', example: "const name = 'Alice'; const msg = `Hello ${name}`;" },
            { name: 'number', desc: 'Nombre entier ou décimal', example: 'const price = 19.99; const count = 42;' },
            { name: 'boolean', desc: 'Valeur vrai ou faux', example: 'const isActive = true; const isDone = false;' },
            { name: 'array', desc: 'Liste ordonnée de valeurs', example: "const fruits = ['pomme', 'banane', 'orange'];" },
            { name: 'object', desc: 'Collection de paires clé-valeur', example: "const user = { name: 'Alice', age: 25 };" },
        ]
    },
    {
        id: 'functions', name: 'Fonctions', color: '#2ED9FF', items: [
            { name: 'declaration', desc: 'Fonction nommée classique', example: 'function greet(name) { return `Hello ${name}`; }' },
            { name: 'arrow', desc: 'Syntaxe ES6 concise', example: 'const greet = (name) => `Hello ${name}`;' },
            { name: 'callback', desc: 'Fonction passée en argument', example: 'array.forEach(item => console.log(item));' },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Utiliser == au lieu de ===', solution: 'Toujours utiliser === pour la comparaison stricte (type + valeur)', tip: '"1" == 1 est true, "1" === 1 est false' },
    { mistake: 'Oublier le return dans les fonctions', solution: 'Arrow functions avec () retournent implicitement, sinon utiliser return', tip: 'const double = x => x * 2; // return implicite' },
    { mistake: 'Muter les arrays/objets directement', solution: 'Créer une copie avec spread : [...arr, newItem] ou {...obj, key: val}', tip: 'L\'immutabilité prévient les bugs subtils' },
];

const resources = {
    books: [
        { name: 'Eloquent JavaScript', author: 'Marijn Haverbeke', level: 'Tous niveaux', free: true },
        { name: 'You Don\'t Know JS', author: 'Kyle Simpson', level: 'Avancé', free: true },
    ],
    courses: [
        { name: 'freeCodeCamp - JS Algo', url: 'freecodecamp.org', free: true },
        { name: 'JavaScript.info', url: 'javascript.info', free: true },
    ],
};

export default function JavaScriptCourse({ className = '' }: JavaScriptCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('variables');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes' | 'resources' | 'projects'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.js-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const currentTopic = jsTopics.find(t => t.id === activeTopic);

    return (
        <section ref={sectionRef} id="javascript" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <LessonDialog
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                color={javaScriptContent[pathLevel]?.color || '#F7DF1E'}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[35vw] h-[35vw] bg-[#F7DF1E]/6 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/3 w-[30vw] h-[30vw] bg-[#FF2ECC]/6 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#F7DF1E] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#F7DF1E]">JavaScript</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Le langage de programmation du web. Variables, fonctions, DOM, asynchrone, ES6+ —
                        tout ce qu'il faut pour devenir un développeur JavaScript compétent.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#F7DF1E]" /> 20-30 semaines</span>
                        <span className="flex items-center gap-2"><Target className="w-4 h-4 text-[#00E676]" /> 6 projets pratiques</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#FF2ECC]" /> Essentiel Full-Stack</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {([
                        { id: 'syntax', label: 'Syntaxe & Concepts', icon: Code2 },
                        { id: 'path', label: 'Parcours', icon: BookOpen },
                        { id: 'mistakes', label: 'Erreurs Courantes', icon: AlertTriangle },
                        { id: 'resources', label: 'Ressources', icon: Monitor },
                    ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#F7DF1E] text-black' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Syntax Tab */}
                {activeTab === 'syntax' && (
                    <div className="js-card glass-card p-6 lg:p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {jsTopics.map(t => (
                                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: activeTopic === t.id ? t.color : undefined }}>
                                    {t.name}
                                </button>
                            ))}
                        </div>
                        {currentTopic && (
                            <div className="space-y-3">
                                {currentTopic.items.map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                        <code className="font-mono font-bold text-sm" style={{ color: currentTopic.color }}>{item.name}</code>
                                        <p className="text-sm text-[#B8B2C6] mb-2">{item.desc}</p>
                                        <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto">{item.example}</pre>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Learning Path Tab */}
                {activeTab === 'path' && (
                    <div className="js-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#F7DF1E]" /> 📚 Parcours d'Apprentissage Structuré
                        </h3>
                        <div className="flex gap-2 mb-6">
                            {javaScriptContent.map((lp, i) => (
                                <button key={i} onClick={() => setPathLevel(i)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>
                                    {lp.level}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-sm text-[#B8B2C6]">
                            <Clock className="w-4 h-4" style={{ color: javaScriptContent[pathLevel]?.color }} />
                            Durée estimée: <strong className="text-[#F4F2F7]">{javaScriptContent[pathLevel]?.duration}</strong>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {javaScriptContent[pathLevel]?.modules.map((mod, i) => (
                                <div key={i}
                                    className={`group flex flex-col sm:flex-row gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 ${mod.lesson ? 'cursor-pointer' : ''}`}
                                    onClick={() => mod.lesson && setSelectedLesson(mod.lesson)}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${javaScriptContent[pathLevel].color}20` }}>
                                        <span className="text-lg font-bold" style={{ color: javaScriptContent[pathLevel].color }}>{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-[#F4F2F7] text-lg group-hover:text-white transition-colors">{mod.title}</h4>
                                            <span className="text-xs text-[#B8B2C6] bg-white/5 px-2 py-1 rounded-md">{mod.duration}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {mod.topics.map((t, j) => (
                                                <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded border border-white/5">{t}</span>
                                            ))}
                                        </div>
                                        {mod.lesson && (
                                            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: javaScriptContent[pathLevel].color }}>
                                                <Info className="w-3.5 h-3.5" />
                                                Cliquez pour voir la leçon complète
                                            </div>
                                        )}
                                    </div>
                                    {mod.lesson && (
                                        <div className="hidden sm:flex items-center justify-center p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <Play className="w-4 h-4 text-black" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Common Mistakes Tab */}
                {activeTab === 'mistakes' && (
                    <div className="js-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-[#FF2ECC]" /> ⚠️ Erreurs Courantes
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

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                    <div className="js-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎓 Ressources d'Apprentissage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-bold text-[#F7DF1E] mb-3 uppercase">📖 Livres</h4>
                                {resources.books.map((b, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{b.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{b.author} — {b.level} {b.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#00E676] mb-3 uppercase">🖥️ Cours</h4>
                                {resources.courses.map((c, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{c.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{c.url} {c.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
