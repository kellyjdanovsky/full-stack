import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target,
    Play, FileCode, Layout, Palette, Monitor, Info
} from 'lucide-react';
import { htmlCssContent } from '../data/courseContent';
import type { Lesson } from '../data/courseContent';
import LessonDialog from '../components/LessonDialog';

interface HTMLCSSCourseProps {
    className?: string;
}

const htmlTags = [
    { tag: '<!DOCTYPE html>', desc: 'Déclaration du type de document HTML5', category: 'Structure' },
    { tag: '<html>', desc: 'Élément racine du document', category: 'Structure' },
    { tag: '<head>', desc: 'Métadonnées du document (titre, CSS, scripts)', category: 'Structure' },
    { tag: '<body>', desc: 'Contenu visible de la page', category: 'Structure' },
    { tag: '<h1>...<h6>', desc: 'Titres hiérarchiques (h1 = le plus important)', category: 'Texte' },
    { tag: '<p>', desc: 'Paragraphe de texte', category: 'Texte' },
    { tag: '<a href="">', desc: 'Lien hypertexte vers une autre page', category: 'Texte' },
    { tag: '<img src="" alt="">', desc: 'Image avec source et texte alternatif', category: 'Média' },
    { tag: '<div>', desc: 'Conteneur générique en bloc', category: 'Conteneurs' },
    { tag: '<span>', desc: 'Conteneur générique en ligne', category: 'Conteneurs' },
    { tag: '<ul> / <ol> / <li>', desc: 'Listes non ordonnées, ordonnées et éléments', category: 'Listes' },
    { tag: '<form>', desc: 'Formulaire interactif', category: 'Formulaires' },
    { tag: '<input>', desc: 'Champ de saisie (texte, email, password...)', category: 'Formulaires' },
    { tag: '<button>', desc: 'Bouton cliquable', category: 'Formulaires' },
    { tag: '<table> / <tr> / <td>', desc: 'Tableau de données', category: 'Tableaux' },
    { tag: '<header> / <nav> / <main> / <footer>', desc: 'Balises sémantiques de structure', category: 'Sémantique' },
    { tag: '<section> / <article> / <aside>', desc: 'Sections sémantiques de contenu', category: 'Sémantique' },
    { tag: '<video> / <audio>', desc: 'Éléments multimédias', category: 'Média' },
];

