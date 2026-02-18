import { useRef, useState } from 'react';
import { Code2, BookOpen, Clock, AlertTriangle, Target, CheckCircle, Shield, Layers, Brain, GitBranch, Terminal, Database } from 'lucide-react';
import { cleanCodeContent } from '../data/courseContent';

interface CleanCodeCourseProps { className?: string; }

const goldenRules = [
    {
        id: 'naming', name: 'Règle 1 : Le Nimmage', color: '#00E676', icon: Code2,
        description: 'Le nommage représente 90% de la lisibilité. C\'est de la COMMUNICATION.',
        items: [
            { name: 'Variables', desc: 'Une variable est une BOÎTE qui contient une valeur. Son nom doit dire EXACTEMENT ce qu\'elle contient.', example: 'BAD: d, temp, val, data\nGOOD: distance_en_km, prix_ht, clients_actifs' },
            { name: 'Fonctions', desc: 'Une fonction est une ACTION. Son nom doit commencer par un VERBE.', example: 'BAD: process(), handle(), check()\nGOOD: calculer_total(), envoyer_email(), verifier_mot_de_passe()' },
            { name: 'Booléens', desc: 'Une QUESTION qui se répond par VRAI ou FAUX.', example: 'BAD: status, flag, valid\nGOOD: est_connecte, a_paye, peut_modifier' },
            { name: 'Constantes', desc: 'Une valeur qui NE CHANGE JAMAIS. En MAJUSCULES.', example: 'PI = 3.14159\nMAX_RETRY = 3\nAPI_URL = "https://..."' },
            { name: 'Conventions', desc: 'Cohérence absolue : snake_case (Python), camelCase (JS), PascalCase (Classes).', example: 'user_age (Python)\nuserAge (JS)\nUserAge (Class)' }
        ]
    },
    {
        id: 'srp', name: 'Règle 2 : SRP', color: '#FFD43B', icon: Layers,
        description: 'Single Responsibility Principle : Une fonction = Une responsabilité.',
        items: [
            { name: 'Le Principe', desc: 'Chaque fonction doit avoir UNE SEULE RAISON de changer.', example: 'Séparer Validation, Calcul, et Sauvegarde en 3 fonctions distinctes.' },
            { name: 'Signaux d\'alarme', desc: 'Si le nom contient "ET", si > 20 lignes, si > 3 paramètres.', example: 'valider_ET_sauvegarder() -> À diviser !' },
            { name: 'Fonction Orchestre', desc: 'Une fonction de haut niveau qui appelle les autres dans l\'ordre.', example: 'def process_order():\n  validate()\n  calc()\n  save()\n  notify()' }
        ]
    },
    {
        id: 'nesting', name: 'Règle 3 : Imbrications', color: '#FF6B35', icon: GitBranch,
        description: 'Éviter les pyramides ("Arrow Code"). Max 2 niveaux d\'imbrication.',
        items: [
            { name: 'Le Problème', desc: 'Chaque niveau ajoute une charge mentale. Au niveau 4, le cerveau décroche.', example: 'if user:\n  if admin:\n    if active:\n      ...' },
            { name: 'Retour Anticipé', desc: 'Vérifier les échecs d\'abord et sortir (return) immédiatement.', example: 'if not user: return\nif not admin: return\n# Code principal ici' },
            { name: 'Extraction', desc: 'Sortir les boucles imbriquées dans des fonctions dédiées.', example: 'Au lieu de 3 boucles imbriquées -> 3 fonctions qui s\'appellent.' }
        ]
    },
    {
        id: 'comments', name: 'Règle 4 : Commentaires', color: '#2ED9FF', icon: Terminal,
        description: 'Le POURQUOI, jamais le QUOI.',
        items: [
            { name: 'Type 1 : Paraphrase', desc: 'Mauvais. Répète le code. Inutile.', example: '// Ajoute 1 à i\ni = i + 1  (SUPPRIMER ce commentaire)' },
            { name: 'Type 2 : Compensation', desc: 'Mauvais. Compense un mauvais nommage.', example: '// x est l\'âge\nvar x = 10 (RENOMMER x en age)' },
            { name: 'Type 3 : Pourquoi', desc: 'Bon. Explique une décision métier ou technique non-évidente.', example: '// On attend 3s car l\'API tierce est lente' },
            { name: 'Type 4 : Doc', desc: 'Bon. Explique le BUT, PARAMÈTRES et RETOUR d\'une fonction publique.', example: '"""Calcule le prix TTC à partir du HT"""' }
        ]
    },
    {
        id: 'magic', name: 'Règle 5 : Nombres Magiques', color: '#FF2ECC', icon: AlertTriangle,
        description: 'Pas de nombres bruts dans le code.',
        items: [
            { name: 'Le Problème', desc: 'Que signifie 86400 ? Si ça change, faut-il le changer partout ?', example: 'sleep(86400) -> INCOMPRÉHENSIBLE' },
            { name: 'La Solution', desc: 'Utiliser des CONSTANTES nommées.', example: 'SECONDS_IN_DAY = 86400\nsleep(SECONDS_IN_DAY)' }
        ]
    },
    {
        id: 'dry', name: 'Règle 6 : DRY', color: '#7B2D8E', icon: CheckCircle,
        description: 'Don\'t Repeat Yourself. Une connaissance = Un seul endroit.',
        items: [
            { name: 'Le Risque', desc: 'Si tu copies-colles, tu devras corriger les bugs à 5 endroits différents.', example: 'Duplication de logique = Bugs garantis' },
            { name: 'Solution', desc: 'Fonctions réutilisables, paramètres variables.', example: 'Au lieu de 2 fonctions quasi-identiques, 1 fonction avec paramètres.' }
        ]
    },
    {
        id: 'errors', name: 'Règle 7 : Erreurs', color: '#F44336', icon: Shield,
        description: 'Les erreurs sont des certitudes, pas des exceptions.',
        items: [
            { name: 'Niveau 1 : Entrée', desc: 'Données invalides. Valider DÈS l\'arrivée.', example: 'Email sans @ -> Message clair à l\'utilisateur.' },
            { name: 'Niveau 2 : Technique', desc: 'Panne réseau, disque plein. Prévoir et Logger.', example: 'DB down -> Log technique + Message "Service indisponible" utilisateur.' },
            { name: 'Niveau 3 : Bug', desc: 'Erreur logique. Ne pas masquer ! Laisser planter pour corriger.', example: 'Division par zéro -> Corriger le code.' }
        ]
    }
];

