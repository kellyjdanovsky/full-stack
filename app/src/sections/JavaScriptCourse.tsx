import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target,
    Play, Zap, Box, GitBranch, Monitor, Terminal
} from 'lucide-react';

interface JavaScriptCourseProps { className?: string; }

const jsTopics = [
    {
        id: 'variables', name: 'Variables & Types', color: '#F7DF1E', items: [
            { name: 'let', desc: 'Variable modifiable, portée de bloc', example: 'let age = 25; age = 26;' },
            { name: 'const', desc: 'Constante, ne peut être réassignée', example: 'const PI = 3.14159;' },
            { name: 'var', desc: '⚠️ Ancienne syntaxe, portée de fonction (éviter)', example: 'var x = 10; // legacy' },
            { name: 'string', desc: 'Chaîne de caractères', example: "const name = 'Alice'; const msg = `Hello ${name}`;" },
            { name: 'number', desc: 'Nombre entier ou décimal', example: 'const price = 19.99; const count = 42;' },
            { name: 'boolean', desc: 'Valeur vrai ou faux', example: 'const isActive = true; const isDone = false;' },
            { name: 'array', desc: 'Liste ordonnée de valeurs', example: "const fruits = ['pomme', 'banane', 'orange'];" },
            { name: 'object', desc: 'Collection de paires clé-valeur', example: "const user = { name: 'Alice', age: 25 };" },
            { name: 'null / undefined', desc: 'Absence de valeur intentionnelle / non définie', example: 'let x = null; let y; // undefined' },
        ]
    },
    {
        id: 'functions', name: 'Fonctions', color: '#2ED9FF', items: [
            { name: 'function declaration', desc: 'Fonction nommée classique (hoistée)', example: 'function greet(name) { return `Hello ${name}`; }' },
            { name: 'arrow function', desc: 'Syntaxe ES6 concise', example: 'const greet = (name) => `Hello ${name}`;' },
            { name: 'paramètres par défaut', desc: 'Valeur par défaut si non fourni', example: "function greet(name = 'World') { ... }" },
            { name: 'rest parameters', desc: 'Capturer un nombre indéfini d\'arguments', example: 'function sum(...nums) { return nums.reduce((a,b) => a+b, 0); }' },
            { name: 'destructuring params', desc: 'Extraire des propriétés directement', example: 'function display({ name, age }) { ... }' },
            { name: 'callback', desc: 'Fonction passée en argument d\'une autre', example: 'array.forEach(item => console.log(item));' },
            { name: 'closure', desc: 'Fonction qui capture son environnement', example: 'function counter() { let n=0; return () => ++n; }' },
            { name: 'IIFE', desc: 'Fonction immédiatement invoquée', example: '(() => { console.log("Exécuté!"); })();' },
        ]
    },
    {
        id: 'dom', name: 'DOM & Événements', color: '#00E676', items: [
            { name: 'querySelector', desc: 'Sélectionner un élément du DOM', example: "const btn = document.querySelector('.btn');" },
            { name: 'querySelectorAll', desc: 'Sélectionner tous les éléments correspondants', example: "const items = document.querySelectorAll('.item');" },
            { name: 'addEventListener', desc: 'Écouter un événement sur un élément', example: "btn.addEventListener('click', () => { ... });" },
            { name: 'textContent / innerHTML', desc: 'Modifier le contenu texte ou HTML', example: "el.textContent = 'Nouveau texte';" },
            { name: 'classList', desc: 'Ajouter/retirer des classes CSS', example: "el.classList.add('active'); el.classList.toggle('visible');" },
            { name: 'createElement', desc: 'Créer un nouvel élément dynamiquement', example: "const div = document.createElement('div');" },
            { name: 'style', desc: 'Modifier le style inline', example: "el.style.backgroundColor = '#333';" },
            { name: 'event.preventDefault', desc: 'Empêcher le comportement par défaut', example: "form.addEventListener('submit', e => { e.preventDefault(); });" },
        ]
    },
    {
        id: 'es6', name: 'ES6+ Moderne', color: '#FF2ECC', items: [
            { name: 'template literals', desc: 'Chaînes avec backticks et interpolation', example: "const msg = `Bonjour ${name}, vous avez ${age} ans`;" },
            { name: 'destructuring', desc: 'Extraire des valeurs d\'objets/arrays', example: 'const { name, age } = user; const [first, ...rest] = arr;' },
            { name: 'spread operator', desc: 'Étaler un array/objet', example: 'const newArr = [...arr, 4, 5]; const newObj = {...obj, key: val};' },
            { name: 'map / filter / reduce', desc: 'Méthodes fonctionnelles sur les arrays', example: 'arr.map(x => x*2).filter(x => x>5).reduce((a,b) => a+b, 0);' },
            { name: 'optional chaining', desc: 'Accès sécurisé à des propriétés imbriquées', example: 'const city = user?.address?.city;' },
            { name: 'nullish coalescing', desc: 'Valeur par défaut pour null/undefined', example: "const name = user.name ?? 'Anonyme';" },
            { name: 'Promises', desc: 'Gestion de code asynchrone', example: "fetch('/api').then(res => res.json()).then(data => {...});" },
            { name: 'async/await', desc: 'Syntaxe simplifiée pour les Promises', example: "const data = await fetch('/api'); const json = await data.json();" },
            { name: 'modules', desc: 'Import/Export ES6', example: "import { useState } from 'react'; export default MyComponent;" },
        ]
    },
];