const cssProperties = [
    {
        group: 'Mise en page (Layout)', props: [
            { name: 'display', values: 'block | flex | grid | inline | none', desc: 'Type d\'affichage de l\'élément' },
            { name: 'position', values: 'static | relative | absolute | fixed | sticky', desc: 'Mode de positionnement' },
            { name: 'flex-direction', values: 'row | column | row-reverse', desc: 'Direction des éléments flex' },
            { name: 'justify-content', values: 'center | space-between | flex-start', desc: 'Alignement horizontal des enfants' },
            { name: 'align-items', values: 'center | stretch | flex-start | flex-end', desc: 'Alignement vertical des enfants' },
            { name: 'grid-template-columns', values: 'repeat(3, 1fr) | auto 1fr', desc: 'Définition des colonnes du grid' },
        ]
    },
    {
        group: 'Espacement', props: [
            { name: 'margin', values: '10px | 1rem | auto', desc: 'Marge extérieure' },
            { name: 'padding', values: '10px | 1rem 2rem', desc: 'Espacement intérieur' },
            { name: 'gap', values: '10px | 1rem', desc: 'Espace entre éléments flex/grid' },
        ]
    },
    {
        group: 'Typographie', props: [
            { name: 'font-size', values: '16px | 1rem | clamp(1rem, 2vw, 2rem)', desc: 'Taille du texte' },
            { name: 'font-weight', values: '400 | 700 | bold', desc: 'Épaisseur du texte' },
            { name: 'color', values: '#333 | rgb(0,0,0) | hsl(0,0%,20%)', desc: 'Couleur du texte' },
            { name: 'text-align', values: 'left | center | right | justify', desc: 'Alignement du texte' },
            { name: 'line-height', values: '1.5 | 1.6', desc: 'Hauteur de ligne' },
        ]
    },
    {
        group: 'Visuel', props: [
            { name: 'background', values: 'color | gradient | image', desc: 'Arrière-plan de l\'élément' },
            { name: 'border', values: '1px solid #ccc', desc: 'Bordure de l\'élément' },
            { name: 'border-radius', values: '8px | 50% | 1rem', desc: 'Arrondi des coins' },
            { name: 'box-shadow', values: '0 4px 6px rgba(0,0,0,0.1)', desc: 'Ombre portée' },
            { name: 'opacity', values: '0 à 1', desc: 'Transparence de l\'élément' },
            { name: 'transition', values: 'all 0.3s ease', desc: 'Animation de transition' },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Oublier le DOCTYPE ou la balise meta viewport', solution: 'Toujours commencer par le template HTML5 complet', icon: '⚠️' },
    { mistake: 'Utiliser des div partout au lieu de balises sémantiques', solution: 'Utiliser header, nav, main, section, article, footer', icon: '⚠️' },
    { mistake: 'Ne pas comprendre le Box Model', solution: 'Toujours utiliser box-sizing: border-box; sur tous les éléments', icon: '⚠️' },
    { mistake: 'Abuser des pixels (px) pour les tailles', solution: 'Utiliser rem pour les textes, % ou vw pour les largeurs', icon: '⚠️' },
    { mistake: 'Positionner avec position: absolute sans relative parent', solution: 'Un élément absolute se positionne par rapport au premier parent relative', icon: '⚠️' },
    { mistake: 'Ignorer l\'accessibilité (pas de alt sur les images)', solution: 'Toujours ajouter alt="" aux images, utiliser les labels des formulaires', icon: '⚠️' },
    { mistake: 'CSS trop spécifique avec des IDs partout', solution: 'Privilégier les classes CSS et le naming BEM pour la maintenabilité', icon: '⚠️' },
    { mistake: 'Ne pas tester le responsive sur mobile', solution: 'Concevoir en mobile-first, tester avec les DevTools du navigateur', icon: '⚠️' },
];

const resources = {
    books: [
        { name: 'HTML & CSS: Design and Build Websites', author: 'Jon Duckett', level: 'Débutant' },
        { name: 'CSS: The Definitive Guide', author: 'Eric Meyer', level: 'Intermédiaire' },
        { name: 'Every Layout', author: 'Andy Bell & Heydon Pickering', level: 'Avancé' },
    ],
    courses: [
        { name: 'freeCodeCamp - Responsive Web Design', url: 'freecodecamp.org', level: 'Débutant', free: true },
        { name: 'The Odin Project - Foundations', url: 'theodinproject.com', level: 'Débutant', free: true },
        { name: 'CSS for JavaScript Devs', url: 'css-for-js.dev', level: 'Intermédiaire', free: false },
        { name: 'Kevin Powell YouTube', url: 'youtube.com/@KevinPowell', level: 'Tous niveaux', free: true },
    ],
    docs: [
        { name: 'MDN Web Docs', url: 'developer.mozilla.org', desc: 'Référence complète HTML/CSS' },
        { name: 'CSS-Tricks', url: 'css-tricks.com', desc: 'Guides pratiques et Flexbox/Grid' },
        { name: 'Can I Use', url: 'caniuse.com', desc: 'Compatibilité navigateurs' },
        { name: 'W3C Validator', url: 'validator.w3.org', desc: 'Validation de votre HTML' },
    ],
    videos: [
        { name: 'Traversy Media - HTML/CSS Crash Course', duration: '2h', level: 'Débutant' },
        { name: 'Kevin Powell - CSS Grid Complete Guide', duration: '1h30', level: 'Intermédiaire' },
        { name: 'Fireship - 100 CSS Tips', duration: '12min', level: 'Tous niveaux' },
    ]
};

const suggestedProjects = [
    { name: 'Portfolio personnel', level: 'Débutant', duration: '1-2 semaines', desc: 'Créer votre site CV avec sections About, Skills, Contact', skills: ['HTML structure', 'Flexbox', 'Typography', 'Responsive'] },
    { name: 'Landing page produit', level: 'Débutant', duration: '1 semaine', desc: 'Page d\'accueil avec hero, features et CTA', skills: ['Layout', 'Images', 'Buttons', 'Media queries'] },
    { name: 'Dashboard admin', level: 'Intermédiaire', duration: '2-3 semaines', desc: 'Interface d\'administration avec sidebar, charts placeholders, tables', skills: ['CSS Grid', 'Variables CSS', 'Dark mode', 'Animations'] },
    { name: 'Clone d\'un site connu', level: 'Intermédiaire', duration: '2-3 semaines', desc: 'Reproduire la page d\'accueil de Spotify, Netflix ou Apple', skills: ['Grid avancé', 'Gradients', 'Hover effects', 'Responsive'] },
    { name: 'Design System complet', level: 'Avancé', duration: '3-4 semaines', desc: 'Bibliothèque de composants réutilisables (boutons, cards, modals...)', skills: ['BEM', 'Variables CSS', 'Custom properties', 'Documentation'] },
];

const vocabulary = [
    { term: 'DOM', definition: 'Document Object Model — représentation en arbre de la page HTML' },
    { term: 'Sélecteur CSS', definition: 'Motif qui cible les éléments HTML à styliser (.class, #id, element)' },
    { term: 'Box Model', definition: 'Modèle de boîte : content + padding + border + margin' },
    { term: 'Spécificité', definition: 'Priorité d\'un sélecteur CSS (inline > #id > .class > element)' },
    { term: 'Cascade', definition: 'Mécanisme qui détermine quelle règle CSS s\'applique en cas de conflit' },
    { term: 'Responsive', definition: 'Design qui s\'adapte à toutes les tailles d\'écran' },
    { term: 'Flexbox', definition: 'Modèle de layout 1D (ligne ou colonne) pour aligner des éléments' },
    { term: 'CSS Grid', definition: 'Modèle de layout 2D (lignes et colonnes) pour des mises en page complexes' },
];

const codeExamples = [
    {
        title: 'Structure HTML5 de base',
        code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav><!-- Navigation --></nav>
  </header>
  <main>
    <section><!-- Contenu principal --></section>
  </main>
  <footer><!-- Pied de page --></footer>
</body>
</html>`
    },
    {
        title: 'Flexbox — Centrer un élément',
        code: `.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  min-height: 100vh;
}

.card {
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}`
    },
];

export default function HTMLCSSCourse({ className = '' }: HTMLCSSCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeLevel, setActiveLevel] = useState(0);
    const [activeTab, setActiveTab] = useState<'tags' | 'css' | 'vocab' | 'code' | 'resources' | 'projects'>('tags');
    const [activeTagCategory, setActiveTagCategory] = useState('Structure');
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll('.html-card');
            cards.forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const tagCategories = [...new Set(htmlTags.map(t => t.category))];

    return (
        <section ref={sectionRef} id="htmlcss" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <LessonDialog
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
                color={htmlCssContent[activeLevel]?.color || '#FF6B35'}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] bg-[#FF6B35]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] bg-[#2ED9FF]/8 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#FF6B35] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#FF6B35]">HTML</span> & <span className="text-[#2ED9FF]">CSS</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Les fondations du web. Apprenez à structurer vos pages avec HTML et à les styliser avec CSS.
                        Chaque balise, propriété et concept expliqué clairement.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#FF6B35]" /> 12-20 semaines</span>
                        <span className="flex items-center gap-2"><Target className="w-4 h-4 text-[#00E676]" /> 6 projets pratiques</span>
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#2ED9FF]" /> 3 niveaux</span>
                    </div>
                </div>

                {/* Main Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {([
                        { id: 'tags', label: 'Balises HTML', icon: FileCode },
                        { id: 'css', label: 'Propriétés CSS', icon: Palette },
                        { id: 'vocab', label: 'Vocabulaire', icon: BookOpen },
                        { id: 'code', label: 'Exemples de Code', icon: Code2 },
                        { id: 'resources', label: 'Ressources', icon: Monitor },
                        { id: 'projects', label: 'Projets', icon: Target },
                    ] as const).map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#FF6B35] text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* HTML Tags Tab */}
                {activeTab === 'tags' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <FileCode className="w-5 h-5 text-[#FF6B35]" /> Référence des Balises HTML
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tagCategories.map(cat => (
                                <button key={cat} onClick={() => setActiveTagCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTagCategory === cat ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`}>{cat}</button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {htmlTags.filter(t => t.category === activeTagCategory).map((tag, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                    <code className="text-sm font-mono text-[#FF6B35]">{tag.tag}</code>
                                    <p className="text-sm text-[#B8B2C6] mt-1">{tag.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CSS Properties Tab */}
                {activeTab === 'css' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-[#2ED9FF]" /> Propriétés CSS Essentielles
                        </h3>
                        <div className="space-y-8">
                            {cssProperties.map((group) => (
                                <div key={group.group}>
                                    <h4 className="font-medium text-[#2ED9FF] mb-4 text-lg">{group.group}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {group.props.map((prop, i) => (
                                            <div key={i} className="p-3 bg-white/5 rounded-lg">
                                                <div className="flex items-center justify-between mb-1">
                                                    <code className="text-sm font-mono text-[#00E676]">{prop.name}</code>
                                                </div>
                                                <p className="text-xs text-[#B8B2C6]/70 font-mono mb-1">{prop.values}</p>
                                                <p className="text-sm text-[#B8B2C6]">{prop.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Vocabulary Tab */}
                {activeTab === 'vocab' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#FFB300]" /> Vocabulaire HTML/CSS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vocabulary.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                    <h4 className="font-bold text-[#FFB300] text-sm">{item.term}</h4>
                                    <p className="text-sm text-[#B8B2C6] mt-1">{item.definition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Code Examples Tab */}
                {activeTab === 'code' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-[#00E676]" /> Exemples de Code
                        </h3>
                        <div className="space-y-6">
                            {codeExamples.map((ex, i) => (
                                <div key={i} className="p-4 bg-black/40 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Play className="w-4 h-4 text-[#00E676]" />
                                        <h4 className="font-medium text-[#F4F2F7]">{ex.title}</h4>
                                    </div>
                                    <pre className="text-sm text-[#B8B2C6] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                        {ex.code}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-[#7B2D8E]" /> 🎓 Ressources d'Apprentissage
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-bold text-[#FF6B35] mb-3 uppercase tracking-wider">📖 Livres</h4>
                                {resources.books.map((b, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{b.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{b.author} — {b.level}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#00E676] mb-3 uppercase tracking-wider">🎥 Vidéos</h4>
                                {resources.videos.map((v, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{v.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{v.duration} — {v.level}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#2ED9FF] mb-3 uppercase tracking-wider">🖥️ Cours en ligne</h4>
                                {resources.courses.map((c, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{c.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{c.url} — {c.level} {c.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#FFB300] mb-3 uppercase tracking-wider">📚 Documentation</h4>
                                {resources.docs.map((d, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{d.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{d.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div className="html-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-[#FF2ECC]" /> 🎯 Projets Suggérés pour Pratiquer
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestedProjects.map((p, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/8 transition-colors border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.level === 'Débutant' ? 'bg-[#00E676]/20 text-[#00E676]' :
                                            p.level === 'Intermédiaire' ? 'bg-[#FFB300]/20 text-[#FFB300]' :
                                                'bg-[#FF2ECC]/20 text-[#FF2ECC]'
                                            }`}>{p.level}</span>
                                        <span className="text-xs text-[#B8B2C6] flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                                    </div>
                                    <h4 className="font-bold text-[#F4F2F7] mb-1">{p.name}</h4>
                                    <p className="text-sm text-[#B8B2C6] mb-3">{p.desc}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.skills.map((s, j) => (
                                            <span key={j} className="px-2 py-0.5 text-xs bg-white/10 text-[#B8B2C6] rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Learning Path by Level */}
                <div className="html-card glass-card p-6 lg:p-8 mb-8">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Layout className="w-5 h-5 text-[#2ED9FF]" /> 📚 Parcours d'Apprentissage Structuré
                    </h3>
                    <div className="flex gap-2 mb-6">
                        {htmlCssContent.map((lm, i) => (
                            <button key={i} onClick={() => setActiveLevel(i)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                    }`} style={{ backgroundColor: activeLevel === i ? lm.color : undefined }}>
                                {lm.level}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm text-[#B8B2C6]">
                        <Clock className="w-4 h-4" style={{ color: htmlCssContent[activeLevel]?.color }} />
                        Durée estimée : <strong className="text-[#F4F2F7]">{htmlCssContent[activeLevel]?.duration}</strong>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {htmlCssContent[activeLevel]?.modules.map((mod, i) => (
                            <div key={i}
                                className={`group flex flex-col sm:flex-row gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 hover:border-white/10 ${mod.lesson ? 'cursor-pointer' : ''}`}
                                onClick={() => mod.lesson && setSelectedLesson(mod.lesson)}
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${htmlCssContent[activeLevel].color}20` }}>
                                    <span className="text-lg font-bold" style={{ color: htmlCssContent[activeLevel].color }}>{i + 1}</span>
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
                                        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: htmlCssContent[activeLevel].color }}>
                                            <Info className="w-3.5 h-3.5" />
                                            Cliquez pour voir la leçon complète
                                        </div>
                                    )}
                                </div>
                                {mod.lesson && (
                                    <div className="hidden sm:flex items-center justify-center p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <Play className="w-4 h-4" style={{ color: htmlCssContent[activeLevel].color }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Common Mistakes */}
                <div className="html-card glass-card-sm p-6 mb-8">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#FF2ECC]" /> ⚠️ Erreurs Courantes et Comment les Éviter
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {commonMistakes.map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                                    <div>
                                        <p className="font-medium text-[#F4F2F7] text-sm">{item.mistake}</p>
                                        <p className="text-sm text-[#B8B2C6] mt-1">
                                            <span className="text-[#00E676]">✓ Solution :</span> {item.solution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="html-card glass-card-sm p-6">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils Pratiques & Best Practices
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { tip: 'Toujours valider votre HTML', detail: 'Utilisez le W3C Validator pour détecter les erreurs de structure' },
                            { tip: 'Mobile-first pour le CSS', detail: 'Commencez par le style mobile, puis ajoutez des media queries pour les grands écrans' },
                            { tip: 'Utiliser box-sizing: border-box', detail: 'Ajoutez *, *::before, *::after { box-sizing: border-box; } en début de CSS' },
                            { tip: 'Organiser votre CSS logiquement', detail: 'Structure : Reset → Variables → Base → Components → Utilities' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                <p className="font-medium text-[#FFB300] text-sm mb-1">💡 {item.tip}</p>
                                <p className="text-xs text-[#B8B2C6]">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
