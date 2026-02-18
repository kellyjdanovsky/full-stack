import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GitBranch, Play, CheckCircle, Rocket, BarChart3,
  AlertTriangle, Terminal, Cloud, Container, Server,
  RefreshCw, Shield, Eye, BookOpen, Clock, Target, TrendingUp
} from 'lucide-react';

interface DevOpsSectionProps {
  className?: string;
}

const ciCdStages = [
  {
    name: 'Source',
    icon: GitBranch,
    color: '#2ED9FF',
    steps: ['Push sur branche', 'Webhook déclenché', 'Checkout du code'],
    tools: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    learn: 'Git workflows, Branching strategies'
  },
  {
    name: 'Build',
    icon: Terminal,
    color: '#FFB300',
    steps: ['Installation dépendances', 'Compilation', 'Bundling'],
    tools: ['npm/yarn/pnpm', 'Webpack', 'Vite', 'Turborepo'],
    learn: 'Build optimization, Caching strategies'
  },
  {
    name: 'Test',
    icon: CheckCircle,
    color: '#00E676',
    steps: ['Tests unitaires', 'Tests d\'intégration', 'Tests E2E'],
    tools: ['Jest', 'Vitest', 'Cypress', 'Playwright'],
    learn: 'Test pyramid, Coverage goals'
  },
  {
    name: 'Security',
    icon: Shield,
    color: '#FF2ECC',
    steps: ['SAST (code scan)', 'DAST (runtime)', 'Dependency audit'],
    tools: ['Snyk', 'SonarQube', 'Trivy', 'OWASP ZAP'],
    learn: 'DevSecOps, Shift-left security'
  },
  {
    name: 'Deploy',
    icon: Rocket,
    color: '#7B2D8E',
    steps: ['Build image Docker', 'Push registry', 'Deploy K8s'],
    tools: ['Docker', 'Kubernetes', 'ArgoCD', 'Helm'],
    learn: 'GitOps, Progressive delivery'
  }
];

const monitoringTools = [
  {
    category: 'Métriques',
    icon: BarChart3,
    tools: [
      { name: 'Prometheus', desc: 'Collecte de métriques TSDB', learn: 'PromQL, Alerting rules' },
      { name: 'Grafana', desc: 'Visualisation et dashboards', learn: 'Dashboard design, Panels' },
      { name: 'Datadog', desc: 'Monitoring cloud-native', learn: 'APM, Log management' },
    ]
  },
  {
    category: 'Logging',
    icon: Terminal,
    tools: [
      { name: 'ELK Stack', desc: 'Elasticsearch, Logstash, Kibana', learn: 'Log aggregation, Parsing' },
      { name: 'Loki', desc: 'Logging pour Grafana', learn: 'Label-based indexing' },
      { name: 'Splunk', desc: 'Analyse de logs enterprise', learn: 'SPL queries' },
    ]
  },
  {
    category: 'Tracing',
    icon: Eye,
    tools: [
      { name: 'Jaeger', desc: 'Distributed tracing', learn: 'Span, Trace context' },
      { name: 'Zipkin', desc: 'Tracing open source', learn: 'Service dependencies' },
      { name: 'Tempo', desc: 'Tracing pour Grafana', learn: 'TraceQL' },
    ]
  },
  {
    category: 'Alerting',
    icon: AlertTriangle,
    tools: [
      { name: 'PagerDuty', desc: 'On-call management', learn: 'Escalation policies' },
      { name: 'Opsgenie', desc: 'Alert routing', learn: 'Routing rules' },
      { name: 'Alertmanager', desc: 'Alerting Prometheus', learn: 'Grouping, Inhibition' },
    ]
  }
];

const infrastructureTools = [
  {
    name: 'Terraform',
    icon: Cloud,
    color: '#7B42BC',
    description: 'Infrastructure as Code pour tous les clouds',
    features: ['Déclaratif', 'State management', 'Modules réutilisables'],
    learn: 'HCL syntax, Modules, Workspaces',
    timeToLearn: '2-4 semaines'
  },
  {
    name: 'Docker',
    icon: Container,
    color: '#2496ED',
    description: 'Containerisation des applications',
    features: ['Isolation', 'Portabilité', 'Lightweight'],
    learn: 'Dockerfile, Compose, Networking',
    timeToLearn: '1-2 semaines'
  },
  {
    name: 'Kubernetes',
    icon: Server,
    color: '#326CE5',
    description: 'Orchestration de conteneurs à grande échelle',
    features: ['Auto-scaling', 'Self-healing', 'Rolling updates'],
    learn: 'Pods, Services, Deployments, Ingress',
    timeToLearn: '1-2 mois'
  },
  {
    name: 'GitOps',
    icon: GitBranch,
    color: '#FF2ECC',
    description: 'Déploiement déclenché par Git',
    features: ['ArgoCD', 'Flux CD', 'Version control'],
    learn: 'ArgoCD, App of Apps, Sync waves',
    timeToLearn: '2-3 semaines'
  }
];

