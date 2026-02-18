import { Code2, Box, Layers, Zap, GitBranch, Cpu, BookOpen, Settings, Sparkles, Database, Target } from 'lucide-react';
import PageLayout, { SectionHeading, SubSection, ConceptBlock, KeyPoint, InfoCard } from './PageLayout';
import PythonCourse from '../sections/PythonCourse';
import type { SectionData } from './PageLayout';

const COLOR = '#3776AB';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <SectionHeading title="Python" subtitle="Ce que c'est profondément" color={COLOR} />
                <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-4">
                    <p>Python a été créé par Guido van Rossum en 1991 aux Pays-Bas. Son nom vient des Monty Python (la troupe comique britannique). Sa philosophie est résumée dans le "Zen of Python" — un poème de 19 aphorismes sur le bon design logiciel, accessible en tapant <code className="text-[#2ED9FF]">import this</code> dans Python.</p>
                    <p>Python est <strong className="text-[#F4F2F7]">interprété</strong> — exécuté ligne par ligne par l'interpréteur, pas compilé en code machine. Cela le rend plus lent que C ou Java mais bien plus rapide à développer. Il utilise l'indentation obligatoire (pas des accolades) pour définir les blocs de code — ce qui force la lisibilité.</p>
                </div>
            </>
        ),
    },
    {
        id: 'types',
        title: 'A.1 — Types de Données',
        icon: Box,
        content: (
            <>
                <SectionHeading title="Types de Données Python" color={COLOR} />
                <KeyPoint term="int">Entiers de taille arbitraire en Python. Pas de dépassement possible — Python gère automatiquement les grands nombres.</KeyPoint>
                <KeyPoint term="float">Nombres décimaux en double précision IEEE 754. Mêmes limitations que JS pour les décimales.</KeyPoint>
                <KeyPoint term="complex">Nombres complexes natifs (<code>3+4j</code>). Très utile en calcul scientifique.</KeyPoint>
                <KeyPoint term="str">Chaîne de caractères Unicode immuable. En Python 3, toutes les strings sont Unicode par défaut. Les f-strings (<code>f"Hello {'{name}'}"</code>) sont la façon moderne d'interpoler.</KeyPoint>
                <KeyPoint term="bytes">Séquence d'octets. Pour les données binaires, la communication réseau, les fichiers binaires.</KeyPoint>
                <KeyPoint term="bool"><code>True</code> ou <code>False</code>. Dérive de <code>int</code> (<code>True == 1</code>, <code>False == 0</code>).</KeyPoint>
                <InfoCard title="Valeurs falsy en Python" items={['None', '0', '0.0', '"" (chaîne vide)', '[] (liste vide)', '{} (dict vide)', '() (tuple vide)', 'set() (set vide)']} color={COLOR} />
                <KeyPoint term="None">L'équivalent Python de <code>null</code>. Représente l'absence de valeur. <code>None</code> est un singleton.</KeyPoint>
                <KeyPoint term="list">Tableau ordonné et mutable. Peut contenir des types différents. Supporte les slices <code>[start:stop:step]</code>.</KeyPoint>
                <KeyPoint term="tuple">Comme une list mais immuable. Plus rapide. Permet le tuple unpacking (déstructuration).</KeyPoint>
                <KeyPoint term="dict">Dictionnaire clé-valeur. Depuis Python 3.7, l'ordre d'insertion est garanti. Accès en O(1) en moyenne (hash table).</KeyPoint>
                <KeyPoint term="set">Collection non ordonnée d'éléments uniques. Opérations ensemblistes intégrées (union, intersection, différence).</KeyPoint>
                <KeyPoint term="frozenset">Comme set mais immuable. Peut être utilisé comme clé de dictionnaire.</KeyPoint>
            </>
        ),
    },
    {
        id: 'functions',
        title: 'A.2 — Fonctions',
        icon: Code2,
        content: (
            <>
                <SectionHeading title="Fonctions Python en Profondeur" color={COLOR} />
                <ConceptBlock title="Définition et Appel" color={COLOR}>
                    <p>La définition avec <code>def</code>. Les paramètres peuvent avoir des valeurs par défaut. Important : les valeurs par défaut sont évaluées <strong className="text-[#F4F2F7]">une seule fois</strong> à la définition de la fonction, pas à chaque appel. Piège classique avec les types mutables — utilisez <code>None</code> et créez la liste à l'intérieur.</p>
                </ConceptBlock>
                <KeyPoint term="*args & **kwargs"><code>*args</code> collecte les arguments positionnels supplémentaires dans un tuple. <code>**kwargs</code> collecte les arguments nommés supplémentaires dans un dict.</KeyPoint>
                <KeyPoint term="Docstrings">Triple guillemets juste après la définition. Documentation officielle de la fonction, accessible via <code>help()</code> et <code>.__doc__</code>.</KeyPoint>
                <KeyPoint term="Lambda">Fonctions anonymes d'une seule expression. Utiles comme arguments d'autres fonctions (sorted, map, filter).</KeyPoint>
                <KeyPoint term="Fonctions Pures">Retournent toujours le même résultat pour les mêmes entrées et ne modifient rien d'externe. Préférer les fonctions pures pour la testabilité et la prévisibilité.</KeyPoint>
            </>
        ),
    },
    {
        id: 'oop',
        title: 'A.3 — OOP',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Programmation Orientée Objet en Python" color={COLOR} />
                <KeyPoint term="Classes"><code>__init__</code> est le constructeur. <code>self</code> est la référence à l'instance courante — doit être le premier paramètre de toutes les méthodes d'instance.</KeyPoint>
                <KeyPoint term="Attributs">Attributs d'instance (définis dans <code>__init__</code> sur <code>self</code>) — chaque objet a les siens. Attributs de classe (dans le corps de la classe) — partagés entre toutes les instances.</KeyPoint>
                <KeyPoint term="Méthodes">Méthodes d'instance (prennent <code>self</code>), méthodes de classe (<code>@classmethod</code>, prennent <code>cls</code>), méthodes statiques (<code>@staticmethod</code>).</KeyPoint>
                <KeyPoint term="Propriétés"><code>@property</code> transforme une méthode en attribut. <code>@nom.setter</code> permet de contrôler l'assignation.</KeyPoint>
                <ConceptBlock title="Méthodes Spéciales (Dunder Methods)" color={COLOR}>
                    <p>Les méthodes avec doubles underscores définissent le comportement natif Python pour vos objets :</p>
                </ConceptBlock>
                <InfoCard title="Dunder Methods Essentiels" items={[
                    '__str__ : str(objet) et print() — représentation lisible',
                    '__repr__ : repr(objet) — représentation développeur',
                    '__len__ : len(objet)',
                    '__getitem__ / __setitem__ : objet[key]',
                    '__contains__ : opérateur in',
                    '__iter__ / __next__ : rendre l\'objet itérable',
                    '__add__, __sub__, __mul__ : surcharge arithmétique',
                    '__eq__, __lt__, __gt__ : surcharge comparaisons',
                    '__enter__ / __exit__ : context manager (with)',
                    '__call__ : rend l\'objet callable',
                ]} color={COLOR} />
                <KeyPoint term="Héritage"><code>class Child(Parent)</code>. Python supporte l'héritage multiple. Le MRO (Method Resolution Order) avec l'algorithme C3 détermine l'ordre.</KeyPoint>
                <KeyPoint term="Abstract Base Classes">Le module <code>abc</code> permet de définir des classes abstraites avec des méthodes abstraites obligatoires.</KeyPoint>
            </>
        ),
    },
    {
        id: 'comprehensions',
        title: 'A.4 — Compréhensions',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Compréhensions Python" subtitle="Syntaxe élégante pour créer des collections" color={COLOR} />
                <KeyPoint term="List Comprehension">Crée une liste avec condition de filtre optionnelle. Plus rapide qu'une boucle for.</KeyPoint>
                <KeyPoint term="Dict Comprehension">Crée un dictionnaire. Clé et valeur séparées par deux points.</KeyPoint>
                <KeyPoint term="Set Comprehension">Crée un set. Accolades sans deux points.</KeyPoint>
                <KeyPoint term="Generator Expression">Comme une list comprehension mais avec des parenthèses. <strong className="text-[#F4F2F7]">Ne crée pas la liste en mémoire</strong> — génère les valeurs une par une. Idéal pour les grands datasets.</KeyPoint>
            </>
        ),
    },
    {
        id: 'decorators',
        title: 'A.5 — Décorateurs',
        icon: GitBranch,
        content: (
            <>
                <SectionHeading title="Décorateurs Python" subtitle="Metaprogramming — des fonctions qui manipulent des fonctions" color={COLOR} />
                <ConceptBlock title="Comment ça fonctionne" color={COLOR}>
                    <p>Le <code>@decorator</code> avant une fonction est du sucre syntaxique pour <code>fonction = decorator(fonction)</code>. Le décorateur reçoit la fonction originale, crée une fonction wrapper qui ajoute du comportement avant/après, et retourne le wrapper.</p>
                </ConceptBlock>
                <KeyPoint term="functools.wraps">Décorateur de décorateur. Préserve les métadonnées de la fonction originale. Toujours l'utiliser.</KeyPoint>
                <KeyPoint term="Avec arguments">Pour passer des arguments au décorateur, il faut une couche supplémentaire — une fonction qui retourne le décorateur.</KeyPoint>
                <InfoCard title="Utilisations courantes" items={[
                    'Logging (enregistrer les appels)',
                    'Timing (mesurer la performance)',
                    'Validation des arguments',
                    'Authentification et autorisation',
                    'Caching / Mémoïsation (functools.lru_cache)',
                    'Retry (réessayer en cas d\'échec)',
                ]} color={COLOR} />
            </>
        ),
    },
    {
        id: 'generators',
        title: 'A.6 — Générateurs',
        icon: Zap,
        content: (
            <>
                <SectionHeading title="Générateurs et Itérateurs" color={COLOR} />
                <KeyPoint term="Protocole d'itération">Tout objet implémentant <code>__iter__()</code> et <code>__next__()</code> est itérable.</KeyPoint>
                <ConceptBlock title="Générateurs" color={COLOR}>
                    <p>Fonctions utilisant <code>yield</code>. Au lieu de retourner une valeur et de terminer, <code>yield</code> retourne une valeur et <strong className="text-[#F4F2F7]">suspend</strong> l'exécution. À l'appel suivant, la fonction reprend là où elle s'était arrêtée.</p>
                </ConceptBlock>
                <KeyPoint term="Avantages">Mémoire — génère les valeurs à la demande. Idéal pour les grandes séquences ou les flux infinis. Permet le <strong className="text-[#F4F2F7]">lazy evaluation</strong>.</KeyPoint>
                <KeyPoint term="send()">Le <code>yield</code> peut recevoir une valeur via <code>generator.send(value)</code>. Communication bidirectionnelle.</KeyPoint>
                <KeyPoint term="yield from">Délègue à un sous-générateur. Simplifie la composition de générateurs.</KeyPoint>
            </>
        ),
    },
    {
        id: 'exceptions',
        title: 'A.7 — Exceptions',
        icon: Settings,
        content: (
            <>
                <SectionHeading title="Gestion des Exceptions" color={COLOR} />
                <KeyPoint term="try/except/else/finally"><code>try</code> : code qui peut lever une exception. <code>except</code> : gérer l'exception. <code>else</code> : s'exécute si aucune exception. <code>finally</code> : s'exécute toujours.</KeyPoint>
                <KeyPoint term="Hiérarchie">Toutes héritent de <code>BaseException</code>. <code>Exception</code> est la classe de base des exceptions "ordinaires". Capturer <code>Exception</code> attrape la plupart des erreurs mais pas <code>KeyboardInterrupt</code> ou <code>SystemExit</code>.</KeyPoint>
                <KeyPoint term="Context Managers"><code>with</code> statement garantit le nettoyage des ressources même en cas d'exception. <code>contextlib.contextmanager</code> permet de créer des context managers avec un générateur.</KeyPoint>
            </>
        ),
    },
    {
        id: 'modules',
        title: 'A.8 — Modules & Packages',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Modules et Packages" color={COLOR} />
                <KeyPoint term="Module">Un fichier <code>.py</code>. L'import charge et exécute le fichier la première fois.</KeyPoint>
                <KeyPoint term="Package">Un dossier avec un fichier <code>__init__.py</code>. Le <code>__init__.py</code> s'exécute quand le package est importé.</KeyPoint>
                <KeyPoint term="Import système">Python cherche les modules dans : le répertoire courant, les chemins dans <code>PYTHONPATH</code>, les chemins d'installation standard.</KeyPoint>
                <KeyPoint term="__name__"><code>__name__ == "__main__"</code> est vrai seulement si le script est exécuté directement, pas importé.</KeyPoint>
                <KeyPoint term="__all__">Liste des noms à exporter quand quelqu'un fait <code>from module import *</code>. Bonne pratique pour contrôler l'interface publique.</KeyPoint>
            </>
        ),
    },
    {
        id: 'ai-ml',
        title: 'A.9 — IA/ML Libraries',
        icon: Cpu,
        content: (
            <>
                <SectionHeading title="Python pour l'IA/ML" subtitle="Les bibliothèques incontournables" color={COLOR} />
                <ConceptBlock title="NumPy" color="#4DABCF">
                    <p>La bibliothèque de calcul numérique. Le <code>ndarray</code> est la structure centrale. Toutes les opérations sont <strong className="text-[#F4F2F7]">vectorisées</strong> — s'appliquent à tout un tableau en une seule opération, en C sous le capot. Broadcasting — opérations entre tableaux de formes différentes.</p>
                </ConceptBlock>
                <ConceptBlock title="Pandas" color="#150458">
                    <p>Données tabulaires. <code>DataFrame</code> (tableau 2D), <code>Series</code> (colonne). Chargement depuis CSV, Excel, JSON, SQL. Filtrage, tri, groupement, agrégation, jointures. Gestion des données manquantes.</p>
                </ConceptBlock>
                <KeyPoint term="Matplotlib / Seaborn">Visualisation. Matplotlib est la base (contrôle fin mais verbeux). Seaborn est construit sur Matplotlib (statistiques, plus beau par défaut).</KeyPoint>
                <KeyPoint term="scikit-learn">Machine learning classique. API cohérente : <code>fit()</code>, <code>predict()</code>, <code>transform()</code>. Classification, régression, clustering.</KeyPoint>
                <KeyPoint term="TensorFlow / Keras">Deep learning par Google. Définir des modèles en couches, compiler, entraîner avec <code>fit()</code>.</KeyPoint>
                <KeyPoint term="PyTorch">Deep learning par Meta. Plus "pythonique" et flexible. Graphs dynamiques. Le préféré de la recherche académique.</KeyPoint>
                <KeyPoint term="Hugging Face">Bibliothèque de modèles pré-entraînés NLP (BERT, GPT, T5, LLaMA). Fine-tuning facile.</KeyPoint>
                <KeyPoint term="LangChain">Framework pour applications LLM. Chaînes, Agents, Memory, RAG.</KeyPoint>
            </>
        ),
    },
    {
        id: 'meta',
        title: 'B.1 — Métaprogrammation',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Métaprogrammation" subtitle="Concepts avancés" color="#FFD43B" />
                <KeyPoint term="Métaclasses">"Les classes sont des instances de métaclasses". <code>type</code> est la métaclasse par défaut. Contrôler la création de classes — modifier les attributs, valider la structure.</KeyPoint>
                <KeyPoint term="__getattr__">Appelé seulement si l'attribut n'est pas trouvé normalement.</KeyPoint>
                <KeyPoint term="__getattribute__">Appelé pour <strong className="text-[#F4F2F7]">tout</strong> accès d'attribut.</KeyPoint>
                <KeyPoint term="__slots__">Déclarer les attributs possibles. Économise mémoire et accélère l'accès. Utile pour des millions d'instances.</KeyPoint>
            </>
        ),
    },
    {
        id: 'concurrency',
        title: 'B.2 — Concurrence',
        icon: Database,
        content: (
            <>
                <SectionHeading title="Concurrence et Parallélisme" color="#FFD43B" />
                <ConceptBlock title="Le GIL (Global Interpreter Lock)" color="#FF6B35">
                    <p>Le GIL est un mutex qui protège l'accès aux objets Python, empêchant plusieurs threads d'exécuter du bytecode Python simultanément. Conséquence : les threads Python ne peuvent pas vraiment s'exécuter en parallèle pour du code CPU-bound.</p>
                </ConceptBlock>
                <KeyPoint term="Threading">Idéal pour les opérations I/O-bound. Pendant l'attente, le GIL est libéré.</KeyPoint>
                <KeyPoint term="Multiprocessing">Crée plusieurs processus séparés, chacun avec son propre GIL. Vrai parallélisme pour le code CPU-bound.</KeyPoint>
                <KeyPoint term="asyncio">Concurrence coopérative avec des coroutines. <code>async def</code> définit une coroutine. <code>await</code> pause l'exécution. Un seul thread, mais non-bloquant.</KeyPoint>
                <KeyPoint term="concurrent.futures">Interface haut niveau. <code>ThreadPoolExecutor</code> et <code>ProcessPoolExecutor</code>.</KeyPoint>
            </>
        ),
    },
    {
        id: 'course-module',
        title: 'Pratique & Ressources',
        icon: Target,
        content: (
            <div className="-mx-4 sm:-mx-8 lg:-mx-12 mt-8">
                <PythonCourse className="!py-0 !bg-transparent" />
            </div>
        ),
    },
];

export default function PythonPage() {
    return (
        <PageLayout
            title="Python"
            subtitle="Le couteau suisse de la programmation. IA/ML, data science, web, automatisation. Syntaxe élégante et philosophie de lisibilité."
            icon={Code2}
            color={COLOR}
            tag="⭐ Langage Essentiel #2"
            sections={sections}
            prevPage={{ title: 'JavaScript / TypeScript', path: '/javascript' }}
            nextPage={{ title: 'SQL', path: '/sql' }}
        />
    );
}
