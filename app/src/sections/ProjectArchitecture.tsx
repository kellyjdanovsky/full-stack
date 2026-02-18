import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Folder, FolderOpen, Database, 
  Cloud, BarChart3, BookOpen, Terminal, ChevronRight,
  CheckCircle2, AlertTriangle, Lightbulb, Layers, GitBranch
} from 'lucide-react';

interface ProjectArchitectureProps {
  className?: string;
}

const folderStructure = [
  {
    name: '.github/',
    type: 'folder',
    icon: Folder,
    color: '#B8B2C6',
    children: [
      { name: 'workflows/', desc: 'Pipelines CI/CD' },
      { name: 'ISSUE_TEMPLATE/', desc: 'Templates d\'issues' },
      { name: 'CODEOWNERS', desc: 'Responsables du code' },
    ]
  },
  {
    name: 'apps/',
    type: 'folder',
    icon: FolderOpen,
    color: '#2ED9FF',
    children: [
      { name: 'web/', desc: 'Application frontend' },
      { name: 'mobile/', desc: 'Application mobile' },
      { name: 'admin/', desc: 'Back-office' },
    ]
  },
  {
    name: 'services/',
    type: 'folder',
    icon: FolderOpen,
    color: '#00E676',
    children: [
      { name: 'api-gateway/', desc: 'Point d\'entrée API' },
      { name: 'auth-service/', desc: 'Authentification' },
      { name: 'user-service/', desc: 'Gestion utilisateurs' },
      { name: 'notification-service/', desc: 'Notifications' },
    ]
  },
  {
    name: 'ai/',
    type: 'folder',
    icon: FolderOpen,
    color: '#FF2ECC',
    children: [
      { name: 'models/', desc: 'Modèles ML' },
      { name: 'pipelines/', desc: 'Pipelines de données' },
      { name: 'serving/', desc: 'Inference API' },
      { name: 'mlops/', desc: 'MLOps et monitoring' },
    ]
  },
  {
    name: 'packages/',
    type: 'folder',
    icon: FolderOpen,
    color: '#FFB300',
    children: [
      { name: 'shared-types/', desc: 'Types partagés' },
      { name: 'shared-utils/', desc: 'Utilitaires' },
      { name: 'ui-kit/', desc: 'Design system' },
      { name: 'api-client/', desc: 'Client API typé' },
    ]
  },
  {
    name: 'infrastructure/',
    type: 'folder',
    icon: FolderOpen,
    color: '#7B2D8E',
    children: [
      { name: 'terraform/', desc: 'Infrastructure as Code' },
      { name: 'kubernetes/', desc: 'Config K8s' },
      { name: 'docker/', desc: 'Docker Compose' },
    ]
  },
  {
    name: 'database/',
    type: 'folder',
    icon: Database,
    color: '#FF2ECC',
    children: [
      { name: 'migrations/', desc: 'Migrations de schéma' },
      { name: 'seeds/', desc: 'Données initiales' },
      { name: 'schemas/', desc: 'Définitions de schéma' },
    ]
  },
  {
    name: 'monitoring/',
    type: 'folder',
    icon: BarChart3,
    color: '#00E676',
    children: [
      { name: 'prometheus/', desc: 'Métriques' },
      { name: 'grafana/', desc: 'Dashboards' },
      { name: 'logging/', desc: 'Configuration logs' },
      { name: 'tracing/', desc: 'Distributed tracing' },
    ]
  },
];

