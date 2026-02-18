import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BookOpen, Clock, Info, Globe
} from 'lucide-react';

interface OtherLanguagesCourseProps { className?: string; }

export default function OtherLanguagesCourse({ className = '' }: OtherLanguagesCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.other-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const courses = [
        { name: 'Rust', level: 'Système', color: '#DEA584', duration: '12 sem', topics: ['Ownership', 'Borrowing', 'Lifetimes'] },
        { name: 'PHP / Laravel', level: 'Web Backend', color: '#777BB4', duration: '10 sem', topics: ['Eloquent', 'Routing', 'Blade'] },
        { name: 'Java / Kotlin', level: 'Enterprise / Android', color: '#B07219', duration: '15 sem', topics: ['JVM', 'Spring', 'Coroutines'] },
        { name: 'C# / .NET', level: 'Enterprise / Game', color: '#68217A', duration: '12 sem', topics: ['LINQ', 'Unity', 'ASP.NET Core'] },
        { name: 'Solidity', level: 'Web3 / Blockchain', color: '#363636', duration: '8 sem', topics: ['EVM', 'Gas', 'Smart Contracts'] },
        { name: 'Swift / Dart', level: 'Mobile Native', color: '#F05138', duration: '10 sem', topics: ['SwiftUI', 'Flutter', 'Hot Reload'] }
    ];

    return (
        <section ref={sectionRef} id="other-course" className={`relative w-full bg-[#07040A] py-12 ${className}`}>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="other-card glass-card p-6 lg:p-8 mb-8">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[#FF2ECC]" /> 📚 Programmes d'Apprentissage Spécialisés
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courses.map((c, i) => (
                            <div key={i} className="group p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${c.color}20` }}>
                                        <BookOpen className="w-5 h-5" style={{ color: c.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="font-bold text-[#F4F2F7] text-lg">{c.name}</h4>
                                            <span className="text-[10px] uppercase tracking-wider text-[#B8B2C6] border border-white/10 px-2 py-0.5 rounded">{c.level}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mb-3 text-xs text-[#B8B2C6]">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</span>
                                            <span className="flex items-center gap-1 text-[#00E676]"><Info className="w-3 h-3" /> Programme complet bientôt disponible</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {c.topics.map((t, j) => (
                                                <span key={j} className="text-[10px] bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded uppercase tracking-tight">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