const deploymentStrategies = [
  {
    name: 'Blue-Green',
    description: 'Deux environnements identiques, switch instantané',
    pros: 'Zero downtime, rollback instantané',
    cons: 'Double ressources nécessaires',
    when: 'Applications critiques, besoin de rollback rapide',
    learn: 'Load balancer config, Health checks'
  },
  {
    name: 'Canary',
    description: 'Déploiement progressif sur un sous-ensemble',
    pros: 'Détection rapide des problèmes',
    cons: 'Complexité de routage',
    when: 'Applications à fort trafic, A/B testing',
    learn: 'Traffic splitting, Metrics analysis'
  },
  {
    name: 'Rolling',
    description: 'Remplacement progressif des instances',
    pros: 'Pas de ressources supplémentaires',
    cons: 'Rollback plus long',
    when: 'Applications standard, ressources limitées',
    learn: 'Max unavailable, Pod disruption budgets'
  },
  {
    name: 'A/B Testing',
    description: 'Deux versions pour comparer les performances',
    pros: 'Data-driven decisions',
    cons: 'Complexité de mise en place',
    when: 'Feature validation, UX optimization',
    learn: 'Feature flags, Statistical significance'
  }
];

const devopsMistakes = [
  {
    mistake: 'Pas de monitoring en production',
    impact: 'Détection tardive des problèmes, MTTR élevé',
    solution: 'Metriques, logs, traces dès le déploiement',
    learn: 'Observability, SLIs/SLOs'
  },
  {
    mistake: 'Déploiements manuels',
    impact: 'Erreurs humaines, inconsistances',
    solution: 'CI/CD pipelines automatisées',
    learn: 'GitHub Actions, GitLab CI'
  },
  {
    mistake: 'Secrets dans le code',
    impact: 'Fuite de credentials, faille de sécurité',
    solution: 'Vault, AWS Secrets Manager, env vars',
    learn: 'Secret management, Least privilege'
  },
  {
    mistake: 'Pas de tests automatisés',
    impact: 'Régressions fréquentes, confiance faible',
    solution: 'Tests unitaires, intégration, E2E',
    learn: 'Test pyramid, TDD'
  }
];

const learningPathDevOps = [
  { stage: 'Fondations', duration: '2-4 semaines', topics: ['Linux basics', 'Bash scripting', 'Git avancé', 'Networking'] },
  { stage: 'Containers', duration: '2-3 semaines', topics: ['Docker', 'Docker Compose', 'Container security', 'Multi-stage builds'] },
  { stage: 'Orchestration', duration: '4-6 semaines', topics: ['Kubernetes', 'Helm', 'Service mesh', 'Auto-scaling'] },
  { stage: 'CI/CD', duration: '2-3 semaines', topics: ['GitHub Actions', 'GitLab CI', 'ArgoCD', 'GitOps'] },
  { stage: 'Cloud', duration: '4-8 semaines', topics: ['AWS/GCP/Azure', 'IaC (Terraform)', 'Cost optimization', 'Security'] },
  { stage: 'Observability', duration: '2-3 semaines', topics: ['Prometheus', 'Grafana', 'Distributed tracing', 'Alerting'] }
];

