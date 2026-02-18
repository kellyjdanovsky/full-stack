import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, Cloud, 
  Cpu, Globe, Zap, CheckCircle2, XCircle, BookOpen, Clock, TrendingUp, AlertCircle
} from 'lucide-react';

interface TechStacksProps {
  className?: string;
}

const stacks = [
  {
    id: 'mern',
    name: 'MERN Stack',
    color: '#00E676',
    icon: Layers,
    components: [
      { name: 'MongoDB', role: 'Database', desc: 'NoSQL orienté documents' },
      { name: 'Express', role: 'Backend', desc: 'Framework web minimaliste' },
      { name: 'React', role: 'Frontend', desc: 'Bibliothèque UI componentielle' },
      { name: 'Node.js', role: 'Runtime', desc: 'JavaScript côté serveur' }
    ],
    advantages: [
      'Un seul langage (JavaScript) de bout en bout',
      'Écosystème NPM gigantesque',
      'Flexibilité du schéma MongoDB',
      'Performances excellentes pour SPAs'
    ],
    disadvantages: [
      'MongoDB complexe pour relations complexes',
      'JavaScript fatigue (évolution rapide)',
      'Gestion d\'état complexe dans grandes apps'
    ],
    useCases: ['SPAs riches', 'Dashboards interactifs', 'E-commerce', 'Réseaux sociaux'],
    difficulty: 3,
    scalability: 'Excellente',
    learningCurve: '2-4 mois',
    prerequisites: ['JavaScript', 'ES6+', 'Async/Await', 'Git'],
    learningPath: [
      { step: 1, topic: 'JavaScript Moderne', duration: '2-3 semaines', resources: ['JavaScript.info', 'Eloquent JavaScript'] },
      { step: 2, topic: 'React Fundamentals', duration: '3-4 semaines', resources: ['React Docs', 'Scrimba React'] },
      { step: 3, topic: 'Node.js & Express', duration: '2-3 semaines', resources: ['Node.js Docs', 'Express.js Guide'] },
      { step: 4, topic: 'MongoDB & Mongoose', duration: '2 semaines', resources: ['MongoDB University', 'Mongoose Docs'] },
      { step: 5, topic: 'Full-Stack Integration', duration: '2-3 semaines', resources: ['MERN Stack Course', 'Build Projects'] }
    ],
    jobMarket: 'Très demandé',
    avgSalary: '45k-75k € (junior)'
  },
  {
    id: 'mean',
    name: 'MEAN Stack',
    color: '#DD0031',
    icon: Layers,
    components: [
      { name: 'MongoDB', role: 'Database', desc: 'NoSQL orienté documents' },
      { name: 'Express', role: 'Backend', desc: 'Framework web minimaliste' },
      { name: 'Angular', role: 'Frontend', desc: 'Framework complet TypeScript' },
      { name: 'Node.js', role: 'Runtime', desc: 'JavaScript côté serveur' }
    ],
    advantages: [
      'Structure imposée facilitant collaboration',
      'TypeScript natif pour robustesse',
      'Outillage CLI puissant',
      'Tests unitaires natifs'
    ],
    disadvantages: [
      'Courbe d\'apprentissage plus raide',
      'Verbosité du code',
      'Bundle size plus important',
      'Moins de flexibilité architecturale'
    ],
    useCases: ['Applications enterprise', 'ERP et CRM', 'Systèmes bancaires', 'Grandes équipes'],
    difficulty: 4,
    scalability: 'Excellente',
    learningCurve: '3-5 mois',
    prerequisites: ['TypeScript', 'OOP', 'RxJS basics', 'Git'],
    learningPath: [
      { step: 1, topic: 'TypeScript Fundamentals', duration: '2-3 semaines', resources: ['TypeScript Handbook', 'Total TypeScript'] },
      { step: 2, topic: 'Angular Core', duration: '4-5 semaines', resources: ['Angular.io', 'Angular University'] },
      { step: 3, topic: 'RxJS & State Management', duration: '2-3 semaines', resources: ['RxJS Docs', 'NgRx'] },
      { step: 4, topic: 'Node.js & Express', duration: '2-3 semaines', resources: ['Node.js Docs', 'Express Guide'] },
      { step: 5, topic: 'Enterprise Patterns', duration: '3 semaines', resources: ['Enterprise Angular', 'Clean Architecture'] }
    ],
    jobMarket: 'Enterprise focus',
    avgSalary: '50k-80k € (junior)'
  },
  {
    id: 'jamstack',
    name: 'JAMstack',
    color: '#F0047F',
    icon: Globe,
    components: [
      { name: 'JavaScript', role: 'Interactivité', desc: 'Logique côté client' },
      { name: 'APIs', role: 'Services', desc: 'Fonctionnalités dynamiques' },
      { name: 'Markup', role: 'Contenu', desc: 'HTML pré-rendu statique' },
      { name: 'CDN', role: 'Distribution', desc: 'Distribution mondiale' }
    ],
    advantages: [
      'Performance ultra-rapide (CDN edge)',
      'Sécurité renforcée (pas de serveur exposé)',
      'Coût d\'hébergement quasi-gratuit',
      'SEO parfait avec HTML pré-rendu'
    ],
    disadvantages: [
      'Temps de build long pour gros sites',
      'Contenu temps réel limité',
      'Prévisualisation complexe',
      'Courbe d\'apprentissage des concepts'
    ],
    useCases: ['Sites vitrines', 'Blogs et documentation', 'E-commerce contenu stable', 'Portails'],
    difficulty: 3,
    scalability: 'Infinie',
    learningCurve: '1-3 mois',
    prerequisites: ['HTML/CSS', 'JavaScript', 'Git', 'Basic CLI'],
    learningPath: [
      { step: 1, topic: 'Static Site Generators', duration: '1-2 semaines', resources: ['Next.js Docs', 'Gatsby Tutorial'] },
      { step: 2, topic: 'Headless CMS', duration: '1-2 semaines', resources: ['Sanity.io', 'Contentful'] },
      { step: 3, topic: 'Serverless Functions', duration: '2 semaines', resources: ['Vercel Functions', 'Netlify Functions'] },
      { step: 4, topic: 'Edge Computing', duration: '1-2 semaines', resources: ['Cloudflare Workers', 'Vercel Edge'] },
      { step: 5, topic: 'Performance Optimization', duration: '1 semaine', resources: ['Web.dev', 'Lighthouse'] }
    ],
    jobMarket: 'En croissance',
    avgSalary: '40k-70k € (junior)'
  },
  {
    id: 'serverless',
    name: 'Serverless',
    color: '#FF9900',
    icon: Cloud,
    components: [
      { name: 'Functions', role: 'Compute', desc: 'Exécution à la demande' },
      { name: 'API Gateway', role: 'Routing', desc: 'Point d\'entrée HTTP' },
      { name: 'Event Sources', role: 'Triggers', desc: 'Déclencheurs événementiels' },
      { name: 'Managed DB', role: 'Data', desc: 'Base de données serverless' }
    ],
    advantages: [
      'Paiement uniquement à l\'usage',
      'Scalabilité automatique et instantanée',
      'Zéro gestion serveur',
      'Haute disponibilité par défaut'
    ],
    disadvantages: [
      'Cold starts (latence premier appel)',
      'Vendor lock-in',
      'Debugging plus complexe',
      'Limites temps/mémoire'
    ],
    useCases: ['APIs à trafic variable', 'Traitement événements', 'MVPs et prototypes', 'Backends mobiles'],
    difficulty: 3,
    scalability: 'Automatique',
    learningCurve: '2-3 mois',
    prerequisites: ['Cloud basics', 'JavaScript/Python', 'APIs', 'Event-driven'],
    learningPath: [
      { step: 1, topic: 'Cloud Fundamentals', duration: '2 semaines', resources: ['AWS Free Tier', 'Google Cloud'] },
      { step: 2, topic: 'Lambda/Functions', duration: '2-3 semaines', resources: ['AWS Lambda', 'Azure Functions'] },
      { step: 3, topic: 'API Gateway', duration: '1-2 semaines', resources: ['AWS API Gateway', 'Serverless Framework'] },
      { step: 4, topic: 'Event-Driven Architecture', duration: '2 semaines', resources: ['SNS/SQS', 'EventBridge'] },
      { step: 5, topic: 'Monitoring & Debugging', duration: '1 semaine', resources: ['CloudWatch', 'X-Ray'] }
    ],
    jobMarket: 'Très demandé',
    avgSalary: '50k-85k € (junior)'
  },
  {
    id: 'microservices',
    name: 'Microservices',
    color: '#326CE5',
    icon: Cpu,
    components: [
      { name: 'API Gateway', role: 'Entry', desc: 'Routing et orchestration' },
      { name: 'Services', role: 'Business Logic', desc: 'Services indépendants' },
      { name: 'Message Queue', role: 'Async', desc: 'Communication asynchrone' },
      { name: 'Containers', role: 'Runtime', desc: 'Docker + Kubernetes' }
    ],
    advantages: [
      'Équipes autonomes par service',
      'Scale uniquement ce qui est nécessaire',
      'Isolation des pannes',
      'Flexibilité technologique'
    ],
    disadvantages: [
      'Complexité opérationnelle élevée',
      'Latence réseau inter-services',
      'Cohérence des données complexe',
      'Debugging distribué difficile'
    ],
    useCases: ['Grandes applications', 'Équipes multiples', 'Scalabilité granulaire', 'Domaines métier distincts'],
    difficulty: 5,
    scalability: 'Excellente',
    learningCurve: '6-12 mois',
    prerequisites: ['Docker', 'Kubernetes', 'Distributed Systems', 'Event-driven'],
    learningPath: [
      { step: 1, topic: 'Docker Deep Dive', duration: '2-3 semaines', resources: ['Docker Docs', 'Kubernetes Basics'] },
      { step: 2, topic: 'Kubernetes', duration: '4-5 semaines', resources: ['K8s Docs', 'CKAD Course'] },
      { step: 3, topic: 'Service Mesh', duration: '2-3 semaines', resources: ['Istio', 'Linkerd'] },
      { step: 4, topic: 'Event Streaming', duration: '2-3 semaines', resources: ['Kafka', 'RabbitMQ'] },
      { step: 5, topic: 'Observability', duration: '2 semaines', resources: ['Prometheus', 'Jaeger'] }
    ],
    jobMarket: 'Senior roles',
    avgSalary: '60k-100k € (junior)'
  },
  {
    id: 'edge',
    name: 'Edge Computing',
    color: '#F48120',
    icon: Zap,
    components: [
      { name: 'Edge Functions', role: 'Compute', desc: 'Code proche utilisateur' },
      { name: 'KV Store', role: 'Cache', desc: 'Stockage clé-valeur edge' },
      { name: 'Durable Objects', role: 'State', desc: 'État persistant edge' },
      { name: 'Global Network', role: 'CDN', desc: 'Réseau mondial de PoP' }
    ],
    advantages: [
      'Latence < 50ms partout dans le monde',
      'Distribution automatique',
      'Multiples points de présence',
      'Expérience instantanée'
    ],
    disadvantages: [
      'Contraintes d\'exécution',
      'État et persistance limités',
      'Debugging distribué complexe',
      'Cohérence éventuelle'
    ],
    useCases: ['Applications globales', 'Personnalisation temps réel', 'A/B testing', 'IoT et streaming'],
    difficulty: 4,
    scalability: 'Excellente',
    learningCurve: '2-4 mois',
    prerequisites: ['JavaScript/TypeScript', 'HTTP', 'Caching', 'CDN basics'],
    learningPath: [
      { step: 1, topic: 'Edge Runtime', duration: '1-2 semaines', resources: ['Vercel Edge', 'Cloudflare Workers'] },
      { step: 2, topic: 'Edge Storage', duration: '1-2 semaines', resources: ['KV Stores', 'Durable Objects'] },
      { step: 3, topic: 'Edge Rendering', duration: '2 semaines', resources: ['ISR', 'Streaming SSR'] },
      { step: 4, topic: 'Global State', duration: '2 semaines', resources: ['CRDTs', 'Eventual Consistency'] },
      { step: 5, topic: 'Performance Tuning', duration: '1 semaine', resources: ['Web Vitals', 'Edge Analytics'] }
    ],
    jobMarket: 'Niche mais croissant',
    avgSalary: '55k-90k € (junior)'
  }
];

