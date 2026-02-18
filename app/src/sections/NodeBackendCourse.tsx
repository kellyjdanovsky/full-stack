import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, BookOpen, Clock, AlertTriangle, Lightbulb, Target, Server, Monitor } from 'lucide-react';

interface NodeBackendCourseProps { className?: string; }

const topics = [
    {
        id: 'nodejs', name: 'Node.js Core', color: '#339933', items: [
            { name: 'require / import', desc: 'Importer des modules', example: "const express = require('express');\nimport express from 'express';" },
            { name: 'process', desc: 'Informations sur le processus Node', example: 'process.env.PORT // Variables d\'environnement\nprocess.argv      // Arguments CLI' },
            { name: 'fs (File System)', desc: 'Lecture/écriture de fichiers', example: "import { readFile, writeFile } from 'fs/promises';\nconst data = await readFile('config.json', 'utf8');" },
            { name: 'path', desc: 'Manipulation de chemins', example: "import path from 'path';\npath.join(__dirname, 'public', 'index.html');" },
            { name: 'EventEmitter', desc: 'Système d\'événements', example: "emitter.on('data', (payload) => {...});\nemitter.emit('data', { id: 1 });" },
            { name: 'Streams', desc: 'Traitement de données par flux', example: "const stream = fs.createReadStream('big-file.csv');\nstream.pipe(transform).pipe(output);" },
        ]
    },
    {
        id: 'express', name: 'Express.js', color: '#FFB300', items: [
            { name: 'Routes', desc: 'Définir des endpoints HTTP', example: "app.get('/api/users', (req, res) => {\n  res.json(users);\n});" },
            { name: 'Middleware', desc: 'Fonctions qui traitent les requêtes', example: "app.use(express.json());\napp.use(cors());\napp.use(authMiddleware);" },
            { name: 'Route Parameters', desc: 'Paramètres dynamiques dans l\'URL', example: "app.get('/users/:id', (req, res) => {\n  const { id } = req.params;\n});" },
            { name: 'Query Strings', desc: 'Paramètres de recherche', example: "// GET /search?q=nodejs&page=2\nconst { q, page } = req.query;" },
            { name: 'Error Handling', desc: 'Gestion centralisée des erreurs', example: "app.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});" },
            { name: 'Router', desc: 'Organiser les routes en modules', example: "const router = express.Router();\nrouter.get('/', getUsers);\napp.use('/api/users', router);" },
        ]
    },
    {
        id: 'database', name: 'Base de Données', color: '#2ED9FF', items: [
            { name: 'SQL (PostgreSQL)', desc: 'Base relationnelle', example: "const result = await pool.query(\n  'SELECT * FROM users WHERE id = $1', [userId]\n);" },
            { name: 'MongoDB', desc: 'Base NoSQL orientée documents', example: "const users = await User.find({ age: { $gte: 18 } })\n  .sort({ name: 1 }).limit(10);" },
            { name: 'Prisma ORM', desc: 'ORM moderne et type-safe', example: "const user = await prisma.user.create({\n  data: { name: 'Alice', email: 'a@b.com' }\n});" },
            { name: 'Migrations', desc: 'Versionner les changements de schéma', example: "npx prisma migrate dev --name add_users\nnpx prisma migrate deploy" },
            { name: 'Redis', desc: 'Cache en mémoire clé-valeur', example: "await redis.set('user:1', JSON.stringify(user), 'EX', 3600);\nconst cached = await redis.get('user:1');" },
        ]
    },
    {
        id: 'auth', name: 'Authentification', color: '#FF2ECC', items: [
            { name: 'JWT', desc: 'JSON Web Tokens', example: "const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '24h' });\nconst decoded = jwt.verify(token, SECRET);" },
            { name: 'bcrypt', desc: 'Hashage de mots de passe', example: "const hash = await bcrypt.hash(password, 12);\nconst match = await bcrypt.compare(password, hash);" },
            { name: 'OAuth 2.0', desc: 'Connexion via Google, GitHub...', example: "// Redirect to provider\n// Exchange code for token\n// Get user profile" },
            { name: 'Session', desc: 'Sessions côté serveur', example: "app.use(session({\n  secret: 'key', resave: false,\n  saveUninitialized: false\n}));" },
            { name: 'RBAC', desc: 'Contrôle d\'accès par rôle', example: "function requireRole(role) {\n  return (req, res, next) => {\n    if (req.user.role !== role) return res.status(403).end();\n    next();\n  };\n}" },
        ]
    },
];

