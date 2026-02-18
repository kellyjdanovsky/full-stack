import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, Server, Database, Shield, 
  GitBranch, Cloud, Brain, Code2, BookOpen, Clock, Target, Lightbulb
} from 'lucide-react';

interface FullStackOverviewProps {
  className?: string;
}

const layers = [
  {
    name: 'Frontend',
    icon: Layers,
    color: '#2ED9FF',
    description: 'Interface utilisateur visible et interactive',
    responsibilities: [
      'Affichage des données visuelles',
      'Gestion des interactions utilisateur',
      'Responsive design',
      'Optimisation des performances perçues',
      'Accessibilité'
    ],
    technologies: ['React', 'Vue', 'Angular', 'TypeScript', 'Tailwind CSS'],
    learningPath: {
      beginner: ['HTML/CSS', 'JavaScript', 'Responsive Design', 'Git Basics'],
      intermediate: ['React/Vue', 'State Management', 'API Integration', 'Testing'],
      advanced: ['Performance', 'SSR/SSG', 'Micro-frontends', 'WebAssembly']
    },
    timeToLearn: '6-12 mois',
    keyConcepts: ['Virtual DOM', 'Components', 'Hooks', 'Reactive Programming']
  },
  {
    name: 'Backend',
    icon: Server,
    color: '#00E676',
    description: 'Logique métier et traitement des requêtes',
    responsibilities: [
      'Réception et validation des requêtes',
      'Application de la logique métier',
      'Orchestration des services',
      'Gestion des transactions',
      'Génération des réponses'
    ],
    technologies: ['Node.js', 'Python/FastAPI', 'Go', 'Java/Spring', 'Rust'],
    learningPath: {
      beginner: ['HTTP/REST', 'Language choisi', 'Basic Routing', 'JSON'],
      intermediate: ['Middleware', 'Authentication', 'Database ORM', 'Error Handling'],
      advanced: ['Microservices', 'Event-Driven', 'CQRS', 'Distributed Systems']
    },
    timeToLearn: '8-15 mois',
    keyConcepts: ['REST API', 'Middleware', 'Sessions', 'Concurrency']
  },
  {
    name: 'API',
    icon: Code2,
    color: '#FFB300',
    description: 'Interface de communication entre composants',
    responsibilities: [
      'Définition des contrats d\'interface',
      'Documentation des endpoints',
      'Versioning et rétrocompatibilité',
      'Rate limiting et quotas',
      'Transformation des formats'
    ],
    technologies: ['REST', 'GraphQL', 'gRPC', 'WebSocket', 'tRPC'],
    learningPath: {
      beginner: ['REST Principles', 'HTTP Methods', 'Status Codes', 'JSON/XML'],
      intermediate: ['GraphQL', 'API Versioning', 'OpenAPI/Swagger', 'Postman'],
      advanced: ['gRPC', 'WebSockets', 'API Gateway', 'Rate Limiting']
    },
    timeToLearn: '3-6 mois',
    keyConcepts: ['Endpoints', 'Resources', 'CRUD', 'Idempotency']
  },
  {
    name: 'Database',
    icon: Database,
    color: '#FF2ECC',
    description: 'Persistance et organisation des données',
    responsibilities: [
      'Stockage structuré des données',
      'Garanties ACID',
      'Requêtes et indexation',
      'Réplication et backups',
      'Optimisation des performances'
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Vector DB'],
    learningPath: {
      beginner: ['SQL Basics', 'CRUD Operations', 'Relationships', 'Indexes'],
      intermediate: ['Joins', 'Transactions', 'Normalization', 'Query Optimization'],
      advanced: ['Sharding', 'Replication', 'NoSQL', 'Vector Databases']
    },
    timeToLearn: '6-12 mois',
    keyConcepts: ['ACID', 'Normalization', 'Indexing', 'Sharding']
  },
  {
    name: 'Infrastructure',
    icon: Cloud,
    color: '#7B2D8E',
    description: 'Socle physique et virtuel de l\'application',
    responsibilities: [
      'Compute et scaling',
      'Stockage de fichiers',
      'Réseau et connectivité',
      'Sécurité périmètre',
      'Haute disponibilité'
    ],
    technologies: ['Docker', 'Kubernetes', 'AWS/GCP/Azure', 'CDN', 'Serverless'],
    learningPath: {
      beginner: ['Linux Basics', 'Cloud Fundamentals', 'Docker', 'SSH'],
      intermediate: ['Kubernetes', 'Load Balancing', 'Auto-scaling', 'Networking'],
      advanced: ['Multi-cloud', 'Service Mesh', 'Edge Computing', 'FinOps']
    },
    timeToLearn: '9-18 mois',
    keyConcepts: ['Containers', 'Orchestration', 'IaC', 'Scalability']
  },
  {
    name: 'DevOps/CI-CD',
    icon: GitBranch,
    color: '#2ED9FF',
    description: 'Automatisation du développement au déploiement',
    responsibilities: [
      'Intégration continue',
      'Déploiement continu',
      'Infrastructure as Code',
      'Observabilité',
      'GitOps'
    ],
    technologies: ['GitHub Actions', 'GitLab CI', 'Terraform', 'ArgoCD', 'Prometheus'],
    learningPath: {
      beginner: ['Git', 'GitHub Actions', 'Basic Pipelines', 'Docker Compose'],
      intermediate: ['Terraform', 'Kubernetes', 'Monitoring', 'Logging'],
      advanced: ['GitOps', 'Chaos Engineering', 'SRE Practices', 'Platform Engineering']
    },
    timeToLearn: '6-12 mois',
    keyConcepts: ['Pipeline', 'IaC', 'GitOps', 'Observability']
  },
  {
    name: 'Sécurité',
    icon: Shield,
    color: '#00E676',
    description: 'Protection à chaque niveau de l\'architecture',
    responsibilities: [
      'Authentification et autorisation',
      'Chiffrement des données',
      'Validation des entrées',
      'Audit et monitoring',
      'Conformité réglementaire'
    ],
    technologies: ['JWT/OAuth', 'WAF', 'Vault', 'SAST/DAST', 'RBAC/ABAC'],
    learningPath: {
      beginner: ['HTTPS/TLS', 'Password Hashing', 'XSS/CSRF', 'OWASP Top 10'],
      intermediate: ['OAuth 2.0', 'JWT', 'CORS', 'Input Validation'],
      advanced: ['Zero Trust', 'Penetration Testing', 'Compliance', 'Threat Modeling']
    },
    timeToLearn: 'Ongoing',
    keyConcepts: ['CIA Triad', 'AuthN/AuthZ', 'Encryption', 'Vulnerabilities']
  },
  {
    name: 'IA/ML',
    icon: Brain,
    color: '#FF2ECC',
    description: 'Capacités intelligentes et prédictives',
    responsibilities: [
      'Inférence en temps réel',
      'Traitement batch',
      'Feature engineering',
      'Monitoring des modèles',
      'Reentraînement'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Vector DB'],
    learningPath: {
      beginner: ['Python', 'Pandas/NumPy', 'Basic ML', 'API Integration'],
      intermediate: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
      advanced: ['LLMs', 'RAG', 'Fine-tuning', 'Model Optimization']
    },
    timeToLearn: '12-24 mois',
    keyConcepts: ['Supervised Learning', 'Neural Networks', 'Embeddings', 'Inference']
  }
];

const commonMistakes = [
  {
    mistake: 'Apprendre trop de technologies en même temps',
    solution: 'Focus sur une stack (ex: MERN) avant d\'explorer d\'autres',
    tip: 'Maîtriser fondamentalement > connaître superficiellement'
  },
  {
    mistake: 'Négliger les fondamentaux (HTTP, Git, Linux)',
    solution: 'Consacrer 20% du temps aux bases qui serviront toute la carrière',
    tip: 'Les frameworks changent, les fondamentaux restent'
  },
  {
    mistake: 'Trop théorie, pas assez de pratique',
    solution: 'Pour chaque concept appris, créer un mini-projet',
    tip: 'La rétention active > la lecture passive'
  },
  {
    mistake: 'Coder sans comprendre le "pourquoi"',
    solution: 'Toujours se demander: "Pourquoi cette solution ? Quelles alternatives ?"',
    tip: 'La compréhension profonde permet d\'adapter à tout contexte'
  }
];

const learningStrategies = [
  {
    name: 'Apprentissage par Projet',
    description: 'Choisir un projet concret et apprendre ce qui est nécessaire pour le réaliser',
    pros: ['Motivation élevée', 'Contexte réel', 'Portfolio construit'],
    example: 'Créer un clone de Twitter : auth, feed, likes, comments'
  },
  {
    name: 'Apprentissage Guidé',
    description: 'Suivre des cours structurés (bootcamp, MOOC, documentation)',
    pros: ['Progression linéaire', 'Pas de lacunes', 'Feedback structuré'],
    example: 'The Odin Project, freeCodeCamp, OpenClassrooms'
  },
  {
    name: 'Apprentissage par Problème',
    description: 'Résoudre des challenges algorithmiques et des bugs réels',
    pros: ['Pensée critique', 'Debugging skills', 'Résilience'],
    example: 'LeetCode, HackerRank, contribuer à des projets open-source'
  },
  {
    name: 'Apprentissage Social',
    description: 'Apprendre en groupe, pair programming, mentorat',
    pros: ['Perspectives multiples', 'Motivation par les pairs', 'Networking'],
    example: 'Discord communities, meetups, hackathons'
  }
];

export default function FullStackOverview({ className = '' }: FullStackOverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState<string>('Frontend');
  const [activeTab, setActiveTab] = useState<'path' | 'concepts' | 'mistakes'>('path');
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.layer-card, .learning-card');
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

  const currentLayer = layers.find(l => l.name === activeLayer);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#7B2D8E]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#2ED9FF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#2ED9FF] uppercase mb-4 block">
            Partie 1
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Panorama du{' '}
            <span className="text-gradient-cyan">Full-Stack</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-3xl mx-auto">
            Une compréhension systémique qui intègre la conception orientée utilisateur, 
            l'architecture distribuée, l'intelligence artificielle et la sécurité par conception.
            Découvrez chaque couche et son parcours d'apprentissage.
          </p>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="glass-card p-6 lg:p-8 mb-12 overflow-x-auto">
          <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 text-center">
            Flux de Communication Inter-Couches
          </h3>
          <div className="min-w-[600px]">
            <div className="flex flex-col items-center gap-2 text-sm">
              <div className="px-4 py-2 bg-[#2ED9FF]/20 rounded-lg text-[#2ED9FF] text-center w-48">
                Utilisateur
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="px-4 py-2 bg-[#7B2D8E]/20 rounded-lg text-[#7B2D8E] text-center w-48">
                CDN / Edge Network
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="px-4 py-2 bg-[#2ED9FF]/20 rounded-lg text-[#2ED9FF] text-center w-48">
                Frontend
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="px-4 py-2 bg-[#FFB300]/20 rounded-lg text-[#FFB300] text-center w-48">
                API Gateway
              </div>
              <div className="flex gap-4 mt-2">
                <div className="px-3 py-2 bg-[#00E676]/20 rounded-lg text-[#00E676] text-center w-32">
                  Service A
                </div>
                <div className="px-3 py-2 bg-[#00E676]/20 rounded-lg text-[#00E676] text-center w-32">
                  Service B
                </div>
                <div className="px-3 py-2 bg-[#FF2ECC]/20 rounded-lg text-[#FF2ECC] text-center w-32">
                  Service IA
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="px-3 py-2 bg-[#FF2ECC]/20 rounded-lg text-[#FF2ECC] text-center w-32">
                  Cache
                </div>
                <div className="px-3 py-2 bg-[#FF2ECC]/20 rounded-lg text-[#FF2ECC] text-center w-32">
                  BDD
                </div>
                <div className="px-3 py-2 bg-[#FF2ECC]/20 rounded-lg text-[#FF2ECC] text-center w-32">
                  Storage
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {layers.map((layer) => (
            <button
              key={layer.name}
              onClick={() => setActiveLayer(layer.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeLayer === layer.name
                  ? 'text-white'
                  : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10 hover:text-[#F4F2F7]'
              }`}
              style={{
                backgroundColor: activeLayer === layer.name ? layer.color : undefined
              }}
            >
              <layer.icon className="w-4 h-4" />
              {layer.name}
            </button>
          ))}
        </div>

        {/* Layer Detail with Learning Content */}
        {currentLayer && (
          <div className="glass-card p-6 lg:p-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${currentLayer.color}20` }}
              >
                <currentLayer.icon className="w-7 h-7" style={{ color: currentLayer.color }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F4F2F7]">{currentLayer.name}</h3>
                <p className="text-[#B8B2C6]">{currentLayer.description}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sm text-[#B8B2C6]">
                <Clock className="w-4 h-4" />
                <span>{currentLayer.timeToLearn}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
              {[
                { id: 'path', label: 'Parcours d\'apprentissage', icon: BookOpen },
                { id: 'concepts', label: 'Concepts clés', icon: Lightbulb },
                { id: 'mistakes', label: 'Erreurs courantes', icon: Target }
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

            {/* Tab Content */}
            {activeTab === 'path' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#00E676] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00E676]/20 flex items-center justify-center text-xs">1</span>
                    Débutant
                  </h4>
                  <ul className="space-y-2">
                    {currentLayer.learningPath.beginner.map((item, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="text-[#00E676]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#FFB300] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FFB300]/20 flex items-center justify-center text-xs">2</span>
                    Intermédiaire
                  </h4>
                  <ul className="space-y-2">
                    {currentLayer.learningPath.intermediate.map((item, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="text-[#FFB300]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#FF2ECC] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FF2ECC]/20 flex items-center justify-center text-xs">3</span>
                    Avancé
                  </h4>
                  <ul className="space-y-2">
                    {currentLayer.learningPath.advanced.map((item, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="text-[#FF2ECC]">★</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#F4F2F7] mb-3">Concepts Fondamentaux</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentLayer.keyConcepts.map((concept) => (
                      <span 
                        key={concept}
                        className="px-3 py-1.5 text-sm bg-white/10 text-[#F4F2F7] rounded-full"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[#F4F2F7] mb-3">Technologies Populaires</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentLayer.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1.5 text-sm border border-white/10 text-[#B8B2C6] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mistakes' && (
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-[#B8B2C6]">
                  Chaque domaine a ses pièges. Consultez la section "Erreurs Courantes" ci-dessous 
                  pour éviter les écueils les plus fréquents en début de parcours.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Learning Strategies */}
        <div className="learning-card glass-card-sm p-6 mb-12">
          <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2ED9FF]" />
            Stratégies d'Apprentissage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningStrategies.map((strategy) => (
              <div key={strategy.name} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <h4 className="font-medium text-[#F4F2F7] mb-2">{strategy.name}</h4>
                <p className="text-sm text-[#B8B2C6] mb-3">{strategy.description}</p>
                <div className="mb-3">
                  <p className="text-xs text-[#B8B2C6]/60 mb-1">Avantages:</p>
                  <ul className="space-y-0.5">
                    {strategy.pros.map((pro, i) => (
                      <li key={i} className="text-xs text-[#00E676]">+ {pro}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-[#B8B2C6]/60">
                  Ex: {strategy.example}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="learning-card glass-card-sm p-6 mb-12">
          <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#FF2ECC]" />
            Erreurs Courantes à Éviter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonMistakes.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF2ECC]/20 flex items-center justify-center text-xs text-[#FF2ECC] flex-shrink-0">
                    ✗
                  </span>
                  <div>
                    <p className="font-medium text-[#F4F2F7]">{item.mistake}</p>
                    <p className="text-sm text-[#B8B2C6] mt-1">
                      <span className="text-[#00E676]">Solution:</span> {item.solution}
                    </p>
                    <p className="text-xs text-[#B8B2C6]/60 mt-2 italic">
                      💡 {item.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Analogy */}
        <div className="learning-card glass-card-sm p-6">
          <h3 className="text-xl font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
            <span className="text-[#FFB300]">💡</span>
            Analogie Pédagogique : Le Restaurant
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { role: 'Frontend', analogy: 'Salle de restaurant', desc: 'Ce que voit le client', learn: 'HTML, CSS, JS, React' },
              { role: 'Backend', analogy: 'Cuisine', desc: 'Où se prépare la logique', learn: 'Node.js, Python, APIs' },
              { role: 'API', analogy: 'Serveurs', desc: 'Lien entre salle et cuisine', learn: 'REST, GraphQL, HTTP' },
              { role: 'Database', analogy: 'Garde-manger', desc: 'Stockage des ingrédients', learn: 'SQL, NoSQL, Redis' },
              { role: 'Infrastructure', analogy: 'Bâtiment', desc: 'Électricité, eau, structure', learn: 'Docker, Cloud, Linux' },
              { role: 'DevOps', analogy: 'Équipe maintenance', desc: 'Organisation et entretien', learn: 'CI/CD, Kubernetes' },
              { role: 'Sécurité', analogy: 'Systèmes de surveillance', desc: 'Protection et hygiène', learn: 'Auth, HTTPS, OWASP' },
              { role: 'IA/ML', analogy: 'Chef expérimenté', desc: 'Apprend et améliore les recettes', learn: 'Python, TensorFlow, LLMs' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-[#B8B2C6]/60 mb-1">{item.role}</p>
                <p className="text-sm font-medium text-[#F4F2F7]">{item.analogy}</p>
                <p className="text-xs text-[#B8B2C6] mb-2">{item.desc}</p>
                <p className="text-xs text-[#2ED9FF]">🎓 {item.learn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