const learningPath = [
    {
        level: 'Débutant', color: '#00E676', duration: '6-8 semaines', modules: [
            { title: 'Variables, Types & Opérateurs', duration: '1 semaine', topics: ['let/const/var', 'Types primitifs', 'Opérateurs arithmétiques', 'Comparaison (=== vs ==)'] },
            { title: 'Conditions & Boucles', duration: '1 semaine', topics: ['if/else/switch', 'for/while/do-while', 'for...of / for...in', 'Ternaire (? :)'] },
            { title: 'Fonctions', duration: '1-2 semaines', topics: ['function déclaration/expression', 'Arrow functions', 'Return values', 'Scope & closures'] },
            { title: 'Arrays & Objects', duration: '1-2 semaines', topics: ['push/pop/splice', 'map/filter/reduce', 'Objet notation', 'JSON parse/stringify'] },
            { title: 'DOM Manipulation', duration: '1-2 semaines', topics: ['Sélection d\'éléments', 'Événements click/submit', 'Modifier le contenu', 'Créer/supprimer éléments'] },
        ]
    },
    {
        level: 'Intermédiaire', color: '#FFB300', duration: '6-10 semaines', modules: [
            { title: 'ES6+ Avancé', duration: '2 semaines', topics: ['Destructuring', 'Spread/Rest', 'Template literals', 'Symbols & Iterators'] },
            { title: 'Asynchrone', duration: '2-3 semaines', topics: ['Callbacks', 'Promises', 'async/await', 'Error handling try/catch'] },
            { title: 'Fetch API & HTTP', duration: '2 semaines', topics: ['GET/POST/PUT/DELETE', 'Headers & Body', 'JSON handling', 'CORS'] },
            { title: 'Classes & OOP', duration: '1-2 semaines', topics: ['class syntax', 'Constructor', 'Héritage (extends)', 'Encapsulation'] },
            { title: 'Modules & Build Tools', duration: '1 semaine', topics: ['import/export', 'NPM packages', 'Vite/Webpack basique', 'package.json'] },
        ]
    },
    {
        level: 'Avancé', color: '#FF2ECC', duration: '8-12 semaines', modules: [
            { title: 'Design Patterns', duration: '2-3 semaines', topics: ['Observer', 'Factory', 'Singleton', 'Module pattern'] },
            { title: 'Testing', duration: '2 semaines', topics: ['Jest/Vitest', 'Unit vs Integration', 'Mocking', 'TDD'] },
            { title: 'Performance', duration: '2 semaines', topics: ['Event loop', 'Web Workers', 'Memory management', 'Profiling'] },
            { title: 'TypeScript', duration: '2-3 semaines', topics: ['Types & Interfaces', 'Generics', 'Type guards', 'Utility types'] },
            { title: 'Méta-programmation', duration: '1-2 semaines', topics: ['Proxy & Reflect', 'WeakMap/WeakSet', 'Generators', 'Decorators'] },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Utiliser == au lieu de ===', solution: 'Toujours utiliser === pour la comparaison stricte (type + valeur)', tip: '"1" == 1 est true, "1" === 1 est false' },
    { mistake: 'Oublier le return dans les fonctions', solution: 'Arrow functions avec () retournent implicitement, sinon utiliser return', tip: 'const double = x => x * 2; // return implicite' },
    { mistake: 'Muter les arrays/objets directement', solution: 'Créer une copie avec spread : [...arr, newItem] ou {...obj, key: val}', tip: 'L\'immutabilité prévient les bugs subtils' },
    { mistake: 'Callback hell (imbrication de callbacks)', solution: 'Utiliser async/await pour un code lisible et linéaire', tip: 'Les Promises avec .then() sont aussi une option' },
    { mistake: 'Ne pas gérer les erreurs async', solution: 'Toujours entourer await avec try/catch', tip: 'Les erreurs non gérées crashent silencieusement' },
    { mistake: 'Confondre référence et valeur', solution: 'Les objets/arrays sont passés par référence, les primitives par valeur', tip: 'const arr2 = [...arr1] crée une copie superficielle' },
    { mistake: 'this qui change de contexte', solution: 'Utiliser les arrow functions pour garder le this du parent', tip: 'Les arrow functions n\'ont pas leur propre this' },
    { mistake: 'Boucles infinies sans condition de sortie', solution: 'Toujours vérifier que la condition de boucle évolue', tip: 'Utiliser des breakpoints dans les DevTools pour débugger' },
];

const resources = {
    books: [
        { name: 'Eloquent JavaScript', author: 'Marijn Haverbeke', level: 'Débutant → Inter.', free: true },
        { name: 'JavaScript: The Good Parts', author: 'Douglas Crockford', level: 'Intermédiaire', free: false },
        { name: 'You Don\'t Know JS (série)', author: 'Kyle Simpson', level: 'Avancé', free: true },
    ],
    courses: [
        { name: 'freeCodeCamp - JavaScript Algo & DS', url: 'freecodecamp.org', free: true },
        { name: 'JavaScript.info', url: 'javascript.info', free: true },
        { name: 'Scrimba - Learn JavaScript', url: 'scrimba.com', free: true },
        { name: 'Wes Bos - JavaScript30', url: 'javascript30.com', free: true },
    ],
    docs: [
        { name: 'MDN JavaScript Guide', url: 'developer.mozilla.org' },
        { name: 'DevDocs.io', url: 'devdocs.io' },
        { name: 'ECMAScript Spec', url: 'tc39.es' },
    ],
    videos: [
        { name: 'Fireship - JS in 100 Seconds', duration: '2min' },
        { name: 'Traversy Media - JS Crash Course', duration: '1h40' },
        { name: 'Net Ninja - Modern JS Tutorial', duration: 'Série 40 vidéos' },
    ],
};

const projects = [
    { name: 'Calculatrice interactive', level: 'Débutant', duration: '3-5 jours', desc: 'Calculatrice avec opérations basiques et historique', skills: ['DOM', 'Events', 'Functions', 'Conditions'] },
    { name: 'To-Do List avancée', level: 'Débutant', duration: '1 semaine', desc: 'Ajouter, supprimer, filtrer, localStorage', skills: ['DOM', 'Array methods', 'localStorage', 'Events'] },
    { name: 'Application météo', level: 'Intermédiaire', duration: '1-2 semaines', desc: 'Fetch API météo, géolocalisation, affichage dynamique', skills: ['Fetch API', 'async/await', 'JSON', 'DOM dynamique'] },
    { name: 'Quiz interactif', level: 'Intermédiaire', duration: '1-2 semaines', desc: 'Questions, score, timer, catégories', skills: ['OOP', 'Timer', 'State management', 'DOM avancé'] },
    { name: 'Jeu Snake / Tetris', level: 'Avancé', duration: '2-3 semaines', desc: 'Jeu avec canvas, collision, score, niveaux', skills: ['Canvas API', 'Game loop', 'Collision detection', 'OOP'] },
    { name: 'Mini-framework réactif', level: 'Avancé', duration: '3-4 semaines', desc: 'Créer un mini React avec Virtual DOM', skills: ['Proxy', 'DOM diffing', 'Components', 'State'] },
];

export default function JavaScriptCourse({ className = '' }: JavaScriptCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('variables');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes' | 'resources' | 'projects'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
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
                        { id: 'projects', label: 'Projets', icon: Target },
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
                                        <div className="flex items-center gap-3 mb-2">
                                            <code className="font-mono font-bold text-sm" style={{ color: currentTopic.color }}>{item.name}</code>
                                        </div>
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
                            {learningPath.map((lp, i) => (
                                <button key={i} onClick={() => setPathLevel(i)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>
                                    {lp.level}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-sm text-[#B8B2C6]">
                            <Clock className="w-4 h-4" style={{ color: learningPath[pathLevel].color }} />
                            Durée estimée: <strong className="text-[#F4F2F7]">{learningPath[pathLevel].duration}</strong>
                        </div>
                        <div className="space-y-4">
                            {learningPath[pathLevel].modules.map((mod, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${learningPath[pathLevel].color}20` }}>
                                        <span className="text-sm font-bold" style={{ color: learningPath[pathLevel].color }}>{i + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-[#F4F2F7]">{mod.title}</h4>
                                            <span className="text-xs text-[#B8B2C6]">{mod.duration}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {mod.topics.map((t, j) => (
                                                <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded">{t}</span>
                                            ))}
                                        </div>
                                    </div>
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
                            <div>
                                <h4 className="text-sm font-bold text-[#2ED9FF] mb-3 uppercase">📚 Documentation</h4>
                                {resources.docs.map((d, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{d.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{d.url}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#FF2ECC] mb-3 uppercase">🎥 Vidéos</h4>
                                {resources.videos.map((v, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{v.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{v.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div className="js-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎯 Projets Suggérés</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-white/8 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.level === 'Débutant' ? 'bg-[#00E676]/20 text-[#00E676]' :
                                                p.level === 'Intermédiaire' ? 'bg-[#FFB300]/20 text-[#FFB300]' : 'bg-[#FF2ECC]/20 text-[#FF2ECC]'
                                            }`}>{p.level}</span>
                                        <span className="text-xs text-[#B8B2C6] flex items-center gap-1"><Clock className="w-3 h-3" />{p.duration}</span>
                                    </div>
                                    <h4 className="font-bold text-[#F4F2F7] mb-1">{p.name}</h4>
                                    <p className="text-sm text-[#B8B2C6] mb-3">{p.desc}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.skills.map((s, j) => <span key={j} className="px-2 py-0.5 text-xs bg-white/10 text-[#B8B2C6] rounded">{s}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="js-card glass-card-sm p-6">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils Pratiques
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { tip: 'Utilisez === au lieu de ==', detail: 'La comparaison stricte évite les conversions de type implicites' },
                            { tip: 'Préférez const par défaut', detail: 'N\'utilisez let que quand la valeur doit changer. N\'utilisez jamais var.' },
                            { tip: 'Console.log est votre ami', detail: 'Mais console.table() et console.dir() sont encore mieux pour les objets' },
                            { tip: 'Apprenez le débogage avec DevTools', detail: 'Les breakpoints sont plus puissants que console.log' },
                            { tip: 'Maîtrisez map, filter, reduce', detail: 'Ces 3 méthodes remplacent 90% des boucles for' },
                            { tip: 'Lisez les messages d\'erreur', detail: 'Le message et le numéro de ligne vous guident vers la solution' },
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
