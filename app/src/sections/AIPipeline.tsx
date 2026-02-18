import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, Database, Server, Globe, Cpu,
  Layers, Search, MessageSquare, Eye, Zap,
  BookOpen, Clock, AlertTriangle,
  CheckCircle2, Code2, Lightbulb, BarChart3
} from 'lucide-react';

interface AIPipelineProps {
  className?: string;
}

const mlPipelineStages = [
  {
    name: 'Collecte',
    icon: Database,
    color: '#2ED9FF',
    description: 'Acquisition des données brutes',
    tasks: ['Web scraping', 'APIs externes', 'User-generated content', 'Sensors/IoT'],
    outputs: 'Raw datasets (CSV, JSON, images)',
    learn: 'Data scraping, APIs, ETL basics'
  },
  {
    name: 'Stockage',
    icon: Server,
    color: '#7B2D8E',
    description: 'Persistance et versioning des données',
    tasks: ['Data lakes', 'Feature stores', 'Versioning (DVC)', 'Metadata tracking'],
    outputs: 'Versioned datasets, feature registry',
    learn: 'Data versioning, Feature stores'
  },
  {
    name: 'Traitement',
    icon: Layers,
    color: '#FFB300',
    description: 'Nettoyage et transformation',
    tasks: ['Cleaning (missing values)', 'Normalization', 'Feature engineering', 'Augmentation'],
    outputs: 'Clean datasets, feature vectors',
    learn: 'Pandas, Feature engineering'
  },
  {
    name: 'Entraînement',
    icon: Cpu,
    color: '#00E676',
    description: 'Apprentissage du modèle',
    tasks: ['Model selection', 'Hyperparameter tuning', 'Cross-validation', 'Distributed training'],
    outputs: 'Trained model artifacts',
    learn: 'Scikit-learn, PyTorch/TensorFlow'
  },
  {
    name: 'Évaluation',
    icon: CheckCircle2,
    color: '#FF2ECC',
    description: 'Validation des performances',
    tasks: ['Metrics (accuracy, F1, AUC)', 'Bias detection', 'A/B testing', 'Benchmarks'],
    outputs: 'Performance reports, model cards',
    learn: 'ML metrics, Model evaluation'
  },
  {
    name: 'Déploiement',
    icon: Server,
    color: '#2ED9FF',
    description: 'Mise en production',
    tasks: ['Model serving', 'Containerization', 'API endpoints', 'Edge deployment'],
    outputs: 'Production model endpoints',
    learn: 'MLflow, Docker, FastAPI'
  },
  {
    name: 'Inférence',
    icon: Zap,
    color: '#00E676',
    description: 'Prédictions en temps réel',
    tasks: ['Real-time inference', 'Batch prediction', 'Caching', 'Auto-scaling'],
    outputs: 'Predictions, embeddings',
    learn: 'Model optimization, Caching'
  },
  {
    name: 'Monitoring',
    icon: Eye,
    color: '#FF2ECC',
    description: 'Surveillance et maintenance',
    tasks: ['Drift detection', 'Performance tracking', 'Retraining triggers', 'Feedback loops'],
    outputs: 'Alerts, retraining pipelines',
    learn: 'ML monitoring, Observability'
  }
];

const ragArchitecture = [
  {
    step: 1,
    name: 'Ingestion',
    description: 'Documents → Chunks → Embeddings',
    details: ['Chunking strategy', 'Embedding model (OpenAI, HuggingFace)', 'Vector DB storage'],
    icon: Database,
    learn: 'Text chunking, Embedding models'
  },
  {
    step: 2,
    name: 'Retrieval',
    description: 'Query → Embedding → Similarity Search',
    details: ['Query embedding', 'K-NN search', 'Re-ranking', 'Context assembly'],
    icon: Search,
    learn: 'Vector search, Similarity metrics'
  },
  {
    step: 3,
    name: 'Generation',
    description: 'Context + Query → LLM → Response',
    details: ['Prompt engineering', 'Context window management', 'Streaming response'],
    icon: MessageSquare,
    learn: 'Prompt engineering, LLM APIs'
  }
];