export default function DevOpsSection({ className = '' }: DevOpsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'learning' | 'mistakes'>('pipeline');
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.devops-card');
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

  return (
    <section
      ref={sectionRef}
      id="devops"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00E676]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-[#7B2D8E]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#00E676] uppercase mb-4 block">
            Partie 5
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            DevOps &{' '}
            <span className="text-[#00E676]">CI/CD</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-2xl mx-auto">
            Automatisation du développement au déploiement, monitoring et gestion 
            de l'infrastructure à grande échelle.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'pipeline', label: 'Pipeline CI/CD', icon: RefreshCw },
            { id: 'learning', label: 'Parcours d\'apprentissage', icon: BookOpen },
            { id: 'mistakes', label: 'Erreurs à éviter', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#00E676] text-white'
                  : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10 hover:text-[#F4F2F7]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'pipeline' && (
          <>
            {/* CI/CD Pipeline */}
            <div className="devops-card glass-card p-6 lg:p-8 mb-12">
              <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#2ED9FF]" />
                Pipeline CI/CD
              </h3>

              {/* Pipeline Stages */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {ciCdStages.map((stage, i) => (
                  <button
                    key={stage.name}
                    onClick={() => setActiveStage(i)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      activeStage === i
                        ? 'text-white'
                        : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: activeStage === i ? stage.color : undefined
                    }}
                  >
                    <stage.icon className="w-3 h-3" />
                    {stage.name}
                  </button>
                ))}
              </div>

              {/* Active Stage Detail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2 flex items-center gap-2">
                    <Play className="w-4 h-4" style={{ color: ciCdStages[activeStage].color }} />
                    Étapes
                  </h4>
                  <ul className="space-y-2">
                    {ciCdStages[activeStage].steps.map((step, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#B8B2C6]" />
                    Outils Populaires
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ciCdStages[activeStage].tools.map((tool) => (
                      <span 
                        key={tool}
                        className="px-3 py-1 text-xs bg-white/10 text-[#B8B2C6] rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#2ED9FF]" />
                    À apprendre
                  </h4>
                  <p className="text-sm text-[#B8B2C6]">{ciCdStages[activeStage].learn}</p>
                </div>
              </div>
            </div>

            {/* Infrastructure Tools */}
            <div className="devops-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {infrastructureTools.map((tool) => (
                <div key={tool.name} className="glass-card-sm p-5 hover:bg-white/10 transition-colors">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                  </div>
                  <h4 className="font-bold text-[#F4F2F7] mb-2">{tool.name}</h4>
                  <p className="text-sm text-[#B8B2C6] mb-3">{tool.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#B8B2C6]/60 mb-2">
                    <Clock className="w-3 h-3" />
                    {tool.timeToLearn}
                  </div>
                  <p className="text-xs text-[#2ED9FF]">🎓 {tool.learn}</p>
                </div>
              ))}
            </div>

            {/* Deployment Strategies */}
            <div className="devops-card glass-card-sm p-6 mb-12">
              <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#FFB300]" />
                Stratégies de Déploiement
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deploymentStrategies.map((strategy, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-medium text-[#F4F2F7] mb-2">{strategy.name}</h4>
                    <p className="text-xs text-[#B8B2C6] mb-3">{strategy.description}</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-[#00E676]">✓ {strategy.pros}</p>
                      <p className="text-[#FF2ECC]">✗ {strategy.cons}</p>
                    </div>
                    <p className="text-xs text-[#B8B2C6]/60 mt-2 pt-2 border-t border-white/10">
                      <Target className="w-3 h-3 inline mr-1" />
                      {strategy.when}
                    </p>
                    <p className="text-xs text-[#2ED9FF] mt-1">
                      🎓 {strategy.learn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring Stack */}
            <div className="devops-card glass-card-sm p-6">
              <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FF2ECC]" />
                Stack d'Observabilité
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {monitoringTools.map((category) => (
                  <div key={category.category} className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-medium text-[#F4F2F7] mb-3 flex items-center gap-2">
                      <category.icon className="w-4 h-4 text-[#2ED9FF]" />
                      {category.category}
                    </h4>
                    <ul className="space-y-2">
                      {category.tools.map((tool) => (
                        <li key={tool.name} className="text-sm">
                          <span className="text-[#F4F2F7]">{tool.name}</span>
                          <p className="text-xs text-[#B8B2C6]/60">{tool.desc}</p>
                          <p className="text-xs text-[#2ED9FF]">🎓 {tool.learn}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'learning' && (
          <div className="devops-card glass-card p-6 lg:p-8">
            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2ED9FF]" />
              Parcours d'Apprentissage DevOps
            </h3>
            <div className="space-y-4">
              {learningPathDevOps.map((stage, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#00E676]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#00E676]">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#F4F2F7]">{stage.stage}</h4>
                      <span className="text-xs text-[#B8B2C6] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stage.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.topics.map((topic) => (
                        <span key={topic} className="text-xs text-[#B8B2C6] bg-white/5 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Deployment Frequency', value: 'Plusieurs/jour', icon: Rocket },
                { label: 'Lead Time', value: '< 1 heure', icon: TrendingUp },
                { label: 'MTTR', value: '< 1 heure', icon: RefreshCw },
                { label: 'Change Failure Rate', value: '< 15%', icon: Target },
              ].map((metric, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg text-center">
                  <metric.icon className="w-6 h-6 text-[#00E676] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#F4F2F7]">{metric.value}</p>
                  <p className="text-xs text-[#B8B2C6]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="devops-card glass-card p-6 lg:p-8">
            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF2ECC]" />
              Erreurs Courantes en DevOps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devopsMistakes.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FF2ECC] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#F4F2F7] mb-1">{item.mistake}</p>
                      <p className="text-sm text-[#B8B2C6] mb-2">
                        <span className="text-[#FF2ECC]">Impact:</span> {item.impact}
                      </p>
                      <p className="text-xs text-[#00E676] mb-1">
                        Solution: {item.solution}
                      </p>
                      <p className="text-xs text-[#2ED9FF]">
                        🎓 {item.learn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
