import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Code, BookOpen, Lightbulb, Terminal, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { icon: Code, text: 'Explique React hooks' },
  { icon: BookOpen, text: 'Qu\'est-ce que le MERN stack?' },
  { icon: Lightbulb, text: 'Comment débuter en AI/ML?' },
  { icon: Terminal, text: 'Différence SQL vs NoSQL' },
];

// System prompt for the AI tutor
const SYSTEM_PROMPT = `Tu es un assistant pédagogique expert en développement web full-stack. Tu aides les étudiants à comprendre les concepts de programmation, d'architecture logicielle, et de technologies web modernes.

Règles:
1. Réponds de manière claire et structurée avec des exemples de code quand pertinent
2. Utilise le formatage Markdown pour les listes, code blocks, et emphases
3. Adapte ton niveau d'explication au contexte de la question
4. Si la question concerne un concept complexe, explique-le étape par étape
5. Pour les questions sur les stacks (MERN, MEAN, etc.), explique chaque composante
6. Pour l'architecture, utilise des analogies et des diagrammes textuels si utile
7. Reste concis mais complet - environ 3-5 paragraphes maximum

Tu as accès aux connaissances sur:
- JavaScript, TypeScript, Python, Go, Rust, Java, Kotlin, PHP
- React, Vue, Angular, Next.js, Node.js, Express
- SQL, NoSQL, PostgreSQL, MongoDB, Redis
- Docker, Kubernetes, CI/CD, DevOps
- Architecture microservices, monolithe, serverless
- IA/ML, LLMs, embeddings, RAG
- Sécurité web, authentification, autorisation`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant IA propulsé par GLM-5. Posez-moi vos questions sur le développement full-stack, les architectures, ou l\'IA/ML !',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check Ollama connection on mount
  useEffect(() => {
    checkOllamaStatus();
  }, []);

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) {
        setOllamaStatus('connected');
      } else {
        setOllamaStatus('error');
      }
    } catch {
      setOllamaStatus('error');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const callOllama = async (userMessage: string, conversationHistory: Message[]) => {
    try {
      // Build context from conversation history (last 5 messages)
      const recentMessages = conversationHistory.slice(-5);
      const context = recentMessages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'glm-5:cloud',
          prompt: `${SYSTEM_PROMPT}\n\nConversation:\n${context.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')}\n\nUser: ${userMessage}\n\nAssistant:`,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 800,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Ollama request failed');
      }

      const data = await response.json();
      return data.response || 'Désolé, je n\'ai pas pu générer une réponse.';
    } catch (error) {
      console.error('Ollama error:', error);
      // Fallback to local knowledge base if Ollama is not available
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('mern') || lowerQ.includes('stack')) {
      return `## MERN Stack

Le **MERN Stack** est une stack JavaScript complète :

| Composante | Rôle | Description |
|------------|------|-------------|
| **M**ongoDB | Base de données | NoSQL orienté documents |
| **E**xpress | Backend | Framework web minimaliste |
| **R**eact | Frontend | Bibliothèque UI componentielle |
| **N**ode.js | Runtime | JavaScript côté serveur |

**Avantages** :
- Un seul langage (JavaScript) de bout en bout
- Écosystème NPM immense
- Parfait pour les SPAs modernes
- Courbe d'apprentissage progressive

**Cas d'usage** : Dashboards, réseaux sociaux, plateformes e-commerce, applications temps réel.`;
    }
    
    if (lowerQ.includes('react') || lowerQ.includes('hook')) {
      return `## React Hooks

Les **Hooks** permettent d'utiliser l'état et d'autres fonctionnalités React dans les composants fonctionnels :

### Hooks essentiels :

\`\`\`javascript
// useState - Gestion d'état
const [count, setCount] = useState(0);

// useEffect - Effets de bord
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// useContext - Accès au contexte
const theme = useContext(ThemeContext);

// useRef - Référence mutable
const inputRef = useRef(null);
\`\`\`

### Règles des Hooks :
1. Appeler uniquement au niveau supérieur (pas dans des conditions/boucles)
2. Appeler uniquement depuis des fonctions React
3. Les hooks personnalisés doivent commencer par "use"`;
    }
    
    if (lowerQ.includes('sql') || lowerQ.includes('nosql')) {
      return `## SQL vs NoSQL

| Critère | SQL | NoSQL |
|---------|-----|-------|
| **Structure** | Tables, lignes, colonnes | Documents, clé-valeur, graphes |
| **Schéma** | Rigide, défini à l'avance | Flexible, dynamique |
| **Relations** | Excellent support (JOINs) | Limité, dénormalisé |
| **Transactions** | ACID garanti | BASE (éventuellement cohérent) |
| **Scalabilité** | Verticale (plus de puissance) | Horizontale (plus de serveurs) |

### Quand utiliser quoi ?

**SQL** → Données structurées, relations complexes, transactions critiques
**NoSQL** → Données flexibles, haute volumétrie, scaling horizontal`;
    }
    
    if (lowerQ.includes('ai') || lowerQ.includes('ml') || lowerQ.includes('intelligence')) {
      return `## Intelligence Artificielle / Machine Learning

### Parcours d'apprentissage recommandé :

**1. Fondations** (3-6 mois)
- Python et bibliothèques (NumPy, Pandas)
- Mathématiques : algèbre linéaire, statistiques
- Manipulation de données

**2. Machine Learning classique** (3-6 mois)
- scikit-learn
- Algorithmes : régression, classification, clustering
- Évaluation et validation de modèles

**3. Deep Learning** (6-12 mois)
- TensorFlow ou PyTorch
- Réseaux de neurones, CNN, RNN, Transformers
- Computer Vision et NLP

**4. LLMs et applications modernes**
- OpenAI API, Hugging Face
- LangChain pour construire des applications
- RAG (Retrieval-Augmented Generation)`;
    }
    
    if (lowerQ.includes('architecture') || lowerQ.includes('microservice') || lowerQ.includes('monolithe')) {
      return `## Architecture Logicielle

### Microservices vs Monolithe

**Monolithe** :
- ✅ Simple à développer et déployer
- ✅ Performance (pas de latence réseau)
- ❌ Difficile à scaler sélectivement
- ❌ Couplage fort

**Microservices** :
- ✅ Scalabilité granulaire
- ✅ Équipes autonomes
- ✅ Résilience (isolation des pannes)
- ❌ Complexité opérationnelle
- ❌ Latence réseau entre services

### Recommandation :
> "Start with a modular monolith. Extract microservices only when you have a proven need and the operational maturity to support them." — Martin Fowler`;
    }
    
    return `Je suis désolé, je ne peux pas me connecter à Ollama en ce moment. Voici ce que je peux vous aider :

**Langages** : JavaScript, TypeScript, Python, Go, Rust, Java, Kotlin, PHP
**Frontend** : React, Vue, Angular, Next.js, Tailwind CSS
**Backend** : Node.js, Express, FastAPI, Django
**Bases de données** : PostgreSQL, MongoDB, Redis, Elasticsearch
**DevOps** : Docker, Kubernetes, CI/CD, Terraform
**Architecture** : Microservices, Serverless, JAMstack
**IA/ML** : LLMs, Embeddings, RAG, Computer Vision

Posez une question plus spécifique sur l'un de ces sujets !`;
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Call Ollama GLM-5
    const response = await callOllama(text, [...messages, userMessage]);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-br from-[#7B2D8E] to-[#2ED9FF] flex items-center justify-center shadow-xl shadow-[#7B2D8E]/30 transition-all ${
          isOpen ? 'scale-0 opacity-0' : ''
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00E676] rounded-full border-2 border-[#07040A]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[450px] h-[650px] max-h-[85vh] glass-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2D8E] to-[#2ED9FF] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F4F2F7]">AI Tutor</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${ollamaStatus === 'connected' ? 'bg-[#00E676]' : ollamaStatus === 'checking' ? 'bg-[#FFB300]' : 'bg-[#FF2ECC]'}`} />
                    <span className="text-xs text-[#B8B2C6]">
                      {ollamaStatus === 'connected' ? 'GLM-5 Connecté' : ollamaStatus === 'checking' ? 'Vérification...' : 'Mode Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-[#B8B2C6] hover:text-[#F4F2F7] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-[#7B2D8E]/30'
                        : 'bg-gradient-to-br from-[#7B2D8E] to-[#2ED9FF]'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-[#7B2D8E]" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-[#7B2D8E]/30 text-[#F4F2F7] rounded-br-md'
                        : 'bg-white/10 text-[#F4F2F7] rounded-bl-md'
                    }`}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0">
                          {line.startsWith('##') ? (
                            <span className="text-lg font-bold text-[#2ED9FF]">{line.replace('## ', '')}</span>
                          ) : line.startsWith('**') && line.endsWith('**') ? (
                            <span className="font-bold">{line.replace(/\*\*/g, '')}</span>
                          ) : line.startsWith('•') ? (
                            <span className="ml-2">{line}</span>
                          ) : line.startsWith('```') ? (
                            <code className="block bg-black/30 p-2 rounded my-2 font-mono text-xs overflow-x-auto">
                              {line.replace(/```/g, '')}
                            </code>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2D8E] to-[#2ED9FF] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#B8B2C6] animate-spin" />
                    <span className="text-sm text-[#B8B2C6]">GLM-5 réfléchit...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length < 3 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-[#B8B2C6] mb-2">Questions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-[#B8B2C6] hover:text-[#F4F2F7] rounded-full transition-colors"
                    >
                      <q.icon className="w-3 h-3" />
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-[#F4F2F7] placeholder-[#B8B2C6]/50 focus:outline-none focus:border-[#7B2D8E] transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-[#7B2D8E] hover:bg-[#9B3DB2] disabled:bg-[#7B2D8E]/50 flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-[#B8B2C6]/60 mt-2 text-center">
                Propulsé par Ollama + GLM-5
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