const learningPath = [
    {
        level: 'Débutant', color: '#00E676', duration: '6-8 semaines', modules: [
            { title: 'Node.js Fondamentaux', duration: '2 semaines', topics: ['Installation Node.js', 'NPM & package.json', 'Modules CommonJS/ESM', 'File System & path'] },
            { title: 'Express.js Basique', duration: '2 semaines', topics: ['Créer un serveur', 'Routes GET/POST', 'Middleware', 'req/res objets'] },
            { title: 'REST API Design', duration: '1-2 semaines', topics: ['CRUD operations', 'HTTP Status codes', 'JSON responses', 'Error handling'] },
            { title: 'Base de données intro', duration: '2 semaines', topics: ['SQL basics (PostgreSQL)', 'Connexion depuis Node', 'CRUD avec Prisma', 'Relations 1-N, N-N'] },
        ]
    },
    {
        level: 'Intermédiaire', color: '#FFB300', duration: '8-12 semaines', modules: [
            { title: 'Authentification', duration: '2-3 semaines', topics: ['bcrypt (hashage)', 'JWT tokens', 'Middleware d\'auth', 'OAuth 2.0 (Google)'] },
            { title: 'Architecture API', duration: '2 semaines', topics: ['Service Layer pattern', 'Validation (Zod/Joi)', 'Error classes custom', 'Logging (Winston)'] },
            { title: 'Upload & Storage', duration: '1-2 semaines', topics: ['Multer (fichiers)', 'Cloud Storage (S3)', 'Image processing', 'CDN integration'] },
            { title: 'Testing API', duration: '2-3 semaines', topics: ['Supertest', 'Jest/Vitest', 'Test database', 'CI/CD basics'] },
        ]
    },
    {
        level: 'Avancé', color: '#FF2ECC', duration: '10-16 semaines', modules: [
            { title: 'Microservices', duration: '3-4 semaines', topics: ['API Gateway', 'Message Queues (RabbitMQ)', 'Service discovery', 'gRPC'] },
            { title: 'Performance & Scaling', duration: '2-3 semaines', topics: ['Caching (Redis)', 'Rate limiting', 'Connection pooling', 'Load balancing'] },
            { title: 'WebSockets & Real-time', duration: '2 semaines', topics: ['Socket.io', 'Server-Sent Events', 'Live notifications', 'Chat systems'] },
            { title: 'DevOps Backend', duration: '3-4 semaines', topics: ['Docker', 'CI/CD pipelines', 'Monitoring', 'Deployment (AWS/Vercel)'] },
        ]
    },
];

const commonMistakes = [
    { mistake: 'Ne pas valider les inputs utilisateur', solution: 'Toujours valider avec Zod ou Joi côté serveur. Ne jamais faire confiance au client.' },
    { mistake: 'Stocker les mots de passe en clair', solution: 'Toujours hasher avec bcrypt (salt rounds ≥ 12)' },
    { mistake: 'Pas de gestion d\'erreurs async', solution: 'Wrapper les routes async ou utiliser express-async-handler' },
    { mistake: 'Variables d\'env dans le code', solution: 'Utiliser .env + dotenv, ne jamais commit les secrets' },
    { mistake: 'SQL Injection', solution: 'Utiliser des paramètres préparés ($1, $2...) ou un ORM' },
    { mistake: 'Pas de rate limiting', solution: 'Ajouter express-rate-limit pour protéger contre les abus' },
];

const resources = {
    books: [{ name: 'Node.js Design Patterns', author: 'Mario Casciaro' }, { name: 'Express in Action', author: 'Evan Hahn' }],
    courses: [
        { name: 'The Odin Project - NodeJS', url: 'theodinproject.com', free: true },
        { name: 'Node.js Official Docs', url: 'nodejs.org/docs', free: true },
        { name: 'Prisma Tutorial', url: 'prisma.io/docs', free: true },
    ],
    videos: [
        { name: 'Traversy Media - Node.js Crash Course', duration: '1h30' },
        { name: 'Net Ninja - Node.js Tutorial', duration: 'Série 36 vidéos' },
    ],
};

const projects = [
    { name: 'API CRUD Blog', level: 'Débutant', duration: '1-2 semaines', skills: ['Express', 'Prisma', 'REST', 'Validation'] },
    { name: 'Auth system complet', level: 'Intermédiaire', duration: '2-3 semaines', skills: ['JWT', 'bcrypt', 'Middleware', 'RBAC'] },
    { name: 'E-commerce API', level: 'Intermédiaire', duration: '3-4 semaines', skills: ['Products', 'Cart', 'Payment', 'Orders'] },
    { name: 'API Real-time (chat)', level: 'Avancé', duration: '3-4 semaines', skills: ['Socket.io', 'Redis', 'Rooms', 'Presence'] },
];