const algorithmsPath = [
    {
        level: 'Niveau 1 : Fondations', color: '#00E676', icon: BookOpen,
        topics: [
            { title: 'Variables', desc: 'Boîtes typées : Int, Float, String, Bool, Null.' },
            { title: 'Conditions', desc: 'Carrefours : Si, Sinon Si, Sinon. Opérateurs logiques.' },
            { title: 'Boucles', desc: 'Répétition : Pour (For), Tant que (While). Sorties.' },
            { title: 'Fonctions', desc: 'Recettes réutilisables : Paramètres, Corps, Retour.' },
            { title: 'Tableaux', desc: 'Listes ordonnées indexées à partir de 0.' }
        ]
    },
    {
        level: 'Niveau 2 : Logique', color: '#FFB300', icon: Brain,
        topics: [
            { title: 'Modulo / Pair-Impair', desc: 'reste = n % 2.' },
            { title: 'Maximum / Minimum', desc: 'Le concept de "champion temporaire".' },
            { title: 'Compteurs', desc: 'Compter des occurrences (voyelles, etc.).' },
            { title: 'Inversion', desc: 'Parcourir à l\'envers ou échanger les extrémités.' },
            { title: 'Palindrome', desc: 'Deux pointeurs qui se rapprochent.' },
            { title: 'FizzBuzz', desc: 'Ordre des conditions (3 ET 5 avant 3 ou 5).' }
        ]
    },
    {
        level: 'Niveau 3 : Structures', color: '#2ED9FF', icon: Database,
        topics: [
            { title: 'Dictionnaire / HashMap', desc: 'Accès par clé (O(1)). Annuaire.' },
            { title: 'Pile (Stack)', desc: 'LIFO (Dernier entré, premier sorti). Assiettes, Ctrl+Z.' },
            { title: 'File (Queue)', desc: 'FIFO (Premier entré, premier sorti). File d\'attente.' },
            { title: 'Liste Chaînée', desc: 'Éléments liés par des pointeurs. Chasse au trésor.' },
            { title: 'Arbre', desc: 'Hiérarchie parent/enfant. Arbre binaire, DOM, Fichiers.' }
        ]
    },
    {
        level: 'Niveau 4 : Algos Essentiels', color: '#FF2ECC', icon: Target,
        topics: [
            { title: 'Recherche Linéaire', desc: 'Parcourir tout. Lent. O(n).' },
            { title: 'Recherche Binaire', desc: 'Diviser pour régner (Dichotomie). Liste triée requise. O(log n). Très rapide.' },
            { title: 'Tris Simples', desc: 'Bulles, Sélection, Insertion. Lents O(n²), mais instructifs.' },
            { title: 'Tris Rapides', desc: 'Fusion (Merge Sort), Rapide (Quick Sort). O(n log n).' },
            { title: 'Récursivité', desc: 'Fonction qui s\'appelle elle-même. Cas de base + Cas récursif.' }
        ]
    },
    {
        level: 'Niveau 5 : Algos Intermédiaires', color: '#7B2D8E', icon: Layers,
        topics: [
            { title: 'Deux Pointeurs', desc: 'Optimisation de parcours (somme cible, palindrome).' },
            { title: 'Fenêtre Glissante', desc: 'Sous-ensemble consécutif qui se déplace (sommes, chaînes).' },
            { title: 'BFS / DFS', desc: 'Parcours Graphes/Arbres. Largeur (File) vs Profondeur (Pile).' },
            { title: 'Gloutons (Greedy)', desc: 'Choix local optimal. Rendu de monnaie.' },
            { title: 'Prog. Dynamique (DP)', desc: 'Décomposer + Mémoïsation (Fibonacci optimisé).' },
            { title: 'Backtracking', desc: 'Explorer tout, revenir si impasse (Sudoku, Labyrinthe).' }
        ]
    }
];