const architecturePatterns = [
  {
    title: 'Pattern Controller / Service / Repository',
    description: 'Architecture en couches pour séparer les responsabilités',
    whenToUse: 'Applications CRUD classiques, équipes juniors, besoin de simplicité',
    benefits: ['Séparation claire des responsabilités', 'Testabilité', 'Code maintenable'],
    code: `// Controller - Porte d'entrée
class UserController {
  async getUser(req, res) {
    const user = await userService.findById(req.params.id);
    res.json(user);
  }
}

// Service - Logique métier
class UserService {
  async findById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError();
    return user;
  }
}

// Repository - Accès données
class UserRepository {
  async findById(id) {
    return await db.users.findOne({ where: { id } });
  }
}`
  },
  {
    title: 'Organisation par Feature (Frontend)',
    description: 'Structure verticale où chaque feature contient tous ses éléments',
    whenToUse: 'Applications complexes, features indépendantes, équipes multiples',
    benefits: ['Cohésion forte', 'Scalabilité organisationnelle', 'Isolation des features'],
    code: `src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── AuthModal.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useLogin.ts
├── services/
│   └── authApi.ts
├── store/
│   └── authSlice.ts
├── types/
│   └── auth.types.ts
└── index.ts          # Barrel export`
  },
  {
    title: 'API Gateway Pattern',
    description: 'Point d\'entrée unique pour toutes les requêtes clients',
    whenToUse: 'Microservices, besoin de centralisation, sécurité unifiée',
    benefits: ['Single entry point', 'Cross-cutting concerns', 'Protocol translation'],
    code: `// Flux de requête
Client → API Gateway → Services

// Responsabilités Gateway:
1. Rate limiting
2. Authentification (JWT validation)
3. Routing (/users/* → user-service)
4. Load balancing
5. Request/Response transformation
6. Logging centralisé`
  },
  {
    title: 'Event-Driven Architecture',
    description: 'Communication asynchrone via événements',
    whenToUse: 'Systèmes distribués, forte charge, besoin de résilience',
    benefits: ['Découplage', 'Scalabilité', 'Résilience aux pannes'],
    code: `// Service A émet un événement
await eventBus.publish('user.created', { userId, email });

// Service B écoute et réagit
eventBus.subscribe('user.created', async (event) => {
  await sendWelcomeEmail(event.data.email);
});

// Avantages:
// - Services indépendants
// - Pas de point de défaillance unique
// - Facile à scaler individuellement`
  }
];

const codeQualityPractices = [
  {
    category: 'Style & Formatting',
    practices: [
      { name: 'ESLint + Prettier', desc: 'Linting et formatting automatique' },
      { name: 'Conventional Commits', desc: 'Messages de commit standardisés' },
      { name: 'EditorConfig', desc: 'Configuration cohérente entre IDEs' }
    ]
  },
  {
    category: 'Testing',
    practices: [
      { name: 'Unit Tests', desc: 'Jest/Vitest - 80%+ coverage' },
      { name: 'Integration Tests', desc: 'Test des interactions entre modules' },
      { name: 'E2E Tests', desc: 'Cypress/Playwright - parcours critiques' }
    ]
  },
  {
    category: 'Documentation',
    practices: [
      { name: 'README', desc: 'Setup, architecture, contribution guide' },
      { name: 'API Docs', desc: 'OpenAPI/Swagger pour les endpoints' },
      { name: 'Architecture Decision Records', desc: 'Documenter les choix techniques' }
    ]
  },
  {
    category: 'Security',
    practices: [
      { name: 'Secrets Management', desc: 'Vault, AWS Secrets Manager' },
      { name: 'Dependency Scanning', desc: 'Snyk, Dependabot' },
      { name: 'SAST/DAST', desc: 'SonarQube, CodeQL' }
    ]
  }
];

const commonAntiPatterns = [
  {
    antipattern: 'God Object / God Class',
    description: 'Une classe qui fait trop de choses',
    solution: 'Appliquer Single Responsibility Principle, découper en services',
    example: 'UserManager qui gère auth, profil, préférences, historique...'
  },
  {
    antipattern: 'Spaghetti Code',
    description: 'Code sans structure, dépendances chaotiques',
    solution: 'Adopter une architecture claire (MVC, Clean Architecture)',
    example: 'Fonctions de 500 lignes avec callbacks imbriqués'
  },
  {
    antipattern: 'Magic Numbers/Strings',
    description: 'Valeurs hardcodées sans explication',
    solution: 'Utiliser des constantes nommées et documentées',
    example: 'if (status === 3) // Que signifie 3 ?'
  },
  {
    antipattern: 'Premature Optimization',
    description: 'Optimiser avant d\'avoir des problèmes de perf',
    solution: 'Mesurer d\'abord, optimiser les vrais goulots d\'étranglement',
    example: 'Caching complexe pour une route appelée 10x/jour'
  }
];

