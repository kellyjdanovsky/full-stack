import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, BookOpen, Clock, Target, Play, Zap, Info
} from 'lucide-react';
import { gitTsContent } from '../data/courseContent';
import type { Lesson } from '../data/courseContent';
import LessonDialog from '../components/LessonDialog';

interface GitTypeScriptCourseProps { className?: string; }

export default function GitTypeScriptCourse({ className = '' }: GitTypeScriptCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [pathLevel, setPathLevel] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.git-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    return (
        <section ref={sectionRef} id="gitts" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <LessonDialog
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                color={gitTsContent[pathLevel]?.color || '#3178C6'}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 w-[35vw] h-[35vw] bg-[#3178C6]/6 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/2 w-[30vw] h-[30vw] bg-[#F05032]/4 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#3178C6] uppercase mb-4 block">🛠️ Outils & Typage</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#F05032]">Git</span> & <span className="text-[#3178C6]">TypeScript</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Travaillez en équipe et sécurisez votre code. Versioning avec Git et typage statique
                        avec TypeScript pour des applications robustes et maintenables.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#3178C6]" /> 6-10 semaines</span>
                        <span className="flex items-center gap-2"><Target className="w-4 h-4 text-[#00E676]" /> 2 projets Tools</span>
                        <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#FFB300]" /> Industry Standard</span>
                    </div>
                </div>

                <div className="git-card glass-card p-6 lg:p-8 mb-8">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#3178C6]" /> 📚 Parcours TypeScript & Git
                    </h3>
                    <div className="flex gap-2 mb-6">
                        {gitTsContent.map((lp, i) => (
                            <button key={i} onClick={() => setPathLevel(i)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                    }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>
                                {lp.level}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {gitTsContent[pathLevel]?.modules.map((mod, i) => (
                            <div key={i}
                                className={`group flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 ${mod.lesson ? 'cursor-pointer' : ''}`}
                                onClick={() => mod.lesson && setSelectedLesson(mod.lesson)}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${gitTsContent[pathLevel].color}20` }}>
                                    <span className="text-lg font-bold" style={{ color: gitTsContent[pathLevel].color }}>{i + 1}</span>
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
                                        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: gitTsContent[pathLevel].color }}>
                                            <Info className="w-3.5 h-3.5" />
                                            Cliquez pour voir la leçon complète
                                        </div>
                                    )}
                                </div>
                                {mod.lesson && (
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Play className="w-4 h-4" style={{ color: gitTsContent[pathLevel].color }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
