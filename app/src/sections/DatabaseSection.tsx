import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, Server, Zap, Layers, Search,
  TrendingUp, Shield, Clock, CheckCircle2, BookOpen,
  AlertTriangle, Lightbulb
} from 'lucide-react';

interface DatabaseSectionProps {
  className?: string;
}

const databaseTypes = [
  {
    id: 'sql',
    name: 'SQL Relationnelles',
    icon: Database,
    color: '#2ED9FF',
    examples: ['PostgreSQL', 'MySQL', 'SQLite', 'Oracle', 'SQL Server'],
    useCases: ['Transactions financières', 'ERP/CRM', 'Systèmes de réservation', 'Données structurées'],
    characteristics: [
      'Schéma rigide et prédéfini',
      'ACID garanti (Atomicité, Cohérence, Isolation, Durabilité)',
      'Relations complexes avec JOINs',
      'Langage SQL standardisé'
    ],
    pros: ['Cohérence des données', 'Requêtes complexes', 'Maturité et stabilité'],
    cons: ['Scaling vertical limité', 'Schéma rigide', 'Performances sur très gros volumes'],
    learningPath: {
      beginner: ['SQL Basics', 'SELECT, INSERT, UPDATE, DELETE', 'WHERE, ORDER BY', 'Aggregate functions'],
      intermediate: ['JOINs (INNER, LEFT, RIGHT)', 'Subqueries', 'Indexes', 'Transactions'],
      advanced: ['Query Optimization', 'Partitioning', 'Replication', 'Stored Procedures']
    },
    timeToLearn: '2-4 mois',
    resources: ['SQLBolt', 'Mode Analytics SQL', 'PostgreSQL Docs', 'Use The Index, Luke']
  },
  {
    id: 'nosql',
    name: 'NoSQL',
    icon: Layers,
    color: '#00E676',
    examples: ['MongoDB', 'Cassandra', 'DynamoDB', 'Couchbase', 'Firestore'],
    useCases: ['Applications temps réel', 'Contenu varié', 'Big Data', 'IoT'],
    characteristics: [
      'Schéma flexible ou sans schéma',
      'Scaling horizontal natif',
      'Modèles de données variés (document, clé-valeur, graphe, colonne)',
      'Eventual consistency'
    ],
    pros: ['Scalabilité horizontale', 'Flexibilité du schéma', 'Haute disponibilité'],
    cons: ['Cohérence éventuelle', 'Pas de standard SQL', 'Requêtes limitées'],
    learningPath: {
      beginner: ['Document model', 'CRUD operations', 'Basic queries', 'Schema design'],
      intermediate: ['Aggregation pipeline', 'Indexing', 'Replication', 'Sharding'],
      advanced: ['Data modeling patterns', 'Time-series data', 'Multi-document ACID', 'Change streams']
    },
    timeToLearn: '1-3 mois',
    resources: ['MongoDB University', 'DynamoDB Docs', 'NoSQL Distilled (livre)']
  },
  {
    id: 'vector',
    name: 'Vector DBs',
    icon: Search,
    color: '#FF2ECC',
    examples: ['Pinecone', 'Weaviate', 'Chroma', 'Qdrant', 'Milvus'],
    useCases: ['RAG (Retrieval Augmented Generation)', 'Recherche sémantique', 'Recommandations', 'Similarité d\'images'],
    characteristics: [
      'Stockage d\'embeddings (vecteurs)',
      'Recherche par similarité (cosine, euclidienne)',
      'Optimisé pour haute dimensionnalité',
      'Indexation spécialisée (HNSW, IVF)'
    ],
    pros: ['Recherche sémantique rapide', 'Intégration LLMs', 'Similarité approximative'],
    cons: ['Coût de stockage', 'Niche et spécialisé', 'Complexité d\'indexation'],
    learningPath: {
      beginner: ['Embeddings concepts', 'Similarity metrics', 'Basic vector search', 'Use cases'],
      intermediate: ['Indexing strategies', 'HNSW algorithm', 'Hybrid search', 'Metadata filtering'],
      advanced: ['Multi-modal search', 'Quantization', 'Distributed vectors', 'RAG architecture']
    },
    timeToLearn: '2-4 semaines',
    resources: ['Pinecone Docs', 'Weaviate Academy', 'Vector DB Comparison']
  },
  {
    id: 'cache',
    name: 'Cache & In-Memory',
    icon: Zap,
    color: '#FFB300',
    examples: ['Redis', 'Memcached', 'KeyDB', 'Dragonfly'],
    useCases: ['Sessions utilisateur', 'Rate limiting', 'Données temporaires', 'Pub/Sub'],
    characteristics: [
      'Stockage en RAM (ultra-rapide)',
      'TTL (Time To Live) natif',
      'Structures de données riches',
      'Persistance optionnelle'
    ],
    pros: ['Latence < 1ms', 'Throughput élevé', 'Structures riches (listes, sets, hash)'],
    cons: ['Coût de la RAM', 'Volatilité des données', 'Taille limitée'],
    learningPath: {
      beginner: ['Key-value operations', 'TTL', 'Data structures (strings, lists)', 'Pub/Sub'],
      intermediate: ['Hashes and sets', 'Sorted sets', 'Transactions', 'Pipelining'],
      advanced: ['Redis Cluster', 'Persistence strategies', 'Lua scripting', 'Module development']
    },
    timeToLearn: '2-3 semaines',
    resources: ['Redis University', 'Redis Docs', 'Redis Explained']
  }
];

