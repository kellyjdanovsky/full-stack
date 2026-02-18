import { Braces, Box, Layers, Zap, Code2, GitBranch, Cpu, BookOpen, Settings, Sparkles, Target } from 'lucide-react';
import PageLayout, { SectionHeading, SubSection, ConceptBlock, KeyPoint, InfoCard } from './PageLayout';
import JavaScriptCourse from '../sections/JavaScriptCourse';
import type { SectionData } from './PageLayout';

const COLOR = '#FFD600';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <SectionHeading title="JavaScript / TypeScript" subtitle="Ce que c'est profondément" color={COLOR} />
                <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-4">
                    <p>
                        JavaScript est né en 1995 en 10 jours par Brendan Eich chez Netscape. Il était destiné à rendre les pages web interactives. Aujourd'hui, il est partout — navigateurs, serveurs (Node.js), applications desktop (Electron), mobile (React Native), et même les microcontrôleurs. C'est le seul langage qui s'exécute nativement dans tous les navigateurs du monde sans installation.
                    </p>
                    <p>
                        TypeScript est une surcouche créée par Microsoft en 2012. Il ajoute un système de types statiques à JavaScript. Il se "compile" (transpile) en JavaScript standard. Il ne change pas le comportement du code — il aide seulement à détecter les erreurs avant l'exécution.
                    </p>
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
                <SectionHeading title="Les Types de Données" subtitle="Les briques fondamentales de JavaScript" color={COLOR} />

                <ConceptBlock title="Types Primitifs" color={COLOR}>
                    <p>Les types primitifs sont les briques de base. Un type primitif est une valeur simple, non modifiable (immuable). Quand vous "modifiez" un primitif, vous créez en réalité une nouvelle valeur.</p>
                </ConceptBlock>

                <SubSection title="Number">
                    <p>En JavaScript, il n'y a qu'un seul type numérique pour les entiers ET les décimaux. Il utilise le format IEEE 754 à double précision (64 bits). Cela a des conséquences importantes :</p>
                    <p>Le calcul <code className="text-[#2ED9FF]">0.1 + 0.2</code> ne donne pas exactement <code className="text-[#2ED9FF]">0.3</code> mais <code className="text-[#2ED9FF]">0.30000000000000004</code>. C'est normal et universel dans presque tous les langages.</p>
                    <p>La valeur maximale sûre pour les entiers est <code className="text-[#2ED9FF]">Number.MAX_SAFE_INTEGER</code> (2^53 - 1). Pour des entiers plus grands, il faut utiliser <code className="text-[#2ED9FF]">BigInt</code>.</p>
                </SubSection>

                <SubSection title="String">
                    <p>Séquence de caractères Unicode. En JavaScript moderne, on préfère les template literals (backticks) qui permettent d'insérer des expressions directement dans la chaîne et de faire des chaînes multilignes. La concaténation avec <code className="text-[#2ED9FF]">+</code> est fonctionnelle mais les template literals sont plus lisibles et performants.</p>
                </SubSection>

                <SubSection title="Boolean">
                    <p>Valeur <code className="text-[#2ED9FF]">true</code> ou <code className="text-[#2ED9FF]">false</code>. Mais JavaScript a le concept de <strong className="text-[#F4F2F7]">truthy</strong> et <strong className="text-[#F4F2F7]">falsy</strong> : toute valeur peut être évaluée comme vraie ou fausse dans un contexte booléen.</p>
                    <InfoCard
                        title="Valeurs Falsy"
                        items={['false', '0', '"" (chaîne vide)', 'null', 'undefined', 'NaN']}
                        color={COLOR}
                    />
                    <p>Toutes les autres valeurs sont truthy — même un tableau vide <code className="text-[#2ED9FF]">[]</code> ou un objet vide <code className="text-[#2ED9FF]">{'{}'}</code>.</p>
                </SubSection>

                <SubSection title="undefined & null">
                    <KeyPoint term="undefined">Une variable déclarée mais pas encore affectée. Une fonction qui ne retourne rien retourne <code>undefined</code>. L'accès à une propriété inexistante d'un objet retourne <code>undefined</code>.</KeyPoint>
                    <KeyPoint term="null">L'absence intentionnelle de valeur. Là où <code>undefined</code> est "pas encore défini", <code>null</code> est "explicitement vide". Le fameux bug <code>typeof null === "object"</code> est un bug historique de JavaScript qui ne peut pas être corrigé pour ne pas casser le web.</KeyPoint>
                    <KeyPoint term="Symbol">Valeur unique et immuable. Utilisé pour créer des clés de propriétés d'objets garanties uniques. Avancé, rarement vu en code débutant.</KeyPoint>
                    <KeyPoint term="BigInt">Pour les entiers de taille arbitraire. Permet de dépasser <code>Number.MAX_SAFE_INTEGER</code>. Suffixe <code>n</code> : <code>9007199254740993n</code>.</KeyPoint>
                </SubSection>

                <ConceptBlock title="Types de Référence" color="#2ED9FF">
                    <p>Les types de référence sont des objets. Contrairement aux primitifs, quand vous assignez un objet à une variable, vous assignez une <strong className="text-[#F4F2F7]">référence</strong> (un pointeur) vers l'objet en mémoire, pas l'objet lui-même. C'est le concept fondamental à comprendre.</p>
                </ConceptBlock>

                <KeyPoint term="Object">La structure de données fondamentale. Une collection de paires clé-valeur. Les clés sont des strings ou Symbols, les valeurs peuvent être n'importe quoi. En JavaScript, presque tout est un objet : les arrays, les functions, les dates, les regex.</KeyPoint>
                <KeyPoint term="Array">Un objet spécial dont les clés sont des indices numériques. Il a une propriété <code>length</code> et des méthodes spécialisées. Un Array en JavaScript peut contenir des valeurs de types différents — c'est déconseillé mais possible.</KeyPoint>
                <KeyPoint term="Function">Les fonctions sont des <strong className="text-[#F4F2F7]">objets de première classe</strong> (First-class Functions). Elles peuvent être assignées à des variables, passées comme arguments, retournées depuis d'autres fonctions. Ce concept est fondamental pour les callbacks, les closures, la programmation fonctionnelle.</KeyPoint>
            </>
        ),
    },
    {
        id: 'variables',
        title: 'A.2 — Variables et Portée',
        icon: Settings,
        content: (
            <>
                <SectionHeading title="Variables et Portée" subtitle="var, let, const et le scoping" color={COLOR} />
                <KeyPoint term="var">L'ancienne façon (pre-ES6). Sa portée est au niveau de la <strong className="text-[#F4F2F7]">fonction</strong> (function-scoped), pas du bloc. Elle est <strong className="text-[#F4F2F7]">hoistée</strong> — déclarée mentalement en haut de sa fonction par le moteur JavaScript, même si vous l'écrivez en bas. Valeur hoistée : <code>undefined</code>. À éviter dans le code moderne.</KeyPoint>
                <KeyPoint term="let">Portée de <strong className="text-[#F4F2F7]">bloc</strong> (block-scoped) — existe seulement dans le bloc <code>{'{}'}</code> où elle est déclarée. Aussi hoistée mais dans une "Temporal Dead Zone" (TDZ) — toute utilisation avant la déclaration cause une <code>ReferenceError</code>. Peut être réassignée.</KeyPoint>
                <KeyPoint term="const">Portée de bloc. Doit être initialisée lors de la déclaration. Ne peut pas être <strong className="text-[#F4F2F7]">réassignée</strong> — mais attention : ça ne rend pas l'objet/tableau immuable ! Vous pouvez modifier les propriétés d'un objet <code>const</code>. Seulement la référence est protégée.</KeyPoint>
                <InfoCard
                    title="Règle de bonne pratique"
                    items={[
                        'Utiliser const par défaut',
                        'Passer à let uniquement si vous avez besoin de réassigner',
                        'Ne jamais utiliser var',
                    ]}
                    color="#00E676"
                />
            </>
        ),
    },
    {
        id: 'functions',
        title: 'A.3 — Les Fonctions',
        icon: Code2,
        content: (
            <>
                <SectionHeading title="Les Fonctions en Profondeur" color={COLOR} />
                <KeyPoint term="Function Declaration">Déclaration classique. Elle est complètement hoistée — vous pouvez l'appeler avant sa déclaration dans le code. Le moteur JS la traite en premier.</KeyPoint>
                <KeyPoint term="Function Expression">Assigner une fonction à une variable. Hoistée mais dans la TDZ si <code>let</code>/<code>const</code> — ne peut pas être appelée avant sa déclaration.</KeyPoint>
                <KeyPoint term="Arrow Functions">Syntaxe plus courte (ES6). Mais la différence cruciale n'est pas la syntaxe — c'est le comportement de <code>this</code>. Les arrow functions n'ont <strong className="text-[#F4F2F7]">pas leur propre <code>this</code></strong> — elles héritent du <code>this</code> de leur contexte lexical (là où elles sont écrites).</KeyPoint>
                <KeyPoint term="Paramètres par défaut">Assigner une valeur par défaut à un paramètre. Si l'argument n'est pas fourni (ou est <code>undefined</code>), la valeur par défaut est utilisée.</KeyPoint>
                <KeyPoint term="Rest Parameters">Collecter tous les arguments restants dans un tableau avec <code>...params</code>. Doit être en dernier paramètre.</KeyPoint>
                <KeyPoint term="Arguments object">Dans les fonctions régulières (pas arrow), l'objet <code>arguments</code> contient tous les arguments passés. À éviter en code moderne — préférer les rest parameters.</KeyPoint>
            </>
        ),
    },
    {
        id: 'closures',
        title: 'A.4 — Closures',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Closures (Fermetures)" subtitle="L'un des concepts les plus importants de JavaScript" color={COLOR} />
                <ConceptBlock title="Qu'est-ce qu'une Closure ?" color={COLOR}>
                    <p>Une <strong className="text-[#F4F2F7]">closure</strong> est une fonction qui "se souvient" de son environnement lexical (les variables de sa portée parente) même après que cette portée parente ait terminé son exécution.</p>
                    <p><strong className="text-[#F4F2F7]">Comment ça fonctionne :</strong> Quand vous créez une fonction à l'intérieur d'une autre fonction, la fonction interne a accès aux variables de la fonction externe. Quand la fonction externe termine, ses variables devraient être supprimées de la mémoire. Mais si la fonction interne est retournée et maintenue en vie, elle maintient une référence aux variables de la fonction externe — empêchant leur garbage collection.</p>
                </ConceptBlock>
                <InfoCard
                    title="Utilisations pratiques des closures"
                    items={[
                        'Créer des données privées (encapsulation)',
                        'Les factory functions (fonctions qui créent des fonctions)',
                        'Les modules (avant les modules ES6)',
                        'Les callbacks avec état',
                        'Les mémoïsations (cache de résultats)',
                        'Les event handlers avec état',
                    ]}
                    color={COLOR}
                />
                <ConceptBlock title="Le piège classique dans les boucles" color="#FF6B35">
                    <p>Quand on crée des fonctions dans une boucle <code>var</code>, toutes les fonctions partagent la même référence à la variable — elles "voient" toutes la valeur finale. Solution : utiliser <code>let</code> (crée un nouveau binding à chaque itération) ou une IIFE (Immediately Invoked Function Expression) pour capturer la valeur à chaque itération.</p>
                </ConceptBlock>
            </>
        ),
    },
    {
        id: 'prototypes',
        title: 'A.5 — Prototypes & Héritage',
        icon: GitBranch,
        content: (
            <>
                <SectionHeading title="Le Prototype et l'Héritage" subtitle="JavaScript est basé sur les prototypes, pas sur les classes" color={COLOR} />
                <ConceptBlock title="La chaîne de prototypes" color={COLOR}>
                    <p>Chaque objet JavaScript a une propriété interne <code>[​[Prototype]​]</code> (accessible via <code>__proto__</code> ou <code>Object.getPrototypeOf()</code>). Quand vous accédez à une propriété sur un objet, JavaScript cherche d'abord sur l'objet lui-même. Si pas trouvée, il remonte dans la chaîne de prototypes jusqu'à trouver ou jusqu'à <code>null</code>.</p>
                </ConceptBlock>
                <KeyPoint term="Object.prototype">Au sommet de la chaîne de prototypes. Contient les méthodes communes à tous les objets : <code>toString()</code>, <code>hasOwnProperty()</code>, <code>valueOf()</code>.</KeyPoint>
                <KeyPoint term="Constructor Functions">Avant ES6, on créait des "classes" avec des fonctions constructeurs et le mot-clé <code>new</code>. Le <code>new</code> fait 4 choses : crée un nouvel objet vide, lie son prototype, exécute la fonction avec <code>this</code> pointant vers le nouvel objet, retourne le nouvel objet.</KeyPoint>
                <KeyPoint term="Classes ES6">La syntaxe <code>class</code> est plus lisible et familière. Sous le capot, c'est toujours du prototype. <code>extends</code> établit la chaîne de prototypes. <code>super()</code> appelle le constructeur parent. Les méthodes sont ajoutées au prototype (pas à chaque instance), donc partagées efficacement.</KeyPoint>
            </>
        ),
    },
    {
        id: 'eventloop',
        title: 'A.6 — Event Loop',
        icon: Zap,
        content: (
            <>
                <SectionHeading title="Le Event Loop et l'Asynchronisme" subtitle="LE concept le plus important de JavaScript" color={COLOR} />
                <ConceptBlock title="JavaScript est single-threaded" color="#FF2ECC">
                    <p>Il n'exécute qu'une seule chose à la fois. Il n'a qu'une Call Stack (pile d'appels). Alors comment gère-t-il les opérations asynchrones sans bloquer ?</p>
                </ConceptBlock>
                <KeyPoint term="Call Stack">Structure LIFO (Last In, First Out). Quand vous appelez une fonction, elle est empilée. Quand elle termine, elle est dépilée.</KeyPoint>
                <KeyPoint term="Web APIs">Les opérations asynchrones (<code>setTimeout</code>, <code>fetch</code>, <code>addEventListener</code>) ne sont pas gérées par le moteur JS mais par les APIs du navigateur ou de Node. Le JS continue son exécution.</KeyPoint>
                <KeyPoint term="Callback Queue">Quand le timer expire (ou qu'une requête réseau termine), le callback est mis en attente dans cette queue.</KeyPoint>
                <KeyPoint term="Event Loop">Son unique travail : regarder si la Call Stack est vide. Si oui, prendre le premier callback de la Callback Queue et le pousser dans la Call Stack. Si la Call Stack n'est pas vide, attendre.</KeyPoint>
                <KeyPoint term="Microtask Queue">Les Promises et <code>queueMicrotask</code> utilisent une queue séparée, traitée avec une <strong className="text-[#F4F2F7]">priorité plus haute</strong> que la Callback Queue. Après chaque tâche, TOUTES les microtasks sont traitées avant la prochaine tâche.</KeyPoint>
                <InfoCard
                    title="Ordre d'exécution"
                    items={[
                        'Code synchrone',
                        'Microtasks (Promises)',
                        'Tasks (setTimeout, setInterval, événements)',
                    ]}
                    color="#2ED9FF"
                />
            </>
        ),
    },
    {
        id: 'promises',
        title: 'A.7 — Promises & Async/Await',
        icon: Cpu,
        content: (
            <>
                <SectionHeading title="Promises et Async/Await" color={COLOR} />
                <KeyPoint term="Callbacks">La première approche de l'asynchronisme. Problème : le <strong className="text-[#F4F2F7]">Callback Hell</strong> (pyramide de la mort) quand on imbrique plusieurs opérations asynchrones.</KeyPoint>
                <ConceptBlock title="Promises" color={COLOR}>
                    <p>Un objet représentant une valeur qui sera disponible dans le futur. Trois états possibles : <code>pending</code> (en attente), <code>fulfilled</code> (résolue), <code>rejected</code> (rejetée). Les Promises permettent de chaîner les opérations avec <code>.then()</code> et de gérer les erreurs avec <code>.catch()</code>. <code>.finally()</code> s'exécute dans tous les cas.</p>
                </ConceptBlock>
                <KeyPoint term="Promise.all()">Attend que TOUTES les promises se résolvent. Si une seule est rejetée, tout échoue. Les promises s'exécutent en parallèle.</KeyPoint>
                <KeyPoint term="Promise.allSettled()">Attend que TOUTES les promises se terminent, qu'elles réussissent ou échouent.</KeyPoint>
                <KeyPoint term="Promise.race()">Retourne dès que LA PREMIÈRE promise se résout ou se rejette.</KeyPoint>
                <KeyPoint term="Promise.any()">Retourne dès que LA PREMIÈRE promise se résout avec succès.</KeyPoint>
                <ConceptBlock title="Async/Await" color="#2ED9FF">
                    <p>Sucre syntaxique sur les Promises. Le mot-clé <code>async</code> devant une fonction fait qu'elle retourne toujours une Promise. Le mot-clé <code>await</code> peut seulement être utilisé dans une fonction <code>async</code>. Il "pause" l'exécution de la fonction async jusqu'à ce que la Promise se resolve — mais sans bloquer le thread ! L'Event Loop peut continuer à traiter d'autres choses pendant ce temps. Gestion des erreurs avec <code>try/catch</code>.</p>
                </ConceptBlock>
            </>
        ),
    },
    {
        id: 'dom',
        title: 'A.8 — Le DOM',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Le DOM (Document Object Model)" subtitle="La représentation en mémoire de la structure HTML" color={COLOR} />
                <KeyPoint term="Sélection"><code>querySelector()</code> retourne le premier élément correspondant. <code>querySelectorAll()</code> retourne tous les éléments sous forme de NodeList.</KeyPoint>
                <KeyPoint term="Modification contenu"><code>textContent</code> modifie le texte (sûr contre le XSS). <code>innerHTML</code> modifie le HTML (attention au XSS si vous insérez des données utilisateur non filtrées).</KeyPoint>
                <KeyPoint term="Modification styles">Via la propriété <code>style</code> pour les styles inline, ou <code>classList</code> pour ajouter/supprimer/toggler des classes CSS. Préférer <code>classList</code>.</KeyPoint>
                <KeyPoint term="Création éléments"><code>createElement()</code> crée un élément. <code>appendChild()</code>, <code>insertBefore()</code>, <code>insertAdjacentElement()</code> l'insèrent dans le DOM.</KeyPoint>
                <KeyPoint term="Événements"><code>addEventListener()</code> attache un listener. L'objet <code>event</code> contient : <code>event.target</code>, <code>event.type</code>, <code>event.preventDefault()</code>, <code>event.stopPropagation()</code>.</KeyPoint>
                <KeyPoint term="Event Bubbling">Par défaut, les événements remontent de l'élément cible vers la racine du DOM. En capturing (troisième argument <code>true</code>), ils descendent.</KeyPoint>
                <KeyPoint term="Event Delegation">Au lieu d'attacher des listeners à chaque élément enfant, attacher un seul listener au parent. Plus efficace en mémoire, fonctionne avec les éléments ajoutés dynamiquement.</KeyPoint>
            </>
        ),
    },
    {
        id: 'modules',
        title: 'A.9 — Modules ES6',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Modules ES6" color={COLOR} />
                <KeyPoint term="export">Exporter des valeurs depuis un module. Named exports (multiples par fichier) et default export (un seul par fichier).</KeyPoint>
                <KeyPoint term="import">Importer des valeurs depuis un module. Les imports sont statiques (analysés au chargement), permettant le tree-shaking (éliminer le code non utilisé au build).</KeyPoint>
                <KeyPoint term="Dynamic imports"><code>import()</code> est une fonction qui importe un module à la demande, retourne une Promise. Utilisé pour le code splitting.</KeyPoint>
            </>
        ),
    },
    {
        id: 'es6plus',
        title: 'A.10 — JavaScript Moderne',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="JavaScript Moderne (ES6+)" color={COLOR} />
                <KeyPoint term="Destructuring">Extraire des valeurs d'objets ou de tableaux dans des variables. Fonctionne avec les valeurs imbriquées. Permet des valeurs par défaut. On peut renommer les variables lors de la destructuration.</KeyPoint>
                <KeyPoint term="Spread ...">Étendre un itérable dans des éléments individuels. Pour copier des tableaux/objets (attention : c'est une copie superficielle). Pour fusionner des tableaux ou objets.</KeyPoint>
                <KeyPoint term="Optional Chaining ?.">Accéder à des propriétés imbriquées sans risquer une erreur si un intermédiaire est <code>null</code> ou <code>undefined</code>. Retourne <code>undefined</code> si la chaîne est rompue.</KeyPoint>
                <KeyPoint term="Nullish Coalescing ??">Retourner la valeur de droite seulement si la valeur de gauche est <code>null</code> ou <code>undefined</code> (pas seulement falsy). Différent de <code>||</code> qui se déclenche pour toute valeur falsy.</KeyPoint>
                <KeyPoint term="Iterateurs & Générateurs">Un itérateur a une méthode <code>next()</code> retournant <code>{'{value, done}'}</code>. Un générateur est une fonction qui peut être pausée et reprendre avec <code>yield</code>.</KeyPoint>
                <KeyPoint term="WeakMap / WeakSet">Comme Map et Set mais avec des références faibles. Les objets peuvent être garbage collected même s'ils sont dans un WeakMap/WeakSet.</KeyPoint>
            </>
        ),
    },
    {
        id: 'ts-types',
        title: 'B.1 — Système de Types TS',
        icon: Braces,
        content: (
            <>
                <SectionHeading title="TypeScript — Le Système de Types" subtitle="Types de base et avancés" color="#3178C6" />
                <KeyPoint term="Types de base"><code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>.</KeyPoint>
                <KeyPoint term="any">Désactive le vérificateur de types — à éviter.</KeyPoint>
                <KeyPoint term="unknown">Comme <code>any</code> mais sûr — vous devez vérifier le type avant d'utiliser.</KeyPoint>
                <KeyPoint term="never">Valeur qui n'existe jamais — retour d'une fonction qui throw toujours ou boucle infinie.</KeyPoint>
                <KeyPoint term="void">Pas de retour utile — comme <code>undefined</code>.</KeyPoint>
                <KeyPoint term="Type Inference">TypeScript peut souvent déduire le type sans que vous le déclariez. Ne déclarez les types que quand l'inférence ne suffit pas.</KeyPoint>
                <KeyPoint term="Interfaces">Définissent la structure d'un objet. Elles sont "open" — vous pouvez les étendre et les fusionner.</KeyPoint>
                <KeyPoint term="Type Aliases">Similaires aux interfaces mais plus flexibles. Peuvent définir des unions, intersections, types utilitaires.</KeyPoint>
                <KeyPoint term="Union Types">Un valeur peut être de plusieurs types : <code>string | number</code>. Vous devez d'abord narrower le type avec une type guard.</KeyPoint>
                <KeyPoint term="Intersection Types">Combiner plusieurs types en un seul : <code>TypeA & TypeB</code>.</KeyPoint>
                <KeyPoint term="Literal Types">Restreindre à des valeurs spécifiques : <code>"get" | "post" | "put"</code>.</KeyPoint>
            </>
        ),
    },
    {
        id: 'ts-generics',
        title: 'B.2 — Generics',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Generics (Génériques)" subtitle="Composants qui fonctionnent avec plusieurs types" color="#3178C6" />
                <ConceptBlock title="Concept fondamental" color="#3178C6">
                    <p>Au lieu d'écrire une fonction séparée pour chaque type, vous écrivez une fonction générique avec un paramètre de type <code>&lt;T&gt;</code>. Le type concret est déterminé à l'utilisation.</p>
                </ConceptBlock>
                <KeyPoint term="Contraintes"><code>&lt;T extends SomeType&gt;</code> impose que <code>T</code> doit être au moins du type <code>SomeType</code>.</KeyPoint>
                <KeyPoint term="Multiple parameters"><code>&lt;T, K&gt;</code> pour des relations entre types. Exemple classique : <code>&lt;T, K extends keyof T&gt;</code> garantit que <code>K</code> est une clé valide de <code>T</code>.</KeyPoint>
            </>
        ),
    },
    {
        id: 'ts-utilities',
        title: 'B.3 — Types Utilitaires',
        icon: Settings,
        content: (
            <>
                <SectionHeading title="Types Utilitaires Intégrés" subtitle="Transformations de types existants" color="#3178C6" />
                <KeyPoint term="Partial<T>">Rend toutes les propriétés optionnelles. Utile pour les fonctions de mise à jour partielle.</KeyPoint>
                <KeyPoint term="Required<T>">Inverse — rend toutes les propriétés obligatoires.</KeyPoint>
                <KeyPoint term="Readonly<T>">Rend toutes les propriétés en lecture seule.</KeyPoint>
                <KeyPoint term="Pick<T, K>">Crée un type avec uniquement les propriétés K de T.</KeyPoint>
                <KeyPoint term="Omit<T, K>">Crée un type en excluant les propriétés K de T.</KeyPoint>
                <KeyPoint term="Record<K, V>">Crée un type d'objet avec des clés de type K et des valeurs de type V.</KeyPoint>
                <KeyPoint term="Exclude<T, U>">Retire de T les types qui sont dans U.</KeyPoint>
                <KeyPoint term="Extract<T, U>">Garde de T seulement les types qui sont dans U.</KeyPoint>
                <KeyPoint term="NonNullable<T>">Retire <code>null</code> et <code>undefined</code> de T.</KeyPoint>
                <KeyPoint term="ReturnType<T>">Extrait le type de retour d'une fonction.</KeyPoint>
                <KeyPoint term="Parameters<T>">Extrait les types des paramètres d'une fonction comme un tuple.</KeyPoint>
            </>
        ),
    },
    {
        id: 'ts-advanced',
        title: 'B.4 — Types Avancés',
        icon: Cpu,
        content: (
            <>
                <SectionHeading title="Types Avancés" color="#3178C6" />
                <KeyPoint term="Conditional Types"><code>T extends U ? X : Y</code>. Les types peuvent dépendre d'une condition. Très puissant pour créer des types utilitaires personnalisés.</KeyPoint>
                <KeyPoint term="Mapped Types">Créer de nouveaux types en transformant les propriétés d'un type existant. La base de <code>Partial</code>, <code>Required</code>, <code>Readonly</code>.</KeyPoint>
                <KeyPoint term="Template Literal Types">Créer des types de chaînes dynamiques avec des template literals au niveau des types.</KeyPoint>
                <KeyPoint term="Infer">Dans les conditional types, <code>infer</code> permet d'extraire un type. Utilisé dans <code>ReturnType</code> et <code>Parameters</code>.</KeyPoint>
                <KeyPoint term="Discriminated Unions">Union de types d'objets qui partagent une propriété "discriminant" avec des valeurs littérales différentes. TypeScript peut narrower automatiquement le type dans un switch sur le discriminant.</KeyPoint>
            </>
        ),
    },
    {
        id: 'course-module',
        title: 'Pratique & Ressources',
        icon: Target,
        content: (
            <div className="-mx-4 sm:-mx-8 lg:-mx-12 mt-8">
                <JavaScriptCourse className="!py-0 !bg-transparent" />
            </div>
        ),
    },
];

export default function JavaScriptPage() {
    return (
        <PageLayout
            title="JavaScript / TypeScript"
            subtitle="Le langage universel du web. Des navigateurs aux serveurs, il est partout. TypeScript ajoute la puissance du typage statique."
            icon={Braces}
            color={COLOR}
            tag="⭐ Langage Essentiel #1"
            sections={sections}
            nextPage={{ title: 'Python', path: '/python' }}
        />
    );
}
