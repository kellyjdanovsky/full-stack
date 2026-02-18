import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target, Layers, Monitor, Zap, Box } from 'lucide-react';

interface ReactCourseProps { className?: string; }

const reactTopics = [
    {
        id: 'components', name: 'Composants', color: '#61DAFB', items: [
            { name: 'Functional Component', desc: 'Composant fonction (standard moderne)', example: 'function Card({ title, children }) {\n  return <div className="card">\n    <h2>{title}</h2>\n    {children}\n  </div>\n}' },
            { name: 'Props', desc: 'Données passées du parent vers l\'enfant', example: '<UserCard name="Alice" age={25} />\n// Accès : function UserCard({ name, age }) { ... }' },
            { name: 'JSX', desc: 'Syntaxe XML-like dans JavaScript', example: 'const element = (\n  <div className="app">\n    <h1>Hello {name}</h1>\n    {isLoggedIn && <Dashboard />}\n  </div>\n);' },
            { name: 'Conditional Rendering', desc: 'Affichage conditionnel d\'éléments', example: '{isLoading ? <Spinner /> : <Content />}\n{error && <ErrorMsg text={error} />}' },
            { name: 'Lists & Keys', desc: 'Rendu de listes avec identifiants uniques', example: '{users.map(user => (\n  <UserCard key={user.id} {...user} />\n))}' },
            { name: 'Children', desc: 'Contenu passé entre les balises', example: '<Layout>\n  <Sidebar />\n  <Main />\n</Layout>' },
        ]
    },
    {
        id: 'hooks', name: 'Hooks', color: '#00E676', items: [
            { name: 'useState', desc: 'État local d\'un composant', example: 'const [count, setCount] = useState(0);\nsetCount(prev => prev + 1);' },
            { name: 'useEffect', desc: 'Effets de bord (API calls, subscriptions)', example: 'useEffect(() => {\n  fetchData();\n  return () => cleanup();\n}, [dependency]);' },
            { name: 'useContext', desc: 'Accéder au contexte global sans prop drilling', example: 'const theme = useContext(ThemeContext);\n// Provider : <ThemeContext.Provider value={theme}>' },
            { name: 'useRef', desc: 'Référence mutable sans re-render', example: 'const inputRef = useRef(null);\ninputRef.current.focus();' },
            { name: 'useMemo', desc: 'Mémoriser une valeur calculée coûteuse', example: 'const sorted = useMemo(() => \n  items.sort((a,b) => a.price - b.price)\n, [items]);' },
            { name: 'useCallback', desc: 'Mémoriser une fonction', example: 'const handleClick = useCallback(() => {\n  setCount(c => c + 1);\n}, []);' },
            { name: 'useReducer', desc: 'État complexe avec actions (mini-Redux)', example: 'const [state, dispatch] = useReducer(reducer, initialState);\ndispatch({ type: "INCREMENT" });' },
            { name: 'Custom Hooks', desc: 'Extraire la logique réutilisable', example: 'function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(\n    () => JSON.parse(localStorage.getItem(key)) ?? initial\n  );\n  // ...\n}' },
        ]
    },
    {
        id: 'patterns', name: 'Patterns', color: '#FFB300', items: [
            { name: 'Component Composition', desc: 'Assembler des composants petits et réutilisables', example: '<Card>\n  <Card.Header title="..." />\n  <Card.Body>{content}</Card.Body>\n  <Card.Footer actions={[...]} />\n</Card>' },
            { name: 'Render Props', desc: 'Partager la logique via une prop fonction', example: '<DataFetcher url="/api/users"\n  render={(data) => <UserList users={data} />}\n/>' },
            { name: 'Higher-Order Component', desc: 'Fonction qui wrape un composant', example: 'const WithAuth = (Component) => {\n  return (props) => {\n    if (!user) return <Login />;\n    return <Component {...props} />;\n  };\n};' },
            { name: 'Container/Presentational', desc: 'Séparer logique et affichage', example: '// Container: gère les données\n// Presentational: reçoit des props et affiche' },
            { name: 'State lifting', desc: 'Remonter l\'état au parent commun', example: '// Parent gère l\'état partagé\n// Enfants reçoivent via props' },
        ]
    },
    {
        id: 'ecosystem', name: 'Écosystème', color: '#FF2ECC', items: [
            { name: 'React Router', desc: 'Navigation SPA côté client', example: '<BrowserRouter>\n  <Route path="/" element={<Home />} />\n  <Route path="/about" element={<About />} />\n</BrowserRouter>' },
            { name: 'Zustand / Redux', desc: 'State management global', example: 'const useStore = create((set) => ({\n  count: 0,\n  increment: () => set(s => ({ count: s.count + 1 }))\n}));' },
            { name: 'React Query / TanStack', desc: 'Gestion des données serveur', example: 'const { data, isLoading } = useQuery({\n  queryKey: ["users"],\n  queryFn: () => fetch("/api/users").then(r => r.json())\n});' },
            { name: 'Framer Motion', desc: 'Animations réactives', example: '<motion.div\n  initial={{ opacity: 0 }}\n  animate={{ opacity: 1 }}\n  transition={{ duration: 0.5 }}\n/>' },
            { name: 'Next.js', desc: 'Framework React full-stack (SSR, SSG, API)', example: '// app/page.tsx\nexport default async function Page() {\n  const data = await fetch("/api");\n  return <div>{data}</div>;\n}' },
        ]
    },
];