const scalingStrategies = [
  {
    title: 'Scaling Vertical',
    description: 'Augmenter les ressources d\'un seul serveur (CPU, RAM, SSD)',
    pros: 'Simple, pas de changement d\'architecture',
    cons: 'Limite physique, coût exponentiel',
    when: 'Petites à moyennes applications',
    learn: 'Monitoring, Resource planning'
  },
  {
    title: 'Scaling Horizontal (Sharding)',
    description: 'Distribuer les données sur plusieurs serveurs',
    pros: 'Illimité, redondance, haute disponibilité',
    cons: 'Complexité, cohérence des données',
    when: 'Grandes applications, big data',
    learn: 'Sharding strategies, Consistent hashing'
  },
  {
    title: 'Read Replicas',
    description: 'Serveurs de lecture secondaires pour décharger le primaire',
    pros: 'Améliore les lectures, facile à mettre en place',
    cons: 'Réplication asynchrone, lag possible',
    when: 'Applications read-heavy',
    learn: 'Replication lag, Read-write splitting'
  },
  {
    title: 'Caching Layer',
    description: 'Couche de cache (Redis) devant la base de données',
    pros: 'Réduit drastiquement la charge DB',
    cons: 'Invalidation complexe, cohérence',
    when: 'Toutes applications à fort trafic',
    learn: 'Cache invalidation, Cache-aside pattern'
  }
];

const commonDbMistakes = [
  {
    mistake: 'Pas d\'indexes sur les colonnes fréquemment recherchées',
    impact: 'Requêtes lentes (full table scan)',
    solution: 'Analyser query logs, créer indexes appropriés',
    prevention: 'EXPLAIN avant mise en prod'
  },
  {
    mistake: 'N+1 Query Problem',
    impact: 'Requêtes en cascade, latence élevée',
    solution: 'JOINs, eager loading, DataLoader pattern',
    prevention: 'Monitoring des requêtes, ORM configuré'
  },
  {
    mistake: 'Pas de backups automatisés',
    impact: 'Perte de données irréversible',
    solution: 'Backups quotidiens, tests de restauration',
    prevention: 'Infrastructure as Code, alertes'
  },
  {
    mistake: 'Stocker des données sensibles en clair',
    impact: 'Violation de données, conformité',
    solution: 'Chiffrement au repos, hashing (passwords)',
    prevention: 'Security audit, encryption by default'
  }
];

const sqlExamples = [
  {
    title: 'Requête de base',
    code: `SELECT u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 10;`
  },
  {
    title: 'Index optimization',
    code: `-- Créer un index composite
CREATE INDEX idx_users_created_status 
ON users(created_at, status);

-- Analyser une requête
EXPLAIN ANALYZE 
SELECT * FROM users 
WHERE created_at > '2024-01-01' 
  AND status = 'active';`
  },
  {
    title: 'Transaction sécurisée',
    code: `BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 100 
WHERE id = 1;

UPDATE accounts 
SET balance = balance + 100 
WHERE id = 2;

-- Vérifier les soldes
IF (SELECT balance FROM accounts WHERE id = 1) >= 0 THEN
    COMMIT;
ELSE
    ROLLBACK;
END IF;`
  }
];

