import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, Target, CheckCircle2, Code2, Lightbulb } from 'lucide-react';
import type { Lesson } from '../data/courseContent';

interface LessonDialogProps {
    lesson: Lesson | null;
    onClose: () => void;
    color: string;
}

export default function LessonDialog({ lesson, onClose, color }: LessonDialogProps) {
    if (!lesson) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#0F0A15] border border-white/10 rounded-2xl shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                                <BookOpen className="w-5 h-5" style={{ color }} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#F4F2F7]">{lesson.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#B8B2C6]"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[#F4F2F7] font-semibold">
                                <Target className="w-5 h-5" style={{ color }} />
                                <h3>Objectifs & Concepts</h3>
                            </div>
                            <div className="text-[#B8B2C6] leading-relaxed whitespace-pre-wrap">
                                {lesson.content}
                            </div>
                        </div>

                        {lesson.codeExample && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#F4F2F7] font-semibold">
                                    <Code2 className="w-5 h-5 text-[#00E676]" />
                                    <h3>Exemple de Code Pratique</h3>
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00E676]/20 to-transparent rounded-lg blur opacity-50" />
                                    <pre className="relative p-4 bg-black/60 rounded-lg border border-white/10 font-mono text-sm text-[#B8B2C6] overflow-x-auto">
                                        <code>{lesson.codeExample}</code>
                                    </pre>
                                </div>
                            </div>
                        )}

                        {lesson.tips && lesson.tips.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#F4F2F7] font-semibold">
                                    <Lightbulb className="w-5 h-5 text-[#FFB300]" />
                                    <h3>Conseils d'Expert</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {lesson.tips.map((tip, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#00E676] flex-shrink-0" />
                                            <p className="text-sm text-[#B8B2C6] italic">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-white/5 border-t border-white/5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg font-medium text-white transition-all hover:scale-105 active:scale-95"
                            style={{ backgroundColor: color }}
                        >
                            J'ai compris !
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