const inferenceApproaches = [
  {
    name: 'Server-Side',
    icon: Server,
    color: '#2ED9FF',
    description: 'Inférence sur serveur cloud',
    pros: ['Modèles puissants (GPT-4, Claude)', 'Pas de téléchargement', 'Facile à mettre à jour'],
    cons: ['Latence réseau', 'Coût API', 'Dépendance externe'],
    useCases: ['Chatbots complexes', 'Génération de code', 'Analyse de documents'],
    examples: ['OpenAI API', 'Anthropic API', 'AWS Bedrock'],
    learn: 'API integration, Rate limiting, Caching'
  },
  {
    name: 'Browser-Side',
    icon: Globe,
    color: '#00E676',
    description: 'Inférence directement dans le navigateur',
    pros: ['Zero latency', 'Privacy totale', 'Pas de serveur'],
    cons: ['Modèles limités', 'Charge client', 'Compatibilité navigateur'],
    useCases: ['Classification temps réel', 'Détection d\'objets', 'Auto-complétion'],
    examples: ['TensorFlow.js', 'ONNX Runtime Web', 'Transformers.js'],
    learn: 'TensorFlow.js, Model quantization'
  },
  {
    name: 'Hybrid',
    icon: Layers,
    color: '#FFB300',
    description: 'Combinaison des deux approches',
    pros: ['Flexibilité', 'Fallback automatique', 'Optimisation des coûts'],
    cons: ['Complexité d\'architecture', 'Synchronisation'],
    useCases: ['Apps avec mode offline', 'Progressive enhancement'],
    examples: ['Client léger + API lourde', 'Edge functions'],
    learn: 'Architecture patterns, Edge computing'
  }
];

const aiUseCases = [
  {
    name: 'Recommandation',
    icon: Zap,
    description: 'Systèmes de recommandation personnalisée',
    techniques: ['Collaborative filtering', 'Content-based', 'Hybrid models', 'Matrix factorization'],
    metrics: ['Precision@K', 'Recall@K', 'NDCG', 'Diversity'],
    learn: 'Surprise lib, Matrix factorization'
  },
  {
    name: 'Recherche Sémantique',
    icon: Search,
    description: 'Recherche par sens, pas par mots-clés',
    techniques: ['Embeddings', 'Vector search', 'Reranking', 'Query expansion'],
    metrics: ['MRR', 'NDCG', 'Precision', 'Latency'],
    learn: 'Sentence transformers, Vector DBs'
  },
  {
    name: 'Chatbots & Agents',
    icon: MessageSquare,
    description: 'Assistants conversationnels intelligents',
    techniques: ['RAG', 'Function calling', 'Memory management', 'Multi-turn context'],
    metrics: ['Satisfaction user', 'Task completion', 'Response time'],
    learn: 'LangChain, OpenAI API, RAG'
  },
  {
    name: 'Computer Vision',
    icon: Eye,
    description: 'Analyse et compréhension d\'images',
    techniques: ['Object detection', 'Image classification', 'OCR', 'Face recognition'],
    metrics: ['mAP', 'Accuracy', 'IoU', 'Inference time'],
    learn: 'OpenCV, YOLO, PyTorch Vision'
  }
];

const mlLearningPath = [
  {
    stage: 'Fondations',
    duration: '4-6 semaines',
    topics: ['Python', 'NumPy/Pandas', 'Math (algèbre, stats)', 'Data visualization'],
    projects: 'Analyse de datasets, Visualisations'
  },
  {
    stage: 'Machine Learning',
    duration: '6-8 semaines',
    topics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Scikit-learn'],
    projects: 'Classification, Regression, Clustering'
  },
  {
    stage: 'Deep Learning',
    duration: '8-10 semaines',
    topics: ['Neural networks', 'CNNs', 'RNNs/LSTMs', 'PyTorch/TensorFlow'],
    projects: 'Image classifier, Text generator'
  },
  {
    stage: 'MLOps',
    duration: '4-6 semaines',
    topics: ['Model deployment', 'Monitoring', 'CI/CD for ML', 'Feature stores'],
    projects: 'API de prédiction, Pipeline ML'
  },
  {
    stage: 'LLMs & GenAI',
    duration: '6-8 semaines',
    topics: ['Transformers', 'Fine-tuning', 'RAG', 'Prompt engineering'],
    projects: 'Chatbot RAG, Agent autonome'
  }
];

const aiMistakes = [
  {
    mistake: 'Commencer par le Deep Learning sans les bases',
    impact: 'Compréhension superficielle, modèles mal conçus',
    solution: 'Maîtriser ML classique avant le deep learning',
    learn: 'Scikit-learn, ML fundamentals'
  },
  {
    mistake: 'Négliger la qualité des données',
    impact: 'Garbage in, garbage out - modèles inefficaces',
    solution: 'Data cleaning, EDA, feature engineering',
    learn: 'Pandas, Data quality assessment'
  },
  {
    mistake: 'Overfitting / Underfitting',
    impact: 'Modèle qui ne généralise pas',
    solution: 'Cross-validation, Regularization, Plus de données',
    learn: 'Model evaluation, Bias-variance tradeoff'
  },
  {
    mistake: 'Pas de monitoring en production',
    impact: 'Model drift, performances qui se dégradent',
    solution: 'ML monitoring, Retraining pipelines',
    learn: 'MLflow, Evidently, WhyLabs'
  }
];

