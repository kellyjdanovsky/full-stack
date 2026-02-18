import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, ChevronRight, ChevronUp, Menu, X, BookOpen } from 'lucide-react';
import type { ReactNode, LucideIcon } from 'react';

export interface SectionData {
    id: string;
    title: string;
    icon?: LucideIcon;
    content: ReactNode;
}

interface PageLayoutProps {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    accentColor?: string;
    tag: string;
    sections: SectionData[];
    prevPage?: { title: string; path: string };
    nextPage?: { title: string; path: string };
}

export default function PageLayout({
    title,
    subtitle,
    icon: Icon,
    color,
    tag,
    sections,
    prevPage,
    nextPage,
}: PageLayoutProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Animate content on load
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.page-header',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo(
                '.section-content',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.3, stagger: 0.1 }
            );
        }, contentRef);
        return () => ctx.revert();
    }, []);

    // Track scroll position for active section and scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);

            const sectionElements = sections.map((s) => document.getElementById(s.id));
            const scrollPos = window.scrollY + 200;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsSidebarOpen(false);
    };

    return (
        <div ref={contentRef} className="min-h-screen bg-[#07040A]">
            {/* ===== FIXED TOP BAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07040A]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-[#B8B2C6] hover:text-[#F4F2F7] transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Accueil</span>
                        </Link>
                        <ChevronRight className="w-3 h-3 text-[#4A4460]" />
                        <span className="text-sm font-medium text-[#F4F2F7] truncate max-w-[200px] sm:max-w-none flex items-center gap-2">
                            <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                            {title}
                        </span>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="xl:hidden w-8 h-8 flex items-center justify-center text-[#B8B2C6] hover:text-white transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            <div className="flex pt-14">
                {/* ===== SIDEBAR ===== */}
                <aside
                    className={`fixed xl:sticky top-14 left-0 h-[calc(100vh-56px)] w-72 bg-[#0A070D]/95 xl:bg-transparent backdrop-blur-xl xl:backdrop-blur-none border-r border-white/5 overflow-y-auto z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
                        }`}
                >
                    <div className="p-4 space-y-1">
                        <div className="px-3 py-3 mb-3">
                            <div className="text-[10px] mono uppercase tracking-wider text-[#6A647A] mb-1">{tag}</div>
                            <div className="text-sm font-semibold text-[#F4F2F7]">{title}</div>
                        </div>

                        {sections.map((section) => {
                            const SIcon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center gap-2.5 ${activeSection === section.id
                                            ? 'bg-white/[0.08] text-[#F4F2F7] font-medium'
                                            : 'text-[#8A849A] hover:text-[#B8B2C6] hover:bg-white/[0.03]'
                                        }`}
                                >
                                    {SIcon && (
                                        <SIcon
                                            className="w-3.5 h-3.5 shrink-0"
                                            style={{ color: activeSection === section.id ? color : undefined }}
                                        />
                                    )}
                                    <span className="truncate">{section.title}</span>
                                    {activeSection === section.id && (
                                        <div className="w-1.5 h-1.5 rounded-full ml-auto shrink-0" style={{ backgroundColor: color }} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* ===== OVERLAY ===== */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/50 xl:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* ===== MAIN CONTENT ===== */}
                <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 max-w-4xl">
                    {/* Page Header */}
                    <div className="page-header mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
                            >
                                <Icon className="w-8 h-8" style={{ color }} />
                            </div>
                            <div>
                                <span className="text-[10px] font-medium uppercase tracking-widest mono" style={{ color }}>
                                    {tag}
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-bold text-[#F4F2F7]">{title}</h1>
                            </div>
                        </div>
                        <p className="text-[#B8B2C6] text-base leading-relaxed max-w-2xl">{subtitle}</p>
                        <div className="mt-6 w-full h-px bg-gradient-to-r from-transparent" style={{
                            backgroundImage: `linear-gradient(to right, transparent, ${color}40, transparent)`
                        }} />
                    </div>

                    {/* Sections */}
                    {sections.map((section) => (
                        <div key={section.id} id={section.id} className="section-content mb-16 scroll-mt-20">
                            {section.content}
                        </div>
                    ))}

                    {/* Navigation Footer */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-12 border-t border-white/5">
                        {prevPage && (
                            <Link
                                to={prevPage.path}
                                className="flex-1 group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
                            >
                                <ArrowLeft className="w-4 h-4 text-[#B8B2C6] group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <div className="text-[10px] text-[#6A647A] mono">Précédent</div>
                                    <div className="text-sm font-medium text-[#F4F2F7]">{prevPage.title}</div>
                                </div>
                            </Link>
                        )}
                        {nextPage && (
                            <Link
                                to={nextPage.path}
                                className="flex-1 group flex items-center justify-end gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
                            >
                                <div className="text-right">
                                    <div className="text-[10px] text-[#6A647A] mono">Suivant</div>
                                    <div className="text-sm font-medium text-[#F4F2F7]">{nextPage.title}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#B8B2C6] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>
                </main>
            </div>

            {/* ===== SCROLL TO TOP ===== */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#7B2D8E] hover:bg-[#9B3DB2] text-white flex items-center justify-center shadow-lg shadow-[#7B2D8E]/30 transition-all hover:scale-110"
                >
                    <ChevronUp className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}

// ===== REUSABLE CONTENT COMPONENTS =====

export function SectionHeading({
    title,
    subtitle,
    color,
    id,
}: {
    title: string;
    subtitle?: string;
    color: string;
    id?: string;
}) {
    return (
        <div className="mb-8" id={id}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F2F7] mb-2">{title}</h2>
            {subtitle && <p className="text-[#B8B2C6] text-sm leading-relaxed">{subtitle}</p>}
            <div className="mt-4 w-16 h-1 rounded-full" style={{ backgroundColor: `${color}60` }} />
        </div>
    );
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#F4F2F7] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#7B2D8E]" />
                {title}
            </h3>
            <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-3">{children}</div>
        </div>
    );
}

export function ConceptBlock({
    title,
    color,
    children,
}: {
    title: string;
    color: string;
    children: ReactNode;
}) {
    return (
        <div className="mb-6 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div
                className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2"
                style={{ borderLeftWidth: 3, borderLeftColor: color }}
            >
                <h4 className="text-sm font-semibold text-[#F4F2F7]">{title}</h4>
            </div>
            <div className="px-5 py-4 text-[#B8B2C6] text-sm leading-[1.8] space-y-2">{children}</div>
        </div>
    );
}

export function KeyPoint({ term, children }: { term: string; children: ReactNode }) {
    return (
        <div className="flex gap-3 py-1">
            <code className="text-[#2ED9FF] text-xs mono font-medium shrink-0 mt-0.5 bg-[#2ED9FF]/10 px-2 py-0.5 rounded">
                {term}
            </code>
            <span className="text-[#B8B2C6] text-sm leading-relaxed">{children}</span>
        </div>
    );
}

export function InfoCard({
    title,
    items,
    color,
}: {
    title: string;
    items: string[];
    color: string;
}) {
    return (
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 mb-4">
            <h4 className="text-sm font-semibold mb-3" style={{ color }}>{title}</h4>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-[#B8B2C6] text-xs leading-relaxed">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