export default function DatabaseSection({ className = '' }: DatabaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeType, setActiveType] = useState<string>('sql');
  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'examples'>('overview');
  const [activeExample, setActiveExample] = useState(0);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.db-card');
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

  const currentType = databaseTypes.find(t => t.id === activeType);

  return (
    <section
      ref={sectionRef}
      id="databases"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] bg-[#FF2ECC]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-[#2ED9FF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#FF2ECC] uppercase mb-4 block">
            Partie 4
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Bases de{' '}
            <span className="text-[#FF2ECC]">Données</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-2xl mx-auto">
            Choisissez la bonne technologie de persistance selon vos besoins en cohérence, 
            scalabilité et type de requêtes. Maîtrisez SQL et explorez les alternatives NoSQL.
          </p>
        </div>

        {/* Database Types Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {databaseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeType === type.id
                  ? 'text-white'
                  : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10 hover:text-[#F4F2F7]'
              }`}
              style={{
                backgroundColor: activeType === type.id ? type.color : undefined
              }}
            >
              <type.icon className="w-4 h-4" />
              {type.name}
            </button>
          ))}
        </div>

        {/* Database Type Detail */}
        {currentType && (
          <div className="db-card glass-card p-6 lg:p-8 mb-12">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: Database },
                { id: 'learning', label: 'Apprentissage', icon: BookOpen },
                { id: 'examples', label: 'Exemples SQL', icon: Lightbulb }
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

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Info */}
                <div>
                  <h3 
                    className="text-2xl font-bold mb-4 flex items-center gap-3"
                    style={{ color: currentType.color }}
                  >
                    <currentType.icon className="w-6 h-6" />
                    {currentType.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4 text-sm text-[#B8B2C6]">
                    <Clock className="w-4 h-4" />
                    <span>Temps d'apprentissage: <strong className="text-[#F4F2F7]">{currentType.timeToLearn}</strong></span>
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Exemples</p>
                    <div className="flex flex-wrap gap-2">
                      {currentType.examples.map((ex) => (
                        <span 
                          key={ex}
                          className="px-3 py-1 text-xs bg-white/5 text-[#F4F2F7] rounded-full"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="mb-6">
                    <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Caractéristiques</p>
                    <ul className="space-y-2">
                      {currentType.characteristics.map((char, i) => (
                        <li key={i} className="text-sm text-[#B8B2C6] flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: currentType.color }} />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Cas d'usage</p>
                    <div className="flex flex-wrap gap-2">
                      {currentType.useCases.map((use) => (
                        <span 
                          key={use}
                          className="px-3 py-1 text-xs border border-white/10 text-[#B8B2C6] rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Pros/Cons */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#00E676] mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Avantages
                    </h4>
                    <ul className="space-y-2">
                      {currentType.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-[#B8B2C6] flex items-start gap-2">
                          <span className="text-[#00E676]">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#FF2ECC] mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Limites
                    </h4>
                    <ul className="space-y-2">
                      {currentType.cons.map((con, i) => (
                        <li key={i} className="text-sm text-[#B8B2C6] flex items-start gap-2">
                          <span className="text-[#FF2ECC]">−</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="text-sm font-medium text-[#2ED9FF] mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Ressources
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentType.resources.map((res) => (
                        <span key={res} className="text-xs text-[#B8B2C6] bg-white/5 px-2 py-1 rounded">
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#00E676] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00E676]/20 flex items-center justify-center text-xs">1</span>
                    Débutant
                  </h4>
                  <ul className="space-y-2">
                    {currentType.learningPath.beginner.map((item, i) => (
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
                    {currentType.learningPath.intermediate.map((item, i) => (
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
                    {currentType.learningPath.advanced.map((item, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="text-[#FF2ECC]">★</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'examples' && activeType === 'sql' && (
              <div>
                <div className="flex gap-2 mb-4">
                  {sqlExamples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveExample(i)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                        activeExample === i
                          ? 'bg-[#2ED9FF] text-white'
                          : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                      }`}
                    >
                      {ex.title}
                    </button>
                  ))}
                </div>
                <pre className="bg-black/50 p-4 rounded-lg text-sm text-[#2ED9FF] font-mono overflow-x-auto">
                  {sqlExamples[activeExample].code}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Scaling Strategies */}
        <div className="db-card glass-card-sm p-6 mb-12">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-[#2ED9FF]" />
            Stratégies de Scaling
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scalingStrategies.map((strategy, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <h4 className="font-medium text-[#F4F2F7] mb-2">{strategy.title}</h4>
                <p className="text-xs text-[#B8B2C6] mb-3">{strategy.description}</p>
                <div className="space-y-1 text-xs">
                  <p><span className="text-[#00E676]">✓</span> {strategy.pros}</p>
                  <p><span className="text-[#FF2ECC]">✗</span> {strategy.cons}</p>
                </div>
                <p className="text-xs text-[#B8B2C6]/60 mt-2 pt-2 border-t border-white/10">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {strategy.when}
                </p>
                <p className="text-xs text-[#2ED9FF] mt-1">
                  🎓 {strategy.learn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CAP Theorem */}
        <div className="db-card glass-card-sm p-6 mb-12">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-4">
            Théorème CAP (Brewer)
          </h3>
          <p className="text-sm text-[#B8B2C6] mb-4">
            Un système distribué ne peut garantir que 2 des 3 propriétés suivantes simultanément :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { letter: 'C', name: 'Consistency', desc: 'Tous les nœuds voient les mêmes données', example: 'PostgreSQL, MongoDB (configuré)' },
              { letter: 'A', name: 'Availability', desc: 'Chaque requête reçoit une réponse', example: 'Cassandra, DynamoDB' },
              { letter: 'P', name: 'Partition Tolerance', desc: 'Le système continue malgré les pannes réseau', example: 'Tous les systèmes distribués' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-lg text-center">
                <span className="text-3xl font-bold text-[#2ED9FF] block mb-2">{item.letter}</span>
                <p className="font-medium text-[#F4F2F7] mb-1">{item.name}</p>
                <p className="text-xs text-[#B8B2C6] mb-2">{item.desc}</p>
                <p className="text-xs text-[#B8B2C6]/60">{item.example}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="db-card glass-card-sm p-6">
          <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#FF2ECC]" />
            Erreurs Courantes à Éviter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonDbMistakes.map((item, i) => (
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
                    <p className="text-xs text-[#B8B2C6]/60">
                      Prévention: {item.prevention}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
