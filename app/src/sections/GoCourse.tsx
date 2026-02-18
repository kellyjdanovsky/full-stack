import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Clock, Play, Info, Box
} from 'lucide-react';
import { goContent } from '../data/courseContent';
import type { Lesson } from '../data/courseContent';
import LessonDialog from '../components/LessonDialog';

interface GoCourseProps { className?: string; }

export default function GoCourse({ className = '' }: GoCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [pathLevel, setPathLevel] = useState(0);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.go-card').forEach((card) => {
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
        <section ref={sectionRef} id="go-course" className={`relative w-full bg-[#07040A] py-12 ${className}`}>
            <LessonDialog
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                color={goContent[pathLevel]?.color || '#00ADD8'}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="go-card glass-card p-6 lg:p-8 mb-8">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Box className="w-5 h-5 text-[#00ADD8]" /> 📚 Parcours d'Apprentissage Go
                    </h3>
                    <div className="flex gap-2 mb-6">
                        {goContent.map((lp, i) => (
                            <button key={i} onClick={() => setPathLevel(i)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                    }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>
                                {lp.level}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm text-[#B8B2C6]">
                        <Clock className="w-4 h-4" style={{ color: goContent[pathLevel]?.color }} />
                        Durée estimée: <strong className="text-[#F4F2F7]">{goContent[pathLevel]?.duration}</strong>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {goContent[pathLevel]?.modules.map((mod, i) => (
                            <div key={i}
                                className={`group flex flex-col sm:flex-row gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 ${mod.lesson ? 'cursor-pointer' : ''}`}
                                onClick={() => mod.lesson && setSelectedLesson(mod.lesson)}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${goContent[pathLevel].color}20` }}>
                                    <span className="text-lg font-bold" style={{ color: goContent[pathLevel].color }}>{i + 1}</span>
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
                                        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: goContent[pathLevel].color }}>
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
            </div>
        </section>
    );
}
