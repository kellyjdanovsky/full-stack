import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target, Database, Brain, Monitor, Server } from 'lucide-react';

interface PythonCourseProps { className?: string; }

const pythonTopics = [
    {
        id: 'basics', name: 'Bases & Types', color: '#3776AB', items: [
            { name: 'Variables', desc: 'Pas besoin de déclarer le type (typage dynamique)', example: 'name = "Alice"\nage = 25\nis_active = True' },
            { name: 'Types primitifs', desc: 'str, int, float, bool, None', example: 'text = "Bonjour"  # str\nnum = 42           # int\npi = 3.14          # float' },
            { name: 'Listes', desc: 'Collection ordonnée et modifiable', example: 'fruits = ["pomme", "banane"]\nfruits.append("orange")\nfirst = fruits[0]' },
            { name: 'Dictionnaires', desc: 'Collection de paires clé-valeur', example: 'user = {"name": "Alice", "age": 25}\nuser["email"] = "alice@mail.com"' },
            { name: 'Tuples', desc: 'Collection ordonnée et immuable', example: 'point = (10, 20)\nx, y = point  # unpacking' },
            { name: 'Sets', desc: 'Collection non ordonnée sans doublons', example: 'unique = {1, 2, 3, 3}  # {1, 2, 3}' },
            { name: 'f-strings', desc: 'Formatage de chaînes moderne', example: 'msg = f"Bonjour {name}, vous avez {age} ans"' },
            { name: 'Type hints', desc: 'Annotations de type (Python 3.5+)', example: 'def greet(name: str) -> str:\n    return f"Hello {name}"' },
        ]
    },
    {
        id: 'functions', name: 'Fonctions', color: '#FFD43B', items: [
            { name: 'def', desc: 'Définir une fonction', example: 'def add(a, b):\n    return a + b' },
            { name: 'Paramètres par défaut', desc: 'Valeur si non fournie', example: 'def greet(name="World"):\n    print(f"Hello {name}")' },
            { name: '*args, **kwargs', desc: 'Arguments variables', example: 'def func(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict' },
            { name: 'Lambda', desc: 'Fonction anonyme en une ligne', example: 'double = lambda x: x * 2\nsorted(users, key=lambda u: u["age"])' },
            { name: 'Décorateurs', desc: 'Modifier le comportement d\'une fonction', example: '@timer\ndef slow_function():\n    time.sleep(1)' },
            { name: 'Générateurs', desc: 'Fonction qui produit des valeurs lazy', example: 'def count(n):\n    for i in range(n):\n        yield i' },
            { name: 'List comprehension', desc: 'Créer des listes de façon concise', example: 'squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x%2==0]' },
        ]
    },
    {
        id: 'oop', name: 'POO (Classes)', color: '#00E676', items: [
            { name: 'class', desc: 'Définir une classe', example: 'class User:\n    def __init__(self, name):\n        self.name = name' },
            { name: 'Héritage', desc: 'Hériter d\'une classe parent', example: 'class Admin(User):\n    def __init__(self, name, role):\n        super().__init__(name)\n        self.role = role' },
            { name: 'Méthodes', desc: 'Fonctions liées à une classe', example: 'class User:\n    def greet(self):\n        return f"Hi, {self.name}"' },
            { name: '@property', desc: 'Getter/setter pythonique', example: '@property\ndef full_name(self):\n    return f"{self.first} {self.last}"' },
            { name: '@staticmethod', desc: 'Méthode sans accès à l\'instance', example: '@staticmethod\ndef validate(email):\n    return "@" in email' },
            { name: 'Dataclasses', desc: 'Classe de données simplifiée (3.7+)', example: '@dataclass\nclass Point:\n    x: float\n    y: float' },
        ]
    },
    {
        id: 'advanced', name: 'Avancé', color: '#FF2ECC', items: [
            { name: 'Context managers', desc: 'Gestion automatique des ressources', example: 'with open("file.txt") as f:\n    content = f.read()' },
            { name: 'Exceptions', desc: 'Gestion des erreurs', example: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Erreur: {e}")' },
            { name: 'async/await', desc: 'Programmation asynchrone', example: 'async def fetch_data():\n    data = await get_api("/users")\n    return data' },
            { name: 'Modules & packages', desc: 'Organisation du code', example: 'from datetime import datetime\nimport json\nfrom pathlib import Path' },
            { name: 'Virtual environments', desc: 'Environnements isolés', example: 'python -m venv .venv\nsource .venv/bin/activate  # Linux/Mac\n.venv\\Scripts\\activate    # Windows' },
            { name: 'Type checking', desc: 'Vérification statique avec mypy', example: 'def process(items: list[int]) -> dict[str, int]:\n    return {"total": sum(items)}' },
        ]
    },
];

const learningPath = [
    {
        level: 'Débutant', color: '#00E676', duration: '6-8 semaines', modules: [
            { title: 'Installation & Premiers pas', duration: '3 jours', topics: ['Installer Python 3.x', 'REPL interactif', 'Premier script .py', 'print() et input()'] },
            { title: 'Variables & Types de données', duration: '1 semaine', topics: ['int, float, str, bool', 'Conversions de type', 'Opérateurs', 'f-strings'] },
            { title: 'Structures de contrôle', duration: '1 semaine', topics: ['if/elif/else', 'for / while', 'break / continue', 'range()'] },
            { title: 'Fonctions', duration: '1-2 semaines', topics: ['def, return', 'Paramètres', 'Scope', 'Fonctions built-in'] },
            { title: 'Structures de données', duration: '2 semaines', topics: ['Listes & méthodes', 'Dictionnaires', 'Tuples & Sets', 'Comprehensions'] },
        ]
    },
    {
        level: 'Intermédiaire', color: '#FFB300', duration: '8-12 semaines', modules: [
            { title: 'POO (Programmation Orientée Objet)', duration: '3 semaines', topics: ['Classes & objets', 'Héritage', 'Encapsulation', 'Polymorphisme'] },
            { title: 'Fichiers & Exceptions', duration: '1-2 semaines', topics: ['Lecture/écriture fichiers', 'try/except/finally', 'Context managers', 'JSON/CSV'] },
            { title: 'Modules & Packages', duration: '1 semaine', topics: ['import system', 'pip & requirements.txt', 'Virtual environments', 'Création de packages'] },
            { title: 'Web avec Flask/FastAPI', duration: '3-4 semaines', topics: ['Routes & views', 'Templates', 'REST API', 'Base de données SQLAlchemy'] },
        ]
    },
    {
        level: 'Avancé', color: '#FF2ECC', duration: '10-16 semaines', modules: [
            { title: 'Async & Concurrence', duration: '2-3 semaines', topics: ['asyncio', 'Threading', 'Multiprocessing', 'Event loop'] },
            { title: 'Testing & Qualité', duration: '2 semaines', topics: ['pytest', 'unittest', 'Mocking', 'Coverage'] },
            { title: 'Data Science basics', duration: '3-4 semaines', topics: ['NumPy', 'Pandas', 'Matplotlib', 'Jupyter Notebooks'] },
            { title: 'Machine Learning intro', duration: '3-4 semaines', topics: ['scikit-learn', 'Classification', 'Régression', 'Model evaluation'] },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Indentation incorrecte (tabs vs spaces)', solution: 'Configurer votre éditeur pour 4 espaces. Python est sensible à l\'indentation.' },
    { mistake: 'Modifier une liste pendant l\'itération', solution: 'Créer une copie ou utiliser une list comprehension : [x for x in lst if condition]' },
    { mistake: 'Utiliser des mutable defaults', solution: 'def f(lst=None): lst = lst or [] — Jamais def f(lst=[])' },
    { mistake: 'Confondre is et ==', solution: '== compare les valeurs, is compare les identités (même objet en mémoire)' },
    { mistake: 'Ignorer les virtual environments', solution: 'Toujours créer un venv par projet : python -m venv .venv' },
    { mistake: 'Ne pas gérer les exceptions', solution: 'Utiliser try/except pour les opérations risquées (fichiers, réseau, parsing)' },
];

const resources = {
    books: [
        { name: 'Automate the Boring Stuff', author: 'Al Sweigart', level: 'Débutant', free: true },
        { name: 'Python Crash Course', author: 'Eric Matthes', level: 'Débutant' },
        { name: 'Fluent Python', author: 'Luciano Ramalho', level: 'Avancé' },
    ],
    courses: [
        { name: 'Python.org Official Tutorial', url: 'docs.python.org', free: true },
        { name: 'Real Python', url: 'realpython.com', free: false },
        { name: 'CS50P (Harvard)', url: 'cs50.harvard.edu/python', free: true },
        { name: 'Codecademy Python', url: 'codecademy.com', free: false },
    ],
    videos: [
        { name: 'Corey Schafer - Python Tutorials', duration: 'Série complète' },
        { name: 'Tech With Tim - Python for Beginners', duration: '6h' },
        { name: 'Fireship - Python in 100 Seconds', duration: '2min' },
    ],
};

const projects = [
    { name: 'Gestionnaire de contacts', level: 'Débutant', duration: '1 semaine', skills: ['Dictionnaires', 'Fichiers', 'Input/Output'] },
    { name: 'Web scraper avec BeautifulSoup', level: 'Intermédiaire', duration: '1-2 semaines', skills: ['requests', 'HTML parsing', 'CSV export'] },
    { name: 'API REST avec FastAPI', level: 'Intermédiaire', duration: '2-3 semaines', skills: ['Routes', 'Pydantic', 'SQLAlchemy', 'CRUD'] },
    { name: 'Bot Discord/Telegram', level: 'Intermédiaire', duration: '2 semaines', skills: ['API externe', 'Async', 'Commands'] },
    { name: 'Dashboard data avec Streamlit', level: 'Avancé', duration: '2-3 semaines', skills: ['Pandas', 'Plotly', 'Data viz'] },
    { name: 'Modèle ML de classification', level: 'Avancé', duration: '3-4 semaines', skills: ['scikit-learn', 'Pandas', 'Model evaluation'] },
];

export default function PythonCourse({ className = '' }: PythonCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('basics');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes' | 'resources' | 'projects'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
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
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] bg-[#3776AB]/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] bg-[#FFD43B]/6 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#3776AB] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#3776AB]">Python</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Le langage polyvalent par excellence. Backend, Data Science, IA, scripting —
                        Python est le couteau suisse du développeur moderne.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#3776AB]" /> 24-36 semaines</span>
                        <span className="flex items-center gap-2"><Brain className="w-4 h-4 text-[#FFD43B]" /> Backend + Data + IA</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {([
                        { id: 'syntax', label: 'Syntaxe', icon: Code2 },
                        { id: 'path', label: 'Parcours', icon: BookOpen },
                        { id: 'mistakes', label: 'Erreurs', icon: AlertTriangle },
                        { id: 'resources', label: 'Ressources', icon: Monitor },
                        { id: 'projects', label: 'Projets', icon: Target },
                    ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#3776AB] text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
                    ))}
                </div>

                {activeTab === 'syntax' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {pythonTopics.map(t => (
                                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: activeTopic === t.id ? t.color : undefined }}>{t.name}</button>
                            ))}
                        </div>
                        {currentTopic && (
                            <div className="space-y-3">
                                {currentTopic.items.map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/8 transition-colors">
                                        <code className="font-mono font-bold text-sm" style={{ color: currentTopic.color }}>{item.name}</code>
                                        <p className="text-sm text-[#B8B2C6] my-2">{item.desc}</p>
                                        <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
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
                            {learningPath.map((lp, i) => (
                                <button key={i} onClick={() => setPathLevel(i)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'
                                        }`} style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>{lp.level}</button>
                            ))}
                        </div>
                        <p className="text-sm text-[#B8B2C6] mb-4">⏱️ Durée estimée: <strong className="text-[#F4F2F7]">{learningPath[pathLevel].duration}</strong></p>
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
                                            {mod.topics.map((t, j) => <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded">{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'mistakes' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">⚠️ Erreurs Courantes Python</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {commonMistakes.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                    <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎓 Ressources Python</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="text-sm font-bold text-[#3776AB] mb-3">📖 Livres</h4>
                                {resources.books.map((b, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{b.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{b.author} — {b.level}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#FFD43B] mb-3">🖥️ Cours</h4>
                                {resources.courses.map((c, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg mb-2">
                                        <p className="font-medium text-[#F4F2F7] text-sm">{c.name}</p>
                                        <p className="text-xs text-[#B8B2C6]">{c.url} {c.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-[#00E676] mb-3">🎥 Vidéos</h4>
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

                {activeTab === 'projects' && (
                    <div className="py-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎯 Projets Suggérés</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((p, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.level === 'Débutant' ? 'bg-[#00E676]/20 text-[#00E676]' :
                                                p.level === 'Intermédiaire' ? 'bg-[#FFB300]/20 text-[#FFB300]' : 'bg-[#FF2ECC]/20 text-[#FF2ECC]'
                                            }`}>{p.level}</span>
                                        <span className="text-xs text-[#B8B2C6]"><Clock className="w-3 h-3 inline" /> {p.duration}</span>
                                    </div>
                                    <h4 className="font-bold text-[#F4F2F7] mb-2">{p.name}</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {p.skills.map((s, j) => <span key={j} className="px-2 py-0.5 text-xs bg-white/10 text-[#B8B2C6] rounded">{s}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="py-card glass-card-sm p-6">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils Python
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { tip: 'Zen of Python', detail: 'Tapez "import this" dans le REPL pour la philosophie Python' },
                            { tip: 'Utilisez les venvs', detail: 'Un environnement virtuel par projet évite les conflits de dépendances' },
                            { tip: 'PEP 8', detail: 'Suivez le guide de style officiel pour un code lisible et maintenable' },
                            { tip: 'Comprehensions > boucles', detail: 'Les list/dict comprehensions sont plus rapides et pythoniques' },
                            { tip: 'Pathlib > os.path', detail: 'Utilisez pathlib pour manipuler les chemins de fichiers' },
                            { tip: 'Black formatter', detail: 'Utilisez Black pour un formatage automatique et cohérent' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg">
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
