import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target, GitBranch, Monitor, Shield, Terminal } from 'lucide-react';

interface GitTypeScriptCourseProps { className?: string; }

const gitCommands = [
    {
        group: 'Commandes de base', color: '#F05032', commands: [
            { cmd: 'git init', desc: 'Initialiser un nouveau dépôt Git', example: 'cd mon-projet && git init' },
            { cmd: 'git clone <url>', desc: 'Cloner un dépôt distant', example: 'git clone https://github.com/user/repo.git' },
            { cmd: 'git add <fichier>', desc: 'Ajouter des fichiers au staging', example: 'git add . # Tous les fichiers\ngit add src/App.tsx # Un seul fichier' },
            { cmd: 'git commit -m "msg"', desc: 'Créer un commit avec un message', example: 'git commit -m "feat: add user login page"' },
            { cmd: 'git status', desc: 'Voir l\'état des fichiers', example: 'git status # Modified, staged, untracked' },
            { cmd: 'git log', desc: 'Historique des commits', example: 'git log --oneline --graph -10' },
            { cmd: 'git diff', desc: 'Voir les modifications non stagées', example: 'git diff src/App.tsx' },
        ]
    },
    {
        group: 'Branches & Merge', color: '#00E676', commands: [
            { cmd: 'git branch <nom>', desc: 'Créer une nouvelle branche', example: 'git branch feature/login' },
            { cmd: 'git checkout / switch', desc: 'Changer de branche', example: 'git switch feature/login\ngit checkout -b feature/new' },
            { cmd: 'git merge <branche>', desc: 'Fusionner une branche', example: 'git checkout main\ngit merge feature/login' },
            { cmd: 'git rebase', desc: 'Rejouer les commits sur une autre base', example: 'git rebase main # Depuis une feature branch' },
            { cmd: 'git stash', desc: 'Mettre de côté les modifications', example: 'git stash\ngit stash pop # Récupérer' },
        ]
    },
    {
        group: 'Collaboration (Remote)', color: '#2ED9FF', commands: [
            { cmd: 'git push', desc: 'Envoyer les commits vers le distant', example: 'git push origin main\ngit push -u origin feature/login' },
            { cmd: 'git pull', desc: 'Récupérer et fusionner', example: 'git pull origin main' },
            { cmd: 'git fetch', desc: 'Récupérer sans fusionner', example: 'git fetch origin' },
            { cmd: 'git remote', desc: 'Gérer les dépôts distants', example: 'git remote -v\ngit remote add origin <url>' },
        ]
    },
    {
        group: 'Avancé', color: '#FFB300', commands: [
            { cmd: 'git cherry-pick', desc: 'Appliquer un commit spécifique', example: 'git cherry-pick abc1234' },
            { cmd: 'git reset', desc: 'Annuler des commits', example: 'git reset --soft HEAD~1 # Garder modifications\ngit reset --hard HEAD~1 # Tout supprimer' },
            { cmd: 'git revert', desc: 'Annuler un commit (nouveau commit)', example: 'git revert abc1234' },
            { cmd: 'git bisect', desc: 'Trouver le commit qui a introduit un bug', example: 'git bisect start\ngit bisect bad\ngit bisect good v1.0' },
            { cmd: '.gitignore', desc: 'Ignorer des fichiers', example: 'node_modules/\n.env\ndist/\n*.log' },
        ]
    },
];