const proHabits = [
    { title: 'Cycle : 30% Lire', desc: 'Comprendre l\'existant avant d\'écrire.' },
    { title: 'Cycle : 20% Planifier', desc: 'Papier, crayon, pseudocode.' },
    { title: 'Cycle : 30% Coder', desc: 'Traduire le plan.' },
    { title: 'Cycle : 15% Tester', desc: 'Cas normaux, limites, erreurs.' },
    { title: 'Cycle : 5% Refactorer', desc: 'Nettoyer après avoir fait marcher.' },
    { title: 'Tests', desc: 'Unitaires, Intégration, E2E. Le code sans test ne marche pas.' },
    { title: 'Git / Versioning', desc: 'Commit souvent. Message clair. Branches.' }
];

export default function CleanCodeCourse({ className = '' }: CleanCodeCourseProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState<'rules' | 'algos' | 'habits'>('rules');
    const [activeLevel, setActiveLevel] = useState(0);

    return (
        <section ref={sectionRef} className={`relative w-full bg-[#07040A] py-12 lg:py-24 ${className}`}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00E676]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#7B2D8E]/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="mono text-xs tracking-[0.2em] text-[#00E676] uppercase mb-4 block">Maîtrise & Excellence</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F2F7] mb-4">
                        <span className="text-[#00E676]">L'Art du Code</span>
                    </h2>
                    <p className="text-[#B8B2C6] max-w-3xl mx-auto">
                        Le code s'écrit pour des êtres humains, pas pour des machines.
                        Apprenez les règles d'or de la lisibilité et les algorithmes fondamentaux.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'rules' ? 'bg-[#00E676] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        <Shield className="w-4 h-4" /> Règles d'Or
                    </button>
                    <button
                        onClick={() => setActiveTab('algos')}
                        className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'algos' ? 'bg-[#2ED9FF] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        <Brain className="w-4 h-4" /> Algorithmes
                    </button>
                    <button
                        onClick={() => setActiveTab('habits')}
                        className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${activeTab === 'habits' ? 'bg-[#FFD43B] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        <Clock className="w-4 h-4" /> Habitudes Pro
                    </button>
                </div>

                {activeTab === 'rules' && (
                    <div className="grid grid-cols-1 gap-8">
                        {goldenRules.map((rule) => (
                            <div key={rule.id} className="glass-card p-8 rounded-2xl border border-white/5 bg-[#0A0A0A]/50 hover:bg-[#0A0A0A]/80 transition-colors">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-white/5" style={{ color: rule.color }}>
                                        <rule.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#F4F2F7]" style={{ color: rule.color }}>{rule.name}</h3>
                                        <p className="text-[#B8B2C6] text-lg mt-1">{rule.description}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rule.items.map((item, i) => (
                                        <div key={i} className="bg-black/40 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <h4 className="font-bold text-white mb-2">{item.name}</h4>
                                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
                                            <div className="bg-[#050505] p-3 rounded text-xs font-mono text-gray-300 border-l-2" style={{ borderColor: rule.color }}>
                                                <pre className="whitespace-pre-wrap">{item.example}</pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'algos' && (
                    <div className="glass-card p-8 rounded-2xl border border-white/5 bg-[#0A0A0A]/50">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {algorithmsPath.map((level, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveLevel(i)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${activeLevel === i ? 'bg-white/10 text-white border-b-2' : 'hover:bg-white/5 text-gray-400'}`}
                                    style={{ borderColor: activeLevel === i ? level.color : 'transparent' }}
                                >
                                    {level.level}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded bg-white/5" style={{ color: algorithmsPath[activeLevel].color }}>
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">{algorithmsPath[activeLevel].level}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {algorithmsPath[activeLevel].topics.map((topic, i) => (
                                    <div key={i} className="bg-black/40 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-2px]">
                                        <h4 className="font-bold text-[#F4F2F7] mb-2 text-lg">{topic.title}</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{topic.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'habits' && (
                    <div className="glass-card p-8 rounded-2xl border border-white/5 bg-[#0A0A0A]/50">
                        <h3 className="text-2xl font-bold text-[#FFD43B] mb-8 flex items-center gap-3">
                            <Target className="w-8 h-8" />
                            Cycle de Travail Quotidien
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {proHabits.map((habit, i) => (
                                <div key={i} className="bg-black/40 p-6 rounded-xl border border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <span className="text-6xl font-bold text-[#FFD43B]">{i + 1}</span>
                                    </div>
                                    <h4 className="font-bold text-[#F4F2F7] mb-3 relative z-10">{habit.title}</h4>
                                    <p className="text-sm text-gray-400 relative z-10">{habit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Structured Path for Consistency */}
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-[#F4F2F7] mb-8 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#7B2D8E]" /> 📚 Parcours de Spécialisation "Software Critic"
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {cleanCodeContent[0].modules.map((mod, i) => (
                            <div key={i} className="group p-5 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-[#F4F2F7]">{mod.title}</h4>
                                    <span className="text-[10px] text-[#B8B2C6] uppercase tracking-widest">{mod.duration}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {mod.topics.map((t, j) => (
                                        <span key={j} className="text-[10px] bg-white/5 text-[#B8B2C6] px-2 py-0.5 rounded border border-white/5">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 