const learningResources = [
  {
    type: 'Livres',
    resources: [
      { name: 'Clean Code - Robert C. Martin', level: 'Tous niveaux' },
      { name: 'Clean Architecture - Robert C. Martin', level: 'Intermédiaire' },
      { name: 'Design Patterns - Gang of Four', level: 'Avancé' },
      { name: 'Building Microservices - Sam Newman', level: 'Avancé' }
    ]
  },
  {
    type: 'Cours en ligne',
    resources: [
      { name: 'Frontend Masters - System Design', level: 'Avancé' },
      { name: 'Pluralsight - Software Architecture', level: 'Intermédiaire' },
      { name: 'Coursera - Software Design', level: 'Débutant' }
    ]
  }
];

export default function ProjectArchitecture({ className = '' }: ProjectArchitectureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['apps/', 'services/']);
  const [activePattern, setActivePattern] = useState(0);
  const [activeTab, setActiveTab] = useState<'patterns' | 'quality' | 'antipatterns'>('patterns');
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.arch-card');
      cards.forEach((card) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.4,
          onUpdate: (self) => {
            gsap.set(card, {
              y: 40 - self.progress * 40,
              opacity: self.progress
            });
          }
        });
        localTriggersRef.current.push(st);
      });
    }, section);

    return () => {
      localTriggersRef.current.forEach(st => st.kill());
      localTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const toggleFolder = (name: string) => {
    setExpandedFolders(prev => 
      prev.includes(name) 
        ? prev.filter(f => f !== name)
        : [...prev, name]
    );
  };

  return (
    <section
      ref={sectionRef}
      id="project-architecture"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[40vw] h-[40vw] bg-[#00E676]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#00E676] uppercase mb-4 block">
            Partie 3
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Architecture de{' '}
            <span className="text-[#00E676]">Projet</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-2xl mx-auto">
            Structure professionnelle complète pour un projet full-stack moderne 
            avec microservices, IA/ML, et infrastructure as code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Folder Structure */}
          <div className="arch-card glass-card p-6">
            <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#00E676]" />
              Structure de Dossiers
            </h3>
            
            <div className="space-y-1 font-mono text-sm">
              <div className="text-[#B8B2C6]/60 mb-2">project-root/</div>
              {folderStructure.map((folder) => (
                <div key={folder.name}>
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="flex items-center gap-2 w-full text-left hover:bg-white/5 rounded px-2 py-1 transition-colors"
                  >
                    <ChevronRight 
                      className={`w-3 h-3 transition-transform ${expandedFolders.includes(folder.name) ? 'rotate-90' : ''}`} 
                    />
                    <folder.icon className="w-4 h-4" style={{ color: folder.color }} />
                    <span style={{ color: folder.color }}>{folder.name}</span>
                  </button>
                  
                  {expandedFolders.includes(folder.name) && (
                    <div className="ml-6 space-y-1">
                      {folder.children.map((child) => (
                        <div key={child.name} className="flex items-center gap-2 text-[#B8B2C6]">
                          <Folder className="w-3 h-3 text-[#B8B2C6]/50" />
                          <span>{child.name}</span>
                          <span className="text-xs text-[#B8B2C6]/50"># {child.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Patterns */}
          <div className="arch-card glass-card p-6">
            <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2ED9FF]" />
              Patterns Architecturaux
            </h3>
            
            {/* Pattern Selector */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {architecturePatterns.map((pattern, i) => (
                <button
                  key={i}
                  onClick={() => setActivePattern(i)}
                  className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
                    activePattern === i
                      ? 'bg-[#2ED9FF] text-white'
                      : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                  }`}
                >
                  {pattern.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Pattern Content */}
            <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
              <p className="text-sm text-[#B8B2C6] mb-2">
                {architecturePatterns[activePattern].description}
              </p>
              <p className="text-xs text-[#2ED9FF] mb-3">
                Quand l'utiliser: {architecturePatterns[activePattern].whenToUse}
              </p>
              <div className="mb-3">
                <p className="text-xs text-[#B8B2C6]/60 mb-1">Bénéfices:</p>
                <div className="flex flex-wrap gap-1">
                  {architecturePatterns[activePattern].benefits.map((b, i) => (
                    <span key={i} className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded">
                      + {b}
                    </span>
                  ))}
                </div>
              </div>
              <pre className="text-xs text-[#2ED9FF] font-mono whitespace-pre">
                {architecturePatterns[activePattern].code}
              </pre>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="arch-card glass-card p-6 mb-12">
          <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
            {[
              { id: 'patterns', label: 'Patterns', icon: Layers },
              { id: 'quality', label: 'Qualité du Code', icon: CheckCircle2 },
              { id: 'antipatterns', label: 'Anti-patterns', icon: AlertTriangle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-[#F4F2F7]'
                    : 'text-[#B8B2C6] hover:text-[#F4F2F7]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'quality' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {codeQualityPractices.map((category) => (
                <div key={category.category} className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-3">{category.category}</h4>
                  <ul className="space-y-2">
                    {category.practices.map((practice) => (
                      <li key={practice.name} className="text-sm">
                        <span className="text-[#B8B2C6]">{practice.name}</span>
                        <p className="text-xs text-[#B8B2C6]/60">{practice.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'antipatterns' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonAntiPatterns.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FF2ECC] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#F4F2F7] mb-1">{item.antipattern}</h4>
                      <p className="text-sm text-[#B8B2C6] mb-2">{item.description}</p>
                      <p className="text-xs text-[#00E676] mb-1">
                        Solution: {item.solution}
                      </p>
                      <p className="text-xs text-[#B8B2C6]/60">
                        Ex: {item.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Terminal,
                  title: 'Organisation par Feature',
                  desc: 'Chaque feature contient ses composants, hooks, services et types. Dépendances uniquement vers shared.',
                  color: '#2ED9FF'
                },
                {
                  icon: Database,
                  title: 'Séparation des Responsabilités',
                  desc: 'Controller → Service → Repository. Chaque couche a un rôle précis et testable indépendamment.',
                  color: '#00E676'
                },
                {
                  icon: Cloud,
                  title: 'Infrastructure as Code',
                  desc: 'Terraform pour le cloud, Kubernetes pour l\'orchestration, Docker pour la containerisation.',
                  color: '#FF2ECC'
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h4 className="font-bold text-[#F4F2F7] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#B8B2C6]">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monorepo Benefits */}
        <div className="arch-card glass-card-sm p-6 mb-12">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#FFB300]" />
            Avantages du Monorepo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Code Sharing', desc: 'Types et utilitaires partagés entre apps' },
              { title: 'Atomic Changes', desc: 'Modifier plusieurs packages en un seul commit' },
              { title: 'Single CI/CD', desc: 'Pipeline unifiée pour tous les projets' },
              { title: 'Visibility', desc: 'Vue d\'ensemble de tout le codebase' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg">
                <p className="font-medium text-[#F4F2F7] text-sm">{item.title}</p>
                <p className="text-xs text-[#B8B2C6]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="arch-card glass-card-sm p-6">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#2ED9FF]" />
            Ressources d'Apprentissage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningResources.map((category) => (
              <div key={category.type}>
                <h4 className="font-medium text-[#F4F2F7] mb-3">{category.type}</h4>
                <ul className="space-y-2">
                  {category.resources.map((res) => (
                    <li key={res.name} className="text-sm flex items-center justify-between">
                      <span className="text-[#B8B2C6]">{res.name}</span>
                      <span className="text-xs text-[#B8B2C6]/60">{res.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