const tsTopics = [
    {
        id: 'types', name: 'Types de base', color: '#3178C6', items: [
            { name: 'Primitives', desc: 'Types de base TypeScript', example: 'const name: string = "Alice";\nconst age: number = 25;\nconst active: boolean = true;' },
            { name: 'Array & Tuple', desc: 'Tableaux typés et tuples', example: 'const nums: number[] = [1, 2, 3];\nconst pair: [string, number] = ["age", 25];' },
            { name: 'Union types', desc: 'Plusieurs types possibles', example: 'type Status = "active" | "inactive" | "pending";\nlet value: string | number;' },
            { name: 'Type aliases', desc: 'Nommer un type personnalisé', example: 'type UserId = string;\ntype Point = { x: number; y: number };' },
            { name: 'any / unknown / never', desc: 'Types spéciaux', example: 'let input: unknown; // Plus sûr que any\n// any: désactive le type checking' },
        ]
    },
    {
        id: 'interfaces', name: 'Interfaces', color: '#00E676', items: [
            { name: 'Interface', desc: 'Contrat pour les objets', example: 'interface User {\n  name: string;\n  age: number;\n  email?: string; // optionnel\n}' },
            { name: 'extends', desc: 'Héritage d\'interfaces', example: 'interface Admin extends User {\n  role: string;\n  permissions: string[];\n}' },
            { name: 'readonly', desc: 'Propriété en lecture seule', example: 'interface Config {\n  readonly apiUrl: string;\n  readonly port: number;\n}' },
            { name: 'Index signature', desc: 'Propriétés dynamiques', example: 'interface Dict {\n  [key: string]: string;\n}' },
        ]
    },
    {
        id: 'generics', name: 'Generics', color: '#FFB300', items: [
            { name: 'Fonction générique', desc: 'Fonction qui accepte tout type', example: 'function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}' },
            { name: 'Interface générique', desc: 'Interface avec paramètre de type', example: 'interface ApiResponse<T> {\n  data: T;\n  status: number;\n  error?: string;\n}' },
            { name: 'Contraintes', desc: 'Limiter les types acceptés', example: 'function getLength<T extends { length: number }>(item: T): number {\n  return item.length;\n}' },
            { name: 'Utility types', desc: 'Types utilitaires built-in', example: 'Partial<User>   // Tous optionnels\nRequired<User>  // Tous obligatoires\nPick<User, "name" | "age">\nOmit<User, "password">' },
        ]
    },
    {
        id: 'react-ts', name: 'React + TS', color: '#FF2ECC', items: [
            { name: 'Props typées', desc: 'Typer les propriétés d\'un composant', example: 'interface CardProps {\n  title: string;\n  children: React.ReactNode;\n  onClick?: () => void;\n}' },
            { name: 'useState typé', desc: 'État avec type explicite', example: 'const [user, setUser] = useState<User | null>(null);\nconst [items, setItems] = useState<Item[]>([]);' },
            { name: 'Events typés', desc: 'Événements React avec types', example: 'const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n  setValue(e.target.value);\n};' },
            { name: 'Generic Components', desc: 'Composants génériques', example: 'function List<T>({ items, renderItem }: {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n}) { ... }' },
        ]
    },
];

const gitMistakes = [
    { mistake: 'Committer sur main directement', solution: 'Toujours créer une branche feature, puis faire une Pull Request' },
    { mistake: 'Messages de commit vagues ("fix stuff")', solution: 'Suivre Conventional Commits : feat:, fix:, docs:, refactor:' },
    { mistake: 'Committer des fichiers sensibles (.env)', solution: 'Ajouter au .gitignore AVANT le premier commit' },
    { mistake: 'Ne pas pull avant de push', solution: 'git pull --rebase origin main avant de push' },
    { mistake: 'Force push sur main', solution: 'Ne JAMAIS git push --force sur les branches partagées' },
    { mistake: 'Ignorer les conflits de merge', solution: 'Résoudre chaque conflit manuellement, puis tester le code' },
];

const tsMistakes = [
    { mistake: 'Utiliser any partout', solution: 'Utiliser unknown et type guards. any = désactiver TypeScript.' },
    { mistake: 'Ignorer les erreurs TS', solution: 'Corriger les erreurs, pas les supprimer avec @ts-ignore' },
    { mistake: 'Types trop complexes', solution: 'Commencer simple, extraire des types réutilisables' },
    { mistake: 'Ne pas typer les retours de fonctions', solution: 'Toujours spécifier le type de retour des fonctions publiques' },
];

const resources = {
    git: [
        { name: 'Pro Git Book', url: 'git-scm.com/book', free: true },
        { name: 'Learn Git Branching', url: 'learngitbranching.js.org', free: true },
        { name: 'GitHub Skills', url: 'skills.github.com', free: true },
    ],
    ts: [
        { name: 'TypeScript Handbook', url: 'typescriptlang.org/docs', free: true },
        { name: 'Total TypeScript', url: 'totaltypescript.com', free: false },
        { name: 'Type Challenges', url: 'github.com/type-challenges', free: true },
    ],
};