const llmConcepts = [
  {
    concept: 'Prompt Engineering',
    description: 'Art de formuler des prompts efficaces',
    techniques: ['Zero-shot', 'Few-shot', 'Chain-of-thought', 'System prompts'],
    learn: 'Prompt patterns, Iterative refinement'
  },
  {
    concept: 'Embeddings',
    description: 'Représentation vectorielle du texte',
    techniques: ['Word2Vec', 'BERT', 'Sentence transformers', 'OpenAI embeddings'],
    learn: 'Vector semantics, Similarity search'
  },
  {
    concept: 'Fine-tuning',
    description: 'Adapter un modèle pré-entraîné',
    techniques: ['LoRA', 'QLoRA', 'Full fine-tuning', 'PEFT'],
    learn: 'Hugging Face, Parameter-efficient methods'
  },
  {
    concept: 'RAG',
    description: 'Retrieval-Augmented Generation',
    techniques: ['Vector search', 'Context injection', 'Re-ranking', 'Hybrid search'],
    learn: 'LangChain, Vector DBs, Chunking'
  }
];

export default function AIPipeline({ className = '' }: AIPipelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [activeInference, setActiveInference] = useState<string>('server');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'learning' | 'llm'>('pipeline');
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.ai-card');
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
      id="ai-pipeline"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#FF2ECC]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vw] bg-[#7B2D8E]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="mono text-xs tracking-[0.2em] text-[#FF2ECC] uppercase mb-4 block">
            Partie 6
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            IA &{' '}
            <span className="text-[#FF2ECC]">Machine Learning</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-2xl mx-auto">
            Pipeline ML end-to-end, architecture RAG, et stratégies d'inférence 
            pour intégrer l'intelligence artificielle dans vos applications.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'pipeline', label: 'Pipeline ML', icon: Layers },
            { id: 'learning', label: 'Parcours d\'apprentissage', icon: BookOpen },
            { id: 'llm', label: 'LLMs & Concepts', icon: Lightbulb }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF2ECC] text-white'
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
            {/* ML Pipeline */}
            <div className="ai-card glass-card p-6 lg:p-8 mb-12">
              <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#FF2ECC]" />
                Pipeline ML End-to-End
              </h3>

              {/* Pipeline Visualization */}
              <div className="flex flex-wrap justify-center gap-1 mb-8">
                {mlPipelineStages.map((stage, i) => (
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
                  <h4 className="font-medium text-[#F4F2F7] mb-2">Description</h4>
                  <p className="text-sm text-[#B8B2C6]">{mlPipelineStages[activeStage].description}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2">Tâches</h4>
                  <ul className="space-y-1">
                    {mlPipelineStages[activeStage].tasks.map((task, i) => (
                      <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                        <span className="text-[#00E676]">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2">À apprendre</h4>
                  <p className="text-sm text-[#2ED9FF]">🎓 {mlPipelineStages[activeStage].learn}</p>
                </div>
              </div>
            </div>

            {/* RAG Architecture */}
            <div className="ai-card glass-card p-6 lg:p-8 mb-12">
              <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#2ED9FF]" />
                Architecture RAG (Retrieval-Augmented Generation)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ragArchitecture.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="glass-card-sm p-5 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#2ED9FF]/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-[#2ED9FF]">{step.step}</span>
                        </div>
                        <step.icon className="w-5 h-5 text-[#2ED9FF]" />
                        <h4 className="font-bold text-[#F4F2F7]">{step.name}</h4>
                      </div>
                      <p className="text-sm text-[#B8B2C6] mb-3">{step.description}</p>
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-xs text-[#B8B2C6]/70 flex items-center gap-1">
                            <span className="text-[#00E676]">→</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-[#2ED9FF] mt-3">
                        🎓 {step.learn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inference Approaches */}
            <div className="ai-card glass-card-sm p-6 mb-12">
              <h3 className="text-lg font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#00E676]" />
                Approches d'Inférence
              </h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {inferenceApproaches.map((approach) => (
                  <button
                    key={approach.name}
                    onClick={() => setActiveInference(approach.name.toLowerCase().split('-')[0])}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeInference === approach.name.toLowerCase().split('-')[0]
                        ? 'text-white'
                        : 'bg-white/5 text-[#B8B2C6] hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: activeInference === approach.name.toLowerCase().split('-')[0] ? approach.color : undefined
                    }}
                  >
                    <approach.icon className="w-4 h-4" />
                    {approach.name}
                  </button>
                ))}
              </div>

              {/* Content */}
              {inferenceApproaches.map((approach) => (
                activeInference === approach.name.toLowerCase().split('-')[0] && (
                  <div key={approach.name} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-[#B8B2C6] mb-4">{approach.description}</p>
                      <div className="mb-4">
                        <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Avantages</p>
                        <ul className="space-y-1">
                          {approach.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                              <span className="text-[#00E676]">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Limites</p>
                        <ul className="space-y-1">
                          {approach.cons.map((con, i) => (
                            <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                              <span className="text-[#FF2ECC]">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Cas d'usage</p>
                        <ul className="space-y-1">
                          {approach.useCases.map((use, i) => (
                            <li key={i} className="text-sm text-[#B8B2C6] flex items-center gap-2">
                              <span className="text-[#2ED9FF]">→</span>
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs text-[#B8B2C6]/60 mb-2 uppercase tracking-wider">Exemples</p>
                        <div className="flex flex-wrap gap-2">
                          {approach.examples.map((ex) => (
                            <span key={ex} className="px-2 py-1 text-xs bg-white/10 text-[#B8B2C6] rounded">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#2ED9FF]">
                        🎓 {approach.learn}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Use Cases */}
            <div className="ai-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiUseCases.map((useCase) => (
                <div key={useCase.name} className="glass-card-sm p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#FF2ECC]/20 flex items-center justify-center mb-4">
                    <useCase.icon className="w-5 h-5 text-[#FF2ECC]" />
                  </div>
                  <h4 className="font-bold text-[#F4F2F7] mb-2">{useCase.name}</h4>
                  <p className="text-sm text-[#B8B2C6] mb-3">{useCase.description}</p>
                  <div className="mb-3">
                    <p className="text-xs text-[#B8B2C6]/60 mb-1">Techniques</p>
                    <div className="flex flex-wrap gap-1">
                      {useCase.techniques.slice(0, 2).map((tech) => (
                        <span key={tech} className="text-xs text-[#B8B2C6]/70">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-[#B8B2C6]/60 mb-1">Métriques</p>
                    <div className="flex flex-wrap gap-1">
                      {useCase.metrics.map((m) => (
                        <span key={m} className="px-2 py-0.5 text-xs bg-white/5 text-[#B8B2C6] rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#2ED9FF]">
                    🎓 {useCase.learn}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'learning' && (
          <div className="ai-card glass-card p-6 lg:p-8">
            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2ED9FF]" />
              Parcours d'Apprentissage ML/AI
            </h3>
            <div className="space-y-4">
              {mlLearningPath.map((stage, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#FF2ECC]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#FF2ECC]">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#F4F2F7]">{stage.stage}</h4>
                      <span className="text-xs text-[#B8B2C6] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stage.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {stage.topics.map((topic) => (
                        <span key={topic} className="text-xs text-[#B8B2C6] bg-white/5 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#2ED9FF]">
                      🎯 Projets: {stage.projects}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mistakes */}
            <div className="mt-8">
              <h4 className="text-lg font-bold text-[#F4F2F7] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF2ECC]" />
                Erreurs à Éviter
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiMistakes.map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
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
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'llm' && (
          <div className="ai-card glass-card p-6 lg:p-8">
            <h3 className="text-xl font-bold text-[#F4F2F7] mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#FFB300]" />
              Concepts Clés des LLMs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {llmConcepts.map((item, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium text-[#F4F2F7] mb-2">{item.concept}</h4>
                  <p className="text-sm text-[#B8B2C6] mb-3">{item.description}</p>
                  <div className="mb-3">
                    <p className="text-xs text-[#B8B2C6]/60 mb-1">Techniques:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.techniques.map((tech) => (
                        <span key={tech} className="text-xs text-[#B8B2C6] bg-white/5 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#2ED9FF]">
                    🎓 {item.learn}
                  </p>
                </div>
              ))}
            </div>

            {/* Resources */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium text-[#F4F2F7] mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00E676]" />
                Ressources Recommandées
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-[#B8B2C6]/60 mb-2">Cours</p>
                  <ul className="space-y-1 text-sm text-[#B8B2C6]">
                    <li>• Fast.ai Practical Deep Learning</li>
                    <li>• Andrew Ng ML Course</li>
                    <li>• Full Stack LLM Bootcamp</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-[#B8B2C6]/60 mb-2">Documentation</p>
                  <ul className="space-y-1 text-sm text-[#B8B2C6]">
                    <li>• Hugging Face Transformers</li>
                    <li>• PyTorch Tutorials</li>
                    <li>• LangChain Docs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-[#B8B2C6]/60 mb-2">Communautés</p>
                  <ul className="space-y-1 text-sm text-[#B8B2C6]">
                    <li>• r/MachineLearning</li>
                    <li>• Hugging Face Discord</li>
                    <li>• MLOps Community</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