const stackSelectionGuide = [
  {
    situation: 'Débutant en programmation',
    recommendation: 'MERN Stack',
    reason: 'Un seul langage (JavaScript), grande communauté, ressources abondantes'
  },
  {
    situation: 'Projet Enterprise/Grande équipe',
    recommendation: 'MEAN Stack',
    reason: 'TypeScript natif, structure imposée, outillage enterprise-grade'
  },
  {
    situation: 'Site vitrine/Blog/E-commerce simple',
    recommendation: 'JAMstack',
    reason: 'Performance optimale, coût minimal, SEO parfait'
  },
  {
    situation: 'MVP/Startup rapide',
    recommendation: 'Serverless',
    reason: 'Déploiement rapide, coût à l\'usage, scaling automatique'
  },
  {
    situation: 'Application complexe, équipe > 10 devs',
    recommendation: 'Microservices',
    reason: 'Autonomie des équipes, scalabilité granulaire, résilience'
  },
  {
    situation: 'Application globale, latence critique',
    recommendation: 'Edge Computing',
    reason: 'Latence minimale, distribution mondiale, expérience instantanée'
  }
];

export default function TechStacks({ className = '' }: TechStacksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStack, setActiveStack] = useState<string>('mern');
  const [activeView, setActiveView] = useState<'overview' | 'learning' | 'career'>('overview');
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.stack-card');
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

  const currentStack = stacks.find(s => s.id === activeStack);

  return (
    <section
      ref={sectionRef}
      id="techstacks"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[50vh] bg-[#FFB300]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#FFB300] uppercase mb-4 block">
            Partie 2
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Types de{' '}
            <span className="text-[#FFB300]">Stacks</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-2xl mx-auto">
            Choisissez la stack adaptée à votre projet en fonction des contraintes métier, 
            de la taille de l'équipe et des besoins en scalabilité. Chaque stack a son parcours d'apprentissage.
          </p>
        </div>

        {/* Stack Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => setActiveStack(stack.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeStack === stack.id
                  ? 'text-white'
                  : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10 hover:text-[#F4F2F7]'
              }`}
              style={{
                backgroundColor: activeStack === stack.id ? stack.color : undefined
              }}
            >
              {stack.name}
            </button>
          ))}
        </div>

        {/* Stack Detail */}
        {currentStack && (
          <div className="stack-card glass-card p-6 lg:p-8 mb-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Layers },
                { id: 'learning', label: 'Parcours d\'apprentissage', icon: BookOpen },
                { id: 'career', label: 'Carrière', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === tab.id
                      ? 'bg-white/10 text-[#F4F2F7]'
                      : 'text-[#B8B2C6] hover:text-[#F4F2F7]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeView === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Components */}
                <div>
                  <h3 
                    className="text-2xl font-bold mb-6 flex items-center gap-3"
                    style={{ color: currentStack.color }}
                  >
                    <currentStack.icon className="w-6 h-6" />
                    {currentStack.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {currentStack.components.map((comp, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-[#B8B2C6]/60 mb-1">{comp.role}</p>
                        <p className="font-medium text-[#F4F2F7]">{comp.name}</p>
                        <p className="text-xs text-[#B8B2C6]">{comp.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Difficulty & Scalability */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-[#B8B2C6]/60 mb-1">Difficulté</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < currentStack.difficulty ? 'text-[#FFB300]' : 'text-white/20'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-[#B8B2C6]/60 mb-1">Scalabilité</p>
                      <p className="font-medium text-[#00E676]">{currentStack.scalability}</p>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Cas d'usage</p>
                    <div className="flex flex-wrap gap-2">
                      {currentStack.useCases.map((useCase) => (
                        <span 
                          key={useCase}
                          className="px-3 py-1 text-xs bg-white/5 text-[#B8B2C6] rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Pros & Cons */}
                <div className="space-y-6">
                  {/* Advantages */}
                  <div>
                    <h4 className="text-sm font-medium text-[#00E676] mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Avantages
                    </h4>
                    <ul className="space-y-2">
                      {currentStack.advantages.map((adv, i) => (
                        <li key={i} className="text-sm text-[#B8B2C6] flex items-start gap-2">
                          <span className="text-[#00E676] mt-0.5">✓</span>
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disadvantages */}
                  <div>
                    <h4 className="text-sm font-medium text-[#FF2ECC] mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Inconvénients
                    </h4>
                    <ul className="space-y-2">
                      {currentStack.disadvantages.map((dis, i) => (
                        <li key={i} className="text-sm text-[#B8B2C6] flex items-start gap-2">
                          <span className="text-[#FF2ECC] mt-0.5">✗</span>
                          {dis}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <h4 className="text-sm font-medium text-[#2ED9FF] mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Prérequis
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStack.prerequisites.map((pre) => (
                        <span 
                          key={pre}
                          className="px-2 py-1 text-xs border border-[#2ED9FF]/30 text-[#2ED9FF] rounded"
                        >
                          {pre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'learning' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="w-5 h-5 text-[#FFB300]" />
                  <span className="text-[#B8B2C6]">Courbe d'apprentissage: <strong className="text-[#F4F2F7]">{currentStack.learningCurve}</strong></span>
                </div>
                
                <div className="space-y-4">
                  {currentStack.learningPath.map((step) => (
                    <div key={step.step} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-[#FFB300]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[#FFB300]">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-[#F4F2F7]">{step.topic}</h4>
                          <span className="text-xs text-[#B8B2C6]">{step.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((res) => (
                            <span key={res} className="text-xs text-[#B8B2C6]/70 bg-white/5 px-2 py-0.5 rounded">
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'career' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2">Marché de l'emploi</h4>
                  <p className="text-2xl font-bold text-[#00E676]">{currentStack.jobMarket}</p>
                  <p className="text-sm text-[#B8B2C6] mt-2">
                    Demande actuelle pour les développeurs {currentStack.name}
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2">Salaire moyen (Junior)</h4>
                  <p className="text-2xl font-bold text-[#FFB300]">{currentStack.avgSalary}</p>
                  <p className="text-sm text-[#B8B2C6] mt-2">
                    Varie selon la localisation et l'expérience
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stack Selection Guide */}
        <div className="stack-card glass-card-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2ED9FF]" />
            Guide de Sélection de Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stackSelectionGuide.map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg">
                <p className="text-xs text-[#B8B2C6]/60 mb-1">Situation</p>
                <p className="text-sm font-medium text-[#F4F2F7] mb-2">{item.situation}</p>
                <p className="text-xs text-[#00E676] mb-1">Recommandation: {item.recommendation}</p>
                <p className="text-xs text-[#B8B2C6]">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Language Combinations */}
        <div className="stack-card glass-card-sm p-6">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-4">
            Combinaisons de Langages Recommandées
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-[#B8B2C6] font-medium">Frontend</th>
                  <th className="text-left py-2 text-[#B8B2C6] font-medium">Backend</th>
                  <th className="text-left py-2 text-[#B8B2C6] font-medium">Base de données</th>
                  <th className="text-left py-2 text-[#B8B2C6] font-medium">Cas d'usage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['TypeScript/React', 'Node.js/TypeScript', 'PostgreSQL', 'Apps full-stack typées'],
                  ['TypeScript/React', 'Python/FastAPI', 'PostgreSQL', 'Apps data-driven'],
                  ['TypeScript/Vue', 'Go', 'MongoDB', 'APIs haute performance'],
                  ['TypeScript/React', 'Rust', 'PostgreSQL', 'Systèmes critiques'],
                  ['TypeScript/React', 'Java/Spring', 'Oracle', 'Applications enterprise'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 text-[#B8B2C6]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
