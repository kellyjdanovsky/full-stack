import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderTree, FileCode, FolderOpen, Settings, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';

interface ProjectStructureProps { className?: string; }

interface TreeItem { name: string; type: 'folder' | 'file'; desc: string; children?: TreeItem[]; color?: string; }

const projectStructures: { id: string; name: string; color: string; icon: string; description: string; tree: TreeItem[]; conventions: { rule: string; detail: string }[]; tips: string[] }[] = [
    {
        id: 'react', name: 'React / Vite', color: '#61DAFB', icon: '⚛️', description: 'Structure standard pour une app React avec Vite, TypeScript et Tailwind CSS.',
        tree: [
            {
                name: 'public/', type: 'folder', desc: 'Fichiers statiques servis directement (favicon, images, robots.txt)', children: [
                    { name: 'favicon.ico', type: 'file', desc: 'Icône du site affichée dans l\'onglet du navigateur' },
                    { name: 'robots.txt', type: 'file', desc: 'Instructions pour les moteurs de recherche (SEO)' },
                ]
            },
            {
                name: 'src/', type: 'folder', desc: 'Code source principal de l\'application', color: '#00E676', children: [
                    {
                        name: 'assets/', type: 'folder', desc: 'Images, fonts et fichiers importés dans le code', children: [
                            { name: 'images/', type: 'folder', desc: 'Photos, illustrations, logos du projet' },
                            { name: 'fonts/', type: 'folder', desc: 'Polices personnalisées (.woff2, .ttf)' },
                        ]
                    },
                    {
                        name: 'components/', type: 'folder', desc: 'Composants React réutilisables (UI)', color: '#2ED9FF', children: [
                            { name: 'ui/', type: 'folder', desc: 'Composants de base : Button, Input, Card, Modal...' },
                            { name: 'layout/', type: 'folder', desc: 'Composants de mise en page : Header, Footer, Sidebar' },
                            { name: 'forms/', type: 'folder', desc: 'Composants de formulaires réutilisables' },
                        ]
                    },
                    {
                        name: 'pages/', type: 'folder', desc: 'Composants de pages (1 fichier = 1 route)', color: '#FFB300', children: [
                            { name: 'HomePage.tsx', type: 'file', desc: 'Page d\'accueil — route /' },
                            { name: 'AboutPage.tsx', type: 'file', desc: 'Page À propos — route /about' },
                            { name: 'NotFoundPage.tsx', type: 'file', desc: 'Page 404 — route par défaut pour les URLs invalides' },
                        ]
                    },
                    {
                        name: 'hooks/', type: 'folder', desc: 'Custom hooks React réutilisables', children: [
                            { name: 'useAuth.ts', type: 'file', desc: 'Hook pour gérer l\'authentification utilisateur' },
                            { name: 'useLocalStorage.ts', type: 'file', desc: 'Hook pour persister des données dans le localStorage' },
                            { name: 'useFetch.ts', type: 'file', desc: 'Hook pour les appels API avec loading/error states' },
                        ]
                    },
                    {
                        name: 'contexts/', type: 'folder', desc: 'Contextes React pour l\'état global', children: [
                            { name: 'AuthContext.tsx', type: 'file', desc: 'Contexte d\'authentification accessible partout dans l\'app' },
                            { name: 'ThemeContext.tsx', type: 'file', desc: 'Contexte pour le thème clair/sombre' },
                        ]
                    },
                    {
                        name: 'services/', type: 'folder', desc: 'Logique d\'appels API et services externes', children: [
                            { name: 'api.ts', type: 'file', desc: 'Configuration Axios/fetch avec base URL et interceptors' },
                            { name: 'authService.ts', type: 'file', desc: 'Fonctions login(), register(), logout()' },
                        ]
                    },
                    {
                        name: 'types/', type: 'folder', desc: 'Interfaces et types TypeScript', children: [
                            { name: 'user.ts', type: 'file', desc: 'interface User { id: string; name: string; email: string; }' },
                            { name: 'api.ts', type: 'file', desc: 'Types pour les réponses API : ApiResponse<T>, PaginatedResult<T>' },
                        ]
                    },
                    {
                        name: 'utils/', type: 'folder', desc: 'Fonctions utilitaires pures (helpers)', children: [
                            { name: 'formatDate.ts', type: 'file', desc: 'Formatage de dates (ex: "il y a 3 min")' },
                            { name: 'validators.ts', type: 'file', desc: 'Validation email, mot de passe, téléphone...' },
                            { name: 'cn.ts', type: 'file', desc: 'Utilitaire pour fusionner les classes CSS (clsx + twMerge)' },
                        ]
                    },
                    {
                        name: 'styles/', type: 'folder', desc: 'Fichiers CSS globaux et variables', children: [
                            { name: 'globals.css', type: 'file', desc: 'Styles globaux, reset CSS, variables CSS custom' },
                        ]
                    },
                    { name: 'App.tsx', type: 'file', desc: 'Composant racine — définit le Router et les providers', color: '#FF2ECC' },
                    { name: 'main.tsx', type: 'file', desc: 'Point d\'entrée — monte React dans le DOM (ReactDOM.createRoot)', color: '#FF2ECC' },
                ]
            },
            { name: 'package.json', type: 'file', desc: 'Dépendances, scripts (dev, build, test) et métadonnées du projet' },
            { name: 'tsconfig.json', type: 'file', desc: 'Configuration TypeScript : strict mode, paths aliases, target' },
            { name: 'vite.config.ts', type: 'file', desc: 'Configuration Vite : plugins, proxy API, path aliases' },
            { name: 'tailwind.config.js', type: 'file', desc: 'Configuration Tailwind : couleurs custom, fonts, breakpoints' },
            { name: '.env', type: 'file', desc: 'Variables d\'environnement (VITE_API_URL=...). Jamais commité !' },
            { name: '.gitignore', type: 'file', desc: 'Fichiers ignorés par Git : node_modules, dist, .env' },
            { name: 'README.md', type: 'file', desc: 'Documentation du projet : installation, scripts, architecture' },
        ],
        conventions: [
            { rule: 'PascalCase pour les composants', detail: 'UserCard.tsx, LoginPage.tsx — permet à React de les distinguer des éléments HTML' },
            { rule: 'camelCase pour les fichiers non-composants', detail: 'useAuth.ts, formatDate.ts, apiService.ts' },
            { rule: 'Un composant par fichier', detail: 'Facilite la navigation et le refactoring' },
            { rule: 'Index barrel exports', detail: 'components/ui/index.ts exporte tous les composants UI pour un import propre' },
            { rule: 'Colocalisation des tests', detail: 'Button.test.tsx à côté de Button.tsx, ou dans __tests__/' },
        ],
        tips: ['Utilisez @ comme alias pour src/ dans vite.config.ts', 'Groupez par feature si le projet grandit : features/auth/, features/dashboard/', 'Les fichiers .env.local surchargent .env en local']
    },
    {
        id: 'node', name: 'Node.js / Express API', color: '#339933', icon: '🟢', description: 'Structure MVC pour une API REST avec Express, Prisma et JWT.',
        tree: [
            {
                name: 'src/', type: 'folder', desc: 'Code source du serveur', color: '#00E676', children: [
                    {
                        name: 'config/', type: 'folder', desc: 'Configuration centralisée', children: [
                            { name: 'database.ts', type: 'file', desc: 'Connexion base de données (Prisma client, pool PostgreSQL)' },
                            { name: 'env.ts', type: 'file', desc: 'Validation des variables d\'env avec Zod' },
                            { name: 'cors.ts', type: 'file', desc: 'Origines autorisées pour les requêtes cross-origin' },
                        ]
                    },
                    {
                        name: 'controllers/', type: 'folder', desc: 'Reçoivent la requête HTTP et appellent le service', color: '#2ED9FF', children: [
                            { name: 'authController.ts', type: 'file', desc: 'login(), register(), logout() — gère req/res' },
                            { name: 'userController.ts', type: 'file', desc: 'getUsers(), getUserById(), updateUser(), deleteUser()' },
                        ]
                    },
                    {
                        name: 'services/', type: 'folder', desc: 'Logique métier pure (pas de req/res)', color: '#FFB300', children: [
                            { name: 'authService.ts', type: 'file', desc: 'Hashage bcrypt, génération JWT, vérification tokens' },
                            { name: 'userService.ts', type: 'file', desc: 'CRUD utilisateur, validation des données' },
                        ]
                    },
                    {
                        name: 'routes/', type: 'folder', desc: 'Définition des endpoints de l\'API', children: [
                            { name: 'authRoutes.ts', type: 'file', desc: 'POST /login, POST /register, POST /logout' },
                            { name: 'userRoutes.ts', type: 'file', desc: 'GET /users, GET /users/:id, PUT, DELETE' },
                            { name: 'index.ts', type: 'file', desc: 'Regroupe toutes les routes sous /api/v1/' },
                        ]
                    },
                    {
                        name: 'middlewares/', type: 'folder', desc: 'Fonctions exécutées avant les controllers', children: [
                            { name: 'auth.ts', type: 'file', desc: 'Vérifie le JWT dans le header Authorization' },
                            { name: 'validate.ts', type: 'file', desc: 'Valide le body/params avec un schéma Zod' },
                            { name: 'errorHandler.ts', type: 'file', desc: 'Catch global des erreurs, format JSON uniforme' },
                            { name: 'rateLimiter.ts', type: 'file', desc: 'Limite le nombre de requêtes par IP (anti-abus)' },
                        ]
                    },
                    {
                        name: 'models/', type: 'folder', desc: 'Modèles de données / schéma Prisma', children: [
                            { name: 'user.ts', type: 'file', desc: 'Interface User et fonctions de requête DB' },
                        ]
                    },
                    {
                        name: 'utils/', type: 'folder', desc: 'Fonctions utilitaires', children: [
                            { name: 'logger.ts', type: 'file', desc: 'Winston/Pino logger configuré pour dev et production' },
                            { name: 'errors.ts', type: 'file', desc: 'Classes d\'erreur custom : NotFoundError, ValidationError...' },
                        ]
                    },
                    {
                        name: 'types/', type: 'folder', desc: 'Types TypeScript partagés', children: [
                            { name: 'express.d.ts', type: 'file', desc: 'Extension du type Request Express (req.user, req.auth)' },
                        ]
                    },
                    { name: 'app.ts', type: 'file', desc: 'Configuration Express : middlewares, routes, error handler', color: '#FF2ECC' },
                    { name: 'server.ts', type: 'file', desc: 'Démarre le serveur HTTP sur le port configuré', color: '#FF2ECC' },
                ]
            },
            {
                name: 'prisma/', type: 'folder', desc: 'Schéma et migrations Prisma ORM', children: [
                    { name: 'schema.prisma', type: 'file', desc: 'Définition des tables, relations et types de données' },
                    { name: 'migrations/', type: 'folder', desc: 'Historique des changements de schéma DB' },
                    { name: 'seed.ts', type: 'file', desc: 'Données initiales pour le développement' },
                ]
            },
            {
                name: 'tests/', type: 'folder', desc: 'Tests unitaires et d\'intégration', children: [
                    { name: 'auth.test.ts', type: 'file', desc: 'Tests des routes auth avec Supertest' },
                    { name: 'setup.ts', type: 'file', desc: 'Config de test : base de données de test, cleanup' },
                ]
            },
            { name: '.env', type: 'file', desc: 'DATABASE_URL, JWT_SECRET, PORT — jamais dans Git !' },
            { name: '.env.example', type: 'file', desc: 'Template des variables d\'env (commité dans Git)' },
            { name: 'package.json', type: 'file', desc: 'Scripts : dev (nodemon), build, start, test, migrate' },
            { name: 'tsconfig.json', type: 'file', desc: 'Config TypeScript pour Node.js (target ES2022, module NodeNext)' },
            { name: 'Dockerfile', type: 'file', desc: 'Image Docker pour le déploiement en production' },
        ],
        conventions: [
            { rule: 'Architecture en couches', detail: 'Route → Controller → Service → Repository/Model — chaque couche a une responsabilité' },
            { rule: 'Le controller ne contient pas de logique métier', detail: 'Il parse la requête et appelle le service correspondant' },
            { rule: 'Validation à l\'entrée', detail: 'Middleware de validation Zod avant le controller' },
            { rule: 'Erreurs typées', detail: 'Classes NotFoundError, UnauthorizedError au lieu de throw new Error()' },
        ],
        tips: ['Séparez app.ts (config) et server.ts (listen) pour faciliter les tests', 'Utilisez .env.example comme documentation des variables requises', 'Versionnez vos API : /api/v1/users, /api/v2/users']
    },
    {
        id: 'fullstack', name: 'Full-Stack (Monorepo)', color: '#FF2ECC', icon: '🏗️', description: 'Structure monorepo pour un projet full-stack avec frontend React et backend Node.js.',
        tree: [
            {
                name: 'apps/', type: 'folder', desc: 'Applications déployables séparément', color: '#FF2ECC', children: [
                    { name: 'web/', type: 'folder', desc: 'Frontend React/Next.js (même structure que React ci-dessus)' },
                    { name: 'api/', type: 'folder', desc: 'Backend Express/Fastify (même structure que Node.js ci-dessus)' },
                    { name: 'admin/', type: 'folder', desc: 'Dashboard admin (optionnel)' },
                ]
            },
            {
                name: 'packages/', type: 'folder', desc: 'Code partagé entre les apps', color: '#FFB300', children: [
                    {
                        name: 'shared/', type: 'folder', desc: 'Types, constantes et utils partagés front/back', children: [
                            { name: 'types/', type: 'folder', desc: 'Interfaces User, Product... utilisées partout' },
                            { name: 'validators/', type: 'folder', desc: 'Schémas Zod partagés entre client et serveur' },
                            { name: 'constants/', type: 'folder', desc: 'Valeurs partagées : ROLES, STATUS, API_PATHS...' },
                        ]
                    },
                    { name: 'ui/', type: 'folder', desc: 'Bibliothèque de composants UI partagée (Storybook)' },
                    { name: 'config/', type: 'folder', desc: 'Configs partagées : ESLint, TypeScript, Prettier' },
                ]
            },
            { name: 'docker-compose.yml', type: 'file', desc: 'Orchestre les services : API, DB, Redis, Frontend' },
            { name: 'turbo.json', type: 'file', desc: 'Config Turborepo : pipelines build, dev, test' },
            { name: 'package.json', type: 'file', desc: 'Workspace root : scripts globaux et workspaces[]' },
            {
                name: '.github/', type: 'folder', desc: 'Config GitHub Actions CI/CD', children: [
                    {
                        name: 'workflows/', type: 'folder', desc: 'Pipelines automatisées', children: [
                            { name: 'ci.yml', type: 'file', desc: 'Tests, lint, build sur chaque Pull Request' },
                            { name: 'deploy.yml', type: 'file', desc: 'Déploiement automatique vers staging/production' },
                        ]
                    },
                ]
            },
        ],
        conventions: [
            { rule: 'Un workspace par application', detail: 'apps/web et apps/api ont chacun leur package.json' },
            { rule: 'Types partagés dans packages/shared', detail: 'Évite la duplication des interfaces entre front et back' },
            { rule: 'Scripts à la racine', detail: 'npm run dev lance tous les services en parallèle via Turborepo' },
        ],
        tips: ['Turborepo ou Nx accélèrent les builds en cache les résultats', 'docker-compose pour un environnement de dev identique pour toute l\'équipe', 'Les packages/ ne sont pas déployés, ils sont bundlés dans les apps/']
    },
    {
        id: 'python', name: 'Python / FastAPI', color: '#3776AB', icon: '🐍', description: 'Structure pour une API Python avec FastAPI, SQLAlchemy et Alembic.',
        tree: [
            {
                name: 'app/', type: 'folder', desc: 'Code source de l\'application', color: '#00E676', children: [
                    {
                        name: 'api/', type: 'folder', desc: 'Endpoints de l\'API', children: [
                            {
                                name: 'v1/', type: 'folder', desc: 'Version 1 de l\'API', children: [
                                    {
                                        name: 'routes/', type: 'folder', desc: 'Fichiers de routes par domaine', children: [
                                            { name: 'auth.py', type: 'file', desc: '@router.post("/login"), @router.post("/register")' },
                                            { name: 'users.py', type: 'file', desc: 'CRUD utilisateurs : GET, POST, PUT, DELETE' },
                                        ]
                                    },
                                ]
                            },
                            { name: 'deps.py', type: 'file', desc: 'Dépendances injectées (get_db, get_current_user)' },
                        ]
                    },
                    {
                        name: 'core/', type: 'folder', desc: 'Configuration centrale', children: [
                            { name: 'config.py', type: 'file', desc: 'Settings avec Pydantic BaseSettings (.env auto)' },
                            { name: 'security.py', type: 'file', desc: 'JWT, hashage bcrypt, OAuth2 scheme' },
                        ]
                    },
                    {
                        name: 'models/', type: 'folder', desc: 'Modèles SQLAlchemy (tables de la base)', children: [
                            { name: 'user.py', type: 'file', desc: 'class User(Base): id, name, email, hashed_password' },
                        ]
                    },
                    {
                        name: 'schemas/', type: 'folder', desc: 'Schémas Pydantic (validation des données)', children: [
                            { name: 'user.py', type: 'file', desc: 'UserCreate, UserUpdate, UserResponse — validation input/output' },
                        ]
                    },
                    {
                        name: 'services/', type: 'folder', desc: 'Logique métier', children: [
                            { name: 'user_service.py', type: 'file', desc: 'Fonctions CRUD, logique de validation avancée' },
                        ]
                    },
                    { name: 'main.py', type: 'file', desc: 'Point d\'entrée : app = FastAPI(), inclut les routers', color: '#FF2ECC' },
                ]
            },
            {
                name: 'alembic/', type: 'folder', desc: 'Migrations de base de données', children: [
                    { name: 'versions/', type: 'folder', desc: 'Fichiers de migration auto-générés' },
                    { name: 'env.py', type: 'file', desc: 'Configuration Alembic pour SQLAlchemy' },
                ]
            },
            {
                name: 'tests/', type: 'folder', desc: 'Tests avec pytest', children: [
                    { name: 'test_auth.py', type: 'file', desc: 'Tests des endpoints d\'authentification' },
                    { name: 'conftest.py', type: 'file', desc: 'Fixtures pytest : client de test, DB de test' },
                ]
            },
            { name: 'requirements.txt', type: 'file', desc: 'Dépendances Python (ou pyproject.toml avec Poetry)' },
            { name: '.env', type: 'file', desc: 'DATABASE_URL, SECRET_KEY, DEBUG=True' },
            { name: 'Dockerfile', type: 'file', desc: 'Image Docker basée sur python:3.12-slim' },
            { name: 'README.md', type: 'file', desc: 'Installation, activation du venv, lancement' },
        ],
        conventions: [
            { rule: 'models/ = tables DB, schemas/ = validation', detail: 'Ne pas confondre : models pour SQLAlchemy, schemas pour Pydantic' },
            { rule: 'Dependency Injection', detail: 'FastAPI injecte automatiquement les dépendances via Depends()' },
            { rule: 'Versioning des routes', detail: '/api/v1/users permet l\'évolution sans casser les clients' },
        ],
        tips: ['Utilisez Poetry au lieu de pip pour la gestion des dépendances', 'Pydantic valide automatiquement les données entrantes et sortantes', 'Alembic détecte les changements de modèles et génère les migrations']
    },
    {
        id: 'nextjs', name: 'Next.js (App Router)', color: '#F4F2F7', icon: '▲', description: 'Structure avec le App Router de Next.js 14+ (Server Components, API routes).',
        tree: [
            {
                name: 'app/', type: 'folder', desc: 'Routes automatiques basées sur le système de fichiers', color: '#F4F2F7', children: [
                    { name: 'layout.tsx', type: 'file', desc: 'Layout racine : HTML, providers, fonts, metadata globale', color: '#2ED9FF' },
                    { name: 'page.tsx', type: 'file', desc: 'Page d\'accueil — route /', color: '#2ED9FF' },
                    { name: 'loading.tsx', type: 'file', desc: 'UI de chargement affichée pendant le fetch (Suspense)' },
                    { name: 'error.tsx', type: 'file', desc: 'Boundary d\'erreur — affiche un fallback en cas d\'erreur' },
                    { name: 'not-found.tsx', type: 'file', desc: 'Page 404 personnalisée' },
                    {
                        name: '(auth)/', type: 'folder', desc: 'Route group — layout auth sans affecter l\'URL', children: [
                            { name: 'login/', type: 'folder', desc: '/login', children: [{ name: 'page.tsx', type: 'file', desc: 'Formulaire de connexion' }] },
                            { name: 'register/', type: 'folder', desc: '/register', children: [{ name: 'page.tsx', type: 'file', desc: 'Formulaire d\'inscription' }] },
                            { name: 'layout.tsx', type: 'file', desc: 'Layout centré sans nav bar pour les pages auth' },
                        ]
                    },
                    {
                        name: 'dashboard/', type: 'folder', desc: '/dashboard', children: [
                            { name: 'page.tsx', type: 'file', desc: 'Page dashboard — Server Component par défaut' },
                            {
                                name: '[id]/', type: 'folder', desc: 'Route dynamique : /dashboard/123', children: [
                                    { name: 'page.tsx', type: 'file', desc: 'Page avec paramètre : params.id' },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'api/', type: 'folder', desc: 'Route Handlers (API côté serveur)', children: [
                            {
                                name: 'users/', type: 'folder', desc: '/api/users', children: [
                                    { name: 'route.ts', type: 'file', desc: 'export async function GET/POST(request) { ... }' },
                                ]
                            },
                        ]
                    },
                    { name: 'globals.css', type: 'file', desc: 'Styles globaux importés dans layout.tsx' },
                ]
            },
            {
                name: 'components/', type: 'folder', desc: 'Composants React partagés', children: [
                    { name: 'ui/', type: 'folder', desc: 'Button, Card, Input... (shadcn/ui compatible)' },
                    { name: 'providers.tsx', type: 'file', desc: 'Client Component qui wrape les providers (Theme, Auth...)' },
                ]
            },
            {
                name: 'lib/', type: 'folder', desc: 'Logique partagée et utilitaires', children: [
                    { name: 'db.ts', type: 'file', desc: 'Client Prisma singleton' },
                    { name: 'auth.ts', type: 'file', desc: 'NextAuth configuration et helpers' },
                    { name: 'utils.ts', type: 'file', desc: 'Fonctions utilitaires (cn, formatDate...)' },
                ]
            },
            { name: 'next.config.ts', type: 'file', desc: 'Configuration Next.js : images, redirects, env' },
            { name: 'middleware.ts', type: 'file', desc: 'Middleware Edge : auth check, redirections, i18n' },
        ],
        conventions: [
            { rule: 'Dossier = Route', detail: 'app/about/page.tsx → /about automatiquement' },
            { rule: 'Server Components par défaut', detail: 'Ajouter "use client" uniquement si le composant utilise des hooks ou events' },
            { rule: '(groupes) pour les layouts', detail: '(auth) groupe les pages sans affecter l\'URL' },
            { rule: '[dynamique] pour les paramètres', detail: '[id]/page.tsx capture l\'ID dans l\'URL' },
        ],
        tips: ['Server Components = pas de JS au client → plus rapide', 'loading.tsx active automatiquement Suspense pour le fetch', 'middleware.ts s\'exécute avant chaque requête (auth, i18n)']
    },
];

function TreeNode({ item, depth = 0 }: { item: TreeItem; depth?: number }) {
    const [isOpen, setIsOpen] = useState(depth < 2);
    const isFolder = item.type === 'folder';
    const hasChildren = isFolder && item.children && item.children.length > 0;
    return (
        <div className="select-none">
            <div className={`flex items-start gap-2 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group`}
                style={{ paddingLeft: `${depth * 20 + 8}px` }} onClick={() => hasChildren && setIsOpen(!isOpen)}>
                {hasChildren && <ChevronRight className={`w-3.5 h-3.5 mt-1 text-[#B8B2C6] transition-transform flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />}
                {!hasChildren && <span className="w-3.5 flex-shrink-0" />}
                {isFolder ? <FolderOpen className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color || '#FFB300' }} /> : <FileCode className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: item.color || '#B8B2C6' }} />}
                <div className="flex-1 min-w-0">
                    <span className={`font-mono text-sm ${isFolder ? 'font-bold' : ''}`} style={{ color: item.color || (isFolder ? '#F4F2F7' : '#B8B2C6') }}>{item.name}</span>
                    <span className="text-xs text-[#8A849A] ml-2 hidden sm:inline">{item.desc}</span>
                </div>
            </div>
            {isOpen && hasChildren && <div>{item.children!.map((child, i) => <TreeNode key={i} item={child} depth={depth + 1} />)}</div>}
        </div>
    );
}

export default function ProjectStructure({ className = '' }: ProjectStructureProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeProject, setActiveProject] = useState('react');
    const [activeTab, setActiveTab] = useState<'tree' | 'conventions' | 'tips'>('tree');
    const localTriggersRef = useRef<ScrollTrigger[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const ctx = gsap.context(() => {
            section.querySelectorAll('.struct-card').forEach((card) => {
                const st = ScrollTrigger.create({
                    trigger: card, start: 'top 85%', end: 'top 55%', scrub: 0.4,
                    onUpdate: (self) => { gsap.set(card, { y: 40 - self.progress * 40, opacity: self.progress }); }
                });
                localTriggersRef.current.push(st);
            });
        }, section);
        return () => { localTriggersRef.current.forEach(st => st.kill()); localTriggersRef.current = []; ctx.revert(); };
    }, []);

    const current = projectStructures.find(p => p.id === activeProject)!;

    return (
        <section ref={sectionRef} id="project-structure" className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] bg-[#FFB300]/6 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] bg-[#2ED9FF]/5 rounded-full blur-[150px]" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="mono text-xs tracking-[0.2em] text-[#FFB300] uppercase mb-4 block">📁 Architecture</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
                        Structure des <span className="text-[#FFB300]">Dossiers</span> & <span className="text-[#2ED9FF]">Fichiers</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Organisez vos projets comme un professionnel. Chaque fichier et dossier a un rôle précis — découvrez pourquoi et comment les structurer.
                    </p>
                </div>

                {/* Project Type Selector */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {projectStructures.map(p => (
                        <button key={p.id} onClick={() => { setActiveProject(p.id); setActiveTab('tree'); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeProject === p.id ? 'text-white scale-105 shadow-lg' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`} style={{
                                    backgroundColor: activeProject === p.id ? current.id === p.id ? p.color : p.color : undefined,
                                    color: activeProject === p.id && (p.color === '#F4F2F7') ? '#07040A' : undefined
                                }}>
                            <span className="text-lg">{p.icon}</span> {p.name}
                        </button>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-6">
                    {([
                        { id: 'tree', label: 'Arborescence', icon: FolderTree },
                        { id: 'conventions', label: 'Conventions', icon: BookOpen },
                        { id: 'tips', label: 'Conseils', icon: Lightbulb },
                    ] as const).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.id ? 'text-white' : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                                }`} style={{
                                    backgroundColor: activeTab === tab.id ? current.color : undefined,
                                    color: activeTab === tab.id && current.color === '#F4F2F7' ? '#07040A' : undefined
                                }}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Description */}
                <div className="struct-card glass-card-sm p-4 mb-6 text-center">
                    <p className="text-sm text-[#B8B2C6]"><span className="text-lg mr-2">{current.icon}</span> {current.description}</p>
                </div>

                {/* Tree View */}
                {activeTab === 'tree' && (
                    <div className="struct-card glass-card p-4 lg:p-6 mb-8">
                        <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
                            <FolderTree className="w-5 h-5" style={{ color: current.color }} /> 📂 Arborescence — {current.name}
                        </h3>
                        <div className="bg-black/30 rounded-xl p-3 font-mono text-sm max-h-[70vh] overflow-y-auto">
                            <div className="flex items-center gap-2 px-2 py-1.5 mb-2 border-b border-white/10">
                                <FolderOpen className="w-4 h-4 text-[#FFB300]" />
                                <span className="font-bold text-[#F4F2F7]">mon-projet/</span>
                                <span className="text-xs text-[#8A849A]">— racine du projet</span>
                            </div>
                            {current.tree.map((item, i) => <TreeNode key={i} item={item} depth={1} />)}
                        </div>
                        <p className="text-xs text-[#8A849A] mt-3 text-center">💡 Cliquez sur les dossiers pour les ouvrir/fermer. Survolez pour voir les descriptions.</p>
                    </div>
                )}

                {/* Conventions */}
                {activeTab === 'conventions' && (
                    <div className="struct-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" style={{ color: current.color }} /> 📏 Conventions — {current.name}
                        </h3>
                        <div className="space-y-4">
                            {current.conventions.map((c, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg border-l-4" style={{ borderColor: current.color }}>
                                    <p className="font-medium text-[#F4F2F7] text-sm mb-1">📌 {c.rule}</p>
                                    <p className="text-sm text-[#B8B2C6]">{c.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                {activeTab === 'tips' && (
                    <div className="struct-card glass-card p-6 lg:p-8 mb-8">
                        <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-[#FFB300]" /> 💡 Conseils Pro — {current.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {current.tips.map((tip, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-lg flex gap-3">
                                    <span className="text-lg">💡</span>
                                    <p className="text-sm text-[#B8B2C6]">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* General Best Practices */}
                <div className="struct-card glass-card-sm p-6">
                    <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#2ED9FF]" /> ⚙️ Fichiers Essentiels à Connaître
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            { file: 'package.json', desc: 'Le "passeport" du projet : nom, version, dépendances, scripts', color: '#339933' },
                            { file: 'tsconfig.json', desc: 'Config TypeScript : strict, paths, module system', color: '#3178C6' },
                            { file: '.gitignore', desc: 'Liste les fichiers que Git doit ignorer (node_modules, .env)', color: '#F05032' },
                            { file: '.env', desc: 'Variables secrètes et de configuration. JAMAIS dans Git !', color: '#FF2ECC' },
                            { file: 'README.md', desc: 'Documentation : comment installer, lancer, contribuer', color: '#F4F2F7' },
                            { file: 'Dockerfile', desc: 'Recette pour construire l\'image de production', color: '#2ED9FF' },
                            { file: '.eslintrc', desc: 'Règles de qualité et cohérence du code', color: '#4B32C3' },
                            { file: '.prettierrc', desc: 'Formatage automatique du code (indentation, guillemets)', color: '#F7B93E' },
                            { file: 'docker-compose.yml', desc: 'Orchestre plusieurs services (app, DB, cache) ensemble', color: '#00E676' },
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg">
                                <code className="text-sm font-mono font-bold" style={{ color: item.color }}>{item.file}</code>
                                <p className="text-xs text-[#B8B2C6] mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