export default function GitTypeScriptCourse({ className = '' }: GitTypeScriptCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState<'git' | 'ts'>('git');
    const [activeTsTopic, setActiveTsTopic] = useState('types');
    const [activeGitGroup, setActiveGitGroup] = useState(0);
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

    const currentTsTopic = tsTopics.find(t => t.id === activeTsTopic);

    return (
        <section ref={sectionRef} id="git-ts" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#F05032]/6 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#3178C6]/6 rounded-full blur-[150px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#F05032] uppercase mb-4 block">📚 Outils Essentiels</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#F05032]">Git</span> & <span className="text-[#3178C6]">TypeScript</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">Deux outils indispensables pour tout développeur professionnel. Maîtrisez le versioning et le typage statique.</p>
                </div>

                {/* Section Toggle */}
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={() => setActiveSection('git')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'git' ? 'bg-[#F05032] text-white scale-105' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'}`}>
                        <GitBranch className="w-5 h-5" /> Git & GitHub
                    </button>
                    <button onClick={() => setActiveSection('ts')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === 'ts' ? 'bg-[#3178C6] text-white scale-105' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'}`}>
                        <Shield className="w-5 h-5" /> TypeScript
                    </button>
                </div>

                {/* Git Section */}
                {activeSection === 'git' && (
                    <>
                        <div className="git-card glass-card p-6 lg:p-8 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                                <GitBranch className="w-5 h-5 text-[#F05032]" /> Commandes Git Essentielles
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {gitCommands.map((g, i) => (
                                    <button key={i} onClick={() => setActiveGitGroup(i)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeGitGroup === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'}`}
                                        style={{ backgroundColor: activeGitGroup === i ? g.color : undefined }}>{g.group}</button>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {gitCommands[activeGitGroup].commands.map((cmd, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-lg">
                                        <code className="font-mono font-bold text-sm" style={{ color: gitCommands[activeGitGroup].color }}>{cmd.cmd}</code>
                                        <p className="text-sm text-[#B8B2C6] my-2">{cmd.desc}</p>
                                        <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto whitespace-pre-wrap">{cmd.example}</pre>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="git-card glass-card-sm p-6 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">⚠️ Erreurs Git Courantes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{gitMistakes.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                    <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                                </div>
                            ))}</div>
                        </div>

                        <div className="git-card glass-card-sm p-6 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-4">🎓 Ressources Git</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{resources.git.map((r, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm">{r.name}</p>
                                    <p className="text-xs text-[#B8B2C6]">{r.url} {r.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                </div>
                            ))}</div>
                        </div>

                        <div className="git-card glass-card-sm p-6">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-4">💡 Bonnes Pratiques Git</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { tip: 'Commits atomiques', detail: 'Un commit = un changement logique. Evitez les gros commits.' },
                                    { tip: 'Conventional Commits', detail: 'feat:, fix:, docs:, refactor:, test:, chore:' },
                                    { tip: 'Feature branches', detail: 'Une branche par fonctionnalité, merge via Pull Request' },
                                    { tip: 'Rebase avant merge', detail: 'git pull --rebase pour un historique linéaire et propre' },
                                    { tip: '.gitignore dès le début', detail: 'Toujours ignorer node_modules, .env, dist, *.log' },
                                    { tip: 'Code review via PR', detail: 'Au moins un review avant de merger sur main' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg">
                                        <p className="font-medium text-[#FFB300] text-sm mb-1">💡 {item.tip}</p>
                                        <p className="text-xs text-[#B8B2C6]">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* TypeScript Section */}
                {activeSection === 'ts' && (
                    <>
                        <div className="git-card glass-card p-6 lg:p-8 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#3178C6]" /> Concepts TypeScript
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {tsTopics.map(t => (
                                    <button key={t.id} onClick={() => setActiveTsTopic(t.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTsTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'}`}
                                        style={{ backgroundColor: activeTsTopic === t.id ? t.color : undefined }}>{t.name}</button>
                                ))}
                            </div>
                            {currentTsTopic && <div className="space-y-3">{currentTsTopic.items.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <code className="font-mono font-bold text-sm" style={{ color: currentTsTopic.color }}>{item.name}</code>
                                    <p className="text-sm text-[#B8B2C6] my-2">{item.desc}</p>
                                    <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
                                </div>
                            ))}</div>}
                        </div>

                        <div className="git-card glass-card-sm p-6 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">⚠️ Erreurs TypeScript Courantes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{tsMistakes.map((item, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                    <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                                </div>
                            ))}</div>
                        </div>

                        <div className="git-card glass-card-sm p-6 mb-8">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-4">🎓 Ressources TypeScript</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{resources.ts.map((r, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded-lg">
                                    <p className="font-medium text-[#F4F2F7] text-sm">{r.name}</p>
                                    <p className="text-xs text-[#B8B2C6]">{r.url} {r.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p>
                                </div>
                            ))}</div>
                        </div>

                        <div className="git-card glass-card-sm p-6">
                            <h3 className="text-xl font-bold text-[#F4F2F7] mb-4">💡 Conseils TypeScript</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { tip: 'Strict mode activé', detail: '"strict": true dans tsconfig.json pour un code plus sûr' },
                                    { tip: 'Inférence de type', detail: 'Laissez TS déduire le type quand c\'est évident' },
                                    { tip: 'Unions discriminées', detail: 'Utilisez un champ "type" pour distinguer les variants' },
                                    { tip: 'satisfies operator', detail: 'Vérifie le type sans le restreindre : config satisfies Config' },
                                    { tip: 'Zod pour runtime', detail: 'TS vérifie à la compilation, Zod vérifie à l\'exécution' },
                                    { tip: 'as const', detail: 'Rendre les valeurs littérales immuables et exactes' },
                                ].map((item, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg">
                                        <p className="font-medium text-[#FFB300] text-sm mb-1">💡 {item.tip}</p>
                                        <p className="text-xs text-[#B8B2C6]">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