export default function NodeBackendCourse({ className = '' }: NodeBackendCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTopic, setActiveTopic] = useState('nodejs');
    const [activeTab, setActiveTab] = useState<'syntax' | 'path' | 'mistakes' | 'resources' | 'projects'>('syntax');
    const [pathLevel, setPathLevel] = useState(0);
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.node-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const currentTopic = topics.find(t => t.id === activeTopic);

    return (
        <section ref={sectionRef} id="nodejs" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-[35vw] h-[35vw] bg-[#339933]/8 rounded-full blur-[150px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#339933] uppercase mb-4 block">📚 Cours Complet</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#339933]">Node.js</span> & <span className="text-[#FFB300]">Backend</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">Construisez des APIs robustes et scalables. Node.js, Express, bases de données, authentification et architecture backend.</p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[#B8B2C6]">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#339933]" /> 24-36 semaines</span>
                        <span className="flex items-center gap-2"><Server className="w-4 h-4 text-[#FFB300]" /> Backend complet</span>
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#339933] text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`}><tab.icon className="w-4 h-4" /> {tab.label}</button>
                    ))}
                </div>

                {activeTab === 'syntax' && (
                    <div className="node-card glass-card p-6 lg:p-8 mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {topics.map(t => (
                                <button key={t.id} onClick={() => setActiveTopic(t.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'}`}
                                    style={{ backgroundColor: activeTopic === t.id ? t.color : undefined }}>{t.name}</button>
                            ))}
                        </div>
                        {currentTopic && <div className="space-y-3">{currentTopic.items.map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-lg">
                                <code className="font-mono font-bold text-sm" style={{ color: currentTopic.color }}>{item.name}</code>
                                <p className="text-sm text-[#B8B2C6] my-2">{item.desc}</p>
                                <pre className="text-xs font-mono text-[#00E676] bg-black/40 p-2 rounded overflow-x-auto whitespace-pre-wrap">{item.example}</pre>
                            </div>
                        ))}</div>}
                    </div>
                )}

                {activeTab === 'path' && (
                    <div className="node-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">📚 Parcours Backend</h3>
                        <div className="flex gap-2 mb-6">{learningPath.map((lp, i) => (
                            <button key={i} onClick={() => setPathLevel(i)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathLevel === i ? 'text-white' : 'bg-white/5 text-[#B8B2C6]'}`}
                                style={{ backgroundColor: pathLevel === i ? lp.color : undefined }}>{lp.level}</button>
                        ))}</div>
                        <p className="text-sm text-[#B8B2C6] mb-4">⏱️ Durée: <strong className="text-[#F4F2F7]">{learningPath[pathLevel].duration}</strong></p>
                        <div className="space-y-4">{learningPath[pathLevel].modules.map((mod, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${learningPath[pathLevel].color}20` }}>
                                    <span className="text-sm font-bold" style={{ color: learningPath[pathLevel].color }}>{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2"><h4 className="font-medium text-[#F4F2F7]">{mod.title}</h4><span className="text-xs text-[#B8B2C6]">{mod.duration}</span></div>
                                    <div className="flex flex-wrap gap-2">{mod.topics.map((t, j) => <span key={j} className="text-xs bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded">{t}</span>)}</div>
                                </div>
                            </div>
                        ))}</div>
                    </div>
                )}

                {activeTab === 'mistakes' && (
                    <div className="node-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">⚠️ Erreurs Courantes Backend</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{commonMistakes.map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 rounded-lg">
                                <p className="font-medium text-[#F4F2F7] text-sm mb-1">❌ {item.mistake}</p>
                                <p className="text-sm text-[#B8B2C6]"><span className="text-[#00E676]">✓</span> {item.solution}</p>
                            </div>
                        ))}</div>
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div className="node-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎓 Ressources Backend</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div><h4 className="text-sm font-bold text-[#339933] mb-3">📖 Livres</h4>
                                {resources.books.map((b, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{b.name}</p><p className="text-xs text-[#B8B2C6]">{b.author}</p></div>)}</div>
                            <div><h4 className="text-sm font-bold text-[#FFB300] mb-3">🖥️ Cours</h4>
                                {resources.courses.map((c, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{c.name}</p><p className="text-xs text-[#B8B2C6]">{c.url} {c.free && <span className="text-[#00E676]">✦ Gratuit</span>}</p></div>)}</div>
                            <div><h4 className="text-sm font-bold text-[#2ED9FF] mb-3">🎥 Vidéos</h4>
                                {resources.videos.map((v, i) => <div key={i} className="p-3 bg-white/5 rounded-lg mb-2"><p className="font-medium text-[#F4F2F7] text-sm">{v.name}</p><p className="text-xs text-[#B8B2C6]">{v.duration}</p></div>)}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="node-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-xl font-bold text-[#F4F2F7] mb-6">🎯 Projets Backend</h3>
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

                <div className="node-card glass-card-sm p-6">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils Backend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { tip: 'Structure en couches', detail: 'Routes → Controllers → Services → Repositories' },
                            { tip: 'Variables d\'environnement', detail: 'Utilisez .env pour les configurations, jamais en dur dans le code' },
                            { tip: 'Logging structuré', detail: 'Winston ou Pino pour des logs exploitables en production' },
                            { tip: 'Validation des entrées', detail: 'Zod côté serveur pour valider TOUTES les entrées utilisateur' },
                            { tip: 'Versionner vos APIs', detail: '/api/v1/users — facilite les migrations sans casser les clients' },
                            { tip: 'Sécurité par défaut', detail: 'Helmet, CORS, rate limiting, parameterized queries' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg"><p className="font-medium text-[#FFB300] text-sm mb-1">💡 {item.tip}</p><p className="text-xs text-[#B8B2C6]">{item.detail}</p></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