const learningPath = [
    {
        level: 'Débutant', color: '#00E676', duration: '4-6 semaines', modules: [
            { title: 'JSX & Composants', duration: '1 semaine', topics: ['JSX syntax', 'Function components', 'Props', 'CSS dans React'] },
            { title: 'État avec useState', duration: '1-2 semaines', topics: ['State local', 'Events handlers', 'Formulaires contrôlés', 'Lifting state'] },
            { title: 'Rendu conditionnel & Listes', duration: '1 semaine', topics: ['&&, ternaire', 'map() et keys', 'Filtrage', 'Composants dynamiques'] },
            { title: 'useEffect & Cycle de vie', duration: '1-2 semaines', topics: ['Effects', 'Dependencies array', 'Cleanup', 'Fetch data'] },
        ]
    },
    {
        level: 'Intermédiaire', color: '#FFB300', duration: '6-8 semaines', modules: [
            { title: 'Hooks avancés', duration: '2 semaines', topics: ['useContext', 'useReducer', 'useMemo/useCallback', 'Custom hooks'] },
            { title: 'Routing', duration: '1-2 semaines', topics: ['React Router v6', 'Routes imbriquées', 'Navigation programmatique', 'Protected routes'] },
            { title: 'State Management', duration: '2 semaines', topics: ['Context API', 'Zustand', 'React Query', 'Server state vs client state'] },
            { title: 'Formulaires & Validation', duration: '1-2 semaines', topics: ['React Hook Form', 'Zod validation', 'Error handling', 'File uploads'] },
        ]
    },
    {
        level: 'Avancé', color: '#FF2ECC', duration: '8-12 semaines', modules: [
            { title: 'Performance', duration: '2 semaines', topics: ['React.memo', 'useMemo/useCallback profond', 'Lazy loading', 'Suspense'] },
            { title: 'Testing', duration: '2-3 semaines', topics: ['React Testing Library', 'Jest/Vitest', 'Integration tests', 'E2E avec Playwright'] },
            { title: 'Next.js', duration: '3-4 semaines', topics: ['App Router', 'Server Components', 'ISR/SSG/SSR', 'API Routes'] },
            { title: 'Architecture avancée', duration: '2-3 semaines', topics: ['Design patterns', 'Mono-repo', 'Component library', 'Storybook'] },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Muter l\'état directement', solution: 'Toujours créer une copie : setItems([...items, newItem])' },
    { mistake: 'useEffect sans dependency array', solution: 'Toujours spécifier les dépendances. [] pour exécuter une seule fois.' },
    { mistake: 'Oublier la key dans les listes', solution: 'Utiliser un id unique, jamais l\'index : key={item.id}' },
    { mistake: 'Prop drilling excessif', solution: 'Utiliser Context, Zustand ou composition de composants' },
    { mistake: 'Trop de re-renders', solution: 'Profiler avec React DevTools, mémoriser avec useMemo/useCallback' },
    { mistake: 'Fetch dans le composant sans cleanup', solution: 'Utiliser AbortController ou React Query pour éviter les memory leaks' },
    { mistake: 'setState dans le render', solution: 'Les mises à jour d\'état doivent être dans des handlers ou useEffect' },
    { mistake: 'Confondre état local et global', solution: 'L\'état local dans le composant, global seulement si partagé entre routes' },
];

const resources = {
    books: [{ name: 'React Docs (Official)', author: 'React Team', level: 'Tous' }, { name: 'Learning React', author: 'Alex Banks', level: 'Intermédiaire' }],
    courses: [
        { name: 'React.dev Official Tutorial', url: 'react.dev/learn', free: true },
        { name: 'Scrimba - Learn React', url: 'scrimba.com', free: true },
        { name: 'Epic React (Kent C. Dodds)', url: 'epicreact.dev', free: false },
    ],
    videos: [
        { name: 'Jack Herrington - No BS React', duration: 'Série' },
        { name: 'Traversy Media - React Crash Course', duration: '2h' },
        { name: 'Fireship - React in 100 Seconds', duration: '2min' },
    ],
};

const projects = [
    { name: 'To-Do App avec filtres', level: 'Débutant', duration: '1 semaine', skills: ['useState', 'Events', 'Conditional rendering'] },
    { name: 'E-commerce (panier, fiches produits)', level: 'Intermédiaire', duration: '3-4 semaines', skills: ['Router', 'Context', 'Fetch API'] },
    { name: 'Dashboard avec graphiques', level: 'Intermédiaire', duration: '2-3 semaines', skills: ['Recharts', 'React Query', 'Layout'] },
    { name: 'App full-stack avec Next.js', level: 'Avancé', duration: '4-6 semaines', skills: ['Next.js', 'Prisma', 'Auth', 'Deploy'] },
];

export default function ReactCourse({ className = '' }: ReactCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('components');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes' | 'resources' | 'projects'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.react-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const currentTopic = reactTopics.find(t => t.id === activeTopic);

    return (
        <section ref={sectionRef} id="react" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/3 w-[35vw] h-[35vw] bg-[#61DAFB]/8 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#61DAFB] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4"><span className="text-[#61DAFB]">React</span></h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">La bibliothèque UI la plus populaire. Composants, Hooks, State Management, et l'écosystème complet pour construire des interfaces modernes.</p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#61DAFB]" /> 18-26 semaines</span>
                        <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#00E676]" /> Frontend avancé</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {([
                        { id: 'syntax', label: 'Concepts', icon: Code2 },
                        { id: 'path', label: 'Parcours', icon: BookOpen },
                        { id: 'mistakes', label: 'Erreurs', icon: AlertTriangle },
                        { id: 'resources', label: 'Ressources', icon: Monitor },
                        { id: 'projects', label: 'Projets', icon: Target },
                    ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#61DAFB] text-black' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
                    ))}
                </div>

                {activeTab === 'syntax' && (
                    <div className="react-card glass-card p-6 lg:p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {reactTopics.map(t => (
                                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                        }`} style={{ backgroundColor: activeTopic === t.id ? t.color : undefined }}>{t.name}</button>
                            ))}
                        </div>
                        {currentTopic && (
                            <div className="space-y-3">{currentTopic.items.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <code className="font-mono font-bold text-sm" style={{ color: currentTopic.color }}>{item.name}</code>
                                    <p className="text-sm text-[#B8B2C6] my-2">{item.desc}</p>
                                    <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
                                </div>
                            ))}</div>
                        )}
                    </div>
                )}

                {activeTab === 'path' && (
                    <div className="react-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">📚 Parcours React</h3>
                        <div className="flex gap-2 mb-6">
                            {learningPath.map((lp, i) => (
                                <button key={i} onClick={() => setPathLevel(i)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'}`}
                                    style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>{lp.level}</button>
                            ))}
                        </div>
                        <p className="text-sm text-[#B8B2C6] mb-4">⏱️ Durée: <strong className="text-[#F4F2F7]">{learningPath[pathLevel].duration}</strong></p>
                        <div className="space-y-4">{learningPath[pathLevel].modules.map((mod, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${learningPath[pathLevel].color}20` }}>
                                    <span className="text-sm font-bold" style={{ color: learningPath[pathLevel].color }}>{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-[#F4F2F7]">{mod.title}</h4>
                                        <span className="text-xs text-[#B8B2C6]">{mod.duration}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">{mod.topics.map((t, j) => <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded">{t}</span>)}</div>
                                </div>
                            </div>
                        ))}</div>
                    </div>
                )}

                {activeTab === 'mistakes' && (
                    <div className="react-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">⚠️ Erreurs Courantes React</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{commonMistakes.map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-lg">
                                <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                            </div>
                        ))}</div>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="react-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎓 Ressources React</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div><h4 className="text-sm font-bold text-[#61DAFB] mb-3">📖 Livres</h4>
                                {resources.books.map((b, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{b.name}</p><p className="text-xs text-[#B8B2C6]">{b.author}</p></div>)}
                            </div>
                            <div><h4 className="text-sm font-bold text-[#00E676] mb-3">🖥️ Cours</h4>
                                {resources.courses.map((c, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{c.name}</p><p className="text-xs text-[#B8B2C6]">{c.url} {c.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p></div>)}
                            </div>
                            <div><h4 className="text-sm font-bold text-[#FF2ECC] mb-3">🎥 Vidéos</h4>
                                {resources.videos.map((v, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{v.name}</p><p className="text-xs text-[#B8B2C6]">{v.duration}</p></div>)}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="react-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎯 Projets React</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{projects.map((p, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.level === 'Débutant' ? 'bg-[#00E676]/20 text-[#00E676]' : p.level === 'Intermédiaire' ? 'bg-[#FFB300]/20 text-[#FFB300]' : 'bg-[#FF2ECC]/20 text-[#FF2ECC]'}`}>{p.level}</span>
                                    <span className="text-xs text-[#B8B2C6]">{p.duration}</span>
                                </div>
                                <h4 className="font-bold text-[#F4F2F7] mb-2">{p.name}</h4>
                                <div className="flex flex-wrap gap-1">{p.skills.map((s, j) => <span key={j} className="px-2 py-0.5 text-xs bg-white/10 text-[#B8B2C6] rounded">{s}</span>)}</div>
                            </div>
                        ))}</div>
                    </div>
                )}

                <div className="react-card glass-card-sm p-6">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils React</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { tip: 'Composants petits et focalisés', detail: 'Un composant = une responsabilité. Divisez les gros composants.' },
                            { tip: 'Nommez vos custom hooks use*', detail: 'Convention : useAuth, useLocalStorage, useFetch' },
                            { tip: 'React DevTools est indispensable', detail: 'Installez l\'extension pour débugger le state et le profiling' },
                            { tip: 'Ne pas optimiser prématurément', detail: 'useMemo/useCallback seulement si un problème de perf est identifié' },
                            { tip: 'Server Components avec Next.js', detail: 'En 2024+, préférez les Server Components pour les données' },
                            { tip: 'TypeScript rend React plus sûr', detail: 'Typez vos props avec interfaces pour une meilleure DX' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg"><p className="font-medium text-[#FFB300] text-sm mb-1">💡 {item.tip}</p><p className="text-xs text-[#B8B2C6]">{item.detail}</p></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
