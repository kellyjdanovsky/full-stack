import { Server, Box, Layers, Zap, Code2, BookOpen, Settings, Sparkles, Cpu, GitBranch } from 'lucide-react';
import PageLayout, { SectionHeading, ConceptBlock, KeyPoint, InfoCard } from './PageLayout';
import type { SectionData } from './PageLayout';

const COLOR = '#00ADD8';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <SectionHeading title="Go (Golang)" subtitle="Ce que c'est profondément" color={COLOR} />
                <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-4">
                    <p>Go a été créé chez Google en 2007 par Robert Griesemer, Rob Pike et Ken Thompson. Objectif : la performance du C avec la simplicité du Python. Go est <strong className="text-[#F4F2F7]">compilé</strong> en code machine natif. Gestion de la mémoire par garbage collector. Les binaires Go sont <strong className="text-[#F4F2F7]">auto-suffisants</strong> — pas besoin d'installer un runtime. Go est opinioné — il y a souvent une seule façon de faire les choses.</p>
                </div>
            </>
        ),
    },
    {
        id: 'types',
        title: 'A.1 — Système de Types',
        icon: Box,
        content: (
            <>
                <SectionHeading title="Système de Types Go" color={COLOR} />
                <InfoCard title="Types de base" items={[
                    'int, int8, int16, int32, int64 — uint (non signé)',
                    'float32, float64 — complex64, complex128',
                    'bool — string (immuable, UTF-8)',
                    'byte (alias uint8) — rune (alias int32, Unicode)',
                ]} color={COLOR} />
                <KeyPoint term=":= (Short declaration)">Typage statique mais inféré. À l'intérieur d'une fonction, <code>:=</code> déclare + assigne + infère le type. <code>var</code> est nécessaire au niveau du package.</KeyPoint>
                <ConceptBlock title="Zero Values" color={COLOR}>
                    <p>Chaque type a une valeur zéro (défaut). <code>0</code> pour les nombres, <code>false</code> pour les booléens, <code>""</code> pour les strings, <code>nil</code> pour les pointeurs, slices, maps, channels, interfaces. Les variables sont toujours initialisées.</p>
                </ConceptBlock>
                <KeyPoint term="Arrays">Taille fixe à la compilation. Valeur sémantique — passer un array crée une copie.</KeyPoint>
                <KeyPoint term="Slices">Structure de données principale pour les listes. Référence vers un array sous-jacent avec longueur et capacité. <code>make([]Type, len, cap)</code>. <code>append()</code> peut créer un nouvel array si capacité dépassée.</KeyPoint>
                <KeyPoint term="Maps">Dictionnaires. Doivent être initialisées avec <code>make()</code>. Accès à clé inexistante retourne la zero value. Second retour indique si la clé existe.</KeyPoint>
                <KeyPoint term="Structs">Structure personnalisée. Sont des valeurs — copiées lors des assignations. Passer un pointeur pour modifier dans une fonction.</KeyPoint>
            </>
        ),
    },
    {
        id: 'pointers',
        title: 'A.2 — Pointeurs',
        icon: Settings,
        content: (
            <>
                <SectionHeading title="Pointeurs en Go" subtitle="Pointeurs sans arithmétique — moins dangereux que C" color={COLOR} />
                <KeyPoint term="&variable">Retourne l'adresse mémoire (un pointeur).</KeyPoint>
                <KeyPoint term="*pointeur">Déréférence le pointeur (accède à la valeur).</KeyPoint>
                <InfoCard title="Quand utiliser les pointeurs" items={[
                    'Modifier une variable dans une fonction (passer par référence)',
                    'Grandes structures (éviter la copie coûteuse)',
                    'Types qui peuvent être nil (absent optionnel)',
                    'Méthodes qui modifient le receiver',
                ]} color={COLOR} />
                <KeyPoint term="new(T)">Alloue de la mémoire pour un T, initialise à zero value, retourne un <code>*T</code>.</KeyPoint>
            </>
        ),
    },
    {
        id: 'functions',
        title: 'A.3 — Fonctions',
        icon: Code2,
        content: (
            <>
                <SectionHeading title="Fonctions en Go" color={COLOR} />
                <KeyPoint term="Multiple Return">Go peut retourner plusieurs valeurs. Convention : la dernière est souvent une erreur. Pattern <code>result, err := fonction()</code>.</KeyPoint>
                <KeyPoint term="Named Return">Nommer les valeurs de retour. <code>return</code> sans arguments retourne les valeurs nommées (naked return).</KeyPoint>
                <KeyPoint term="Variadic ...Type">Paramètre variadic reçu comme un slice. <code>...</code> pour décompresser un slice.</KeyPoint>
                <KeyPoint term="First-class">Les fonctions sont des valeurs. Assignables, passables, retournables.</KeyPoint>
                <KeyPoint term="Closures">Les fonctions littérales capturent les variables de leur environnement.</KeyPoint>
                <ConceptBlock title="Defer" color={COLOR}>
                    <p><code>defer</code> programme l'exécution d'une fonction pour quand la fonction englobante retourne. Les appels deferred sont empilés (LIFO). Utilisé pour le nettoyage des ressources. Exécuté même en cas de panic.</p>
                </ConceptBlock>
            </>
        ),
    },
    {
        id: 'interfaces',
        title: 'A.4 — Interfaces',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Interfaces en Go" subtitle="Fondamentales et différentes des autres langages" color={COLOR} />
                <ConceptBlock title="Interface implicite (Duck Typing)" color={COLOR}>
                    <p>En Go, vous n'avez pas besoin de déclarer explicitement qu'un type implémente une interface. Si un type a toutes les méthodes requises, il l'implémente automatiquement. "Si ça marche comme un canard et fait coin-coin, c'est un canard."</p>
                </ConceptBlock>
                <KeyPoint term="error interface">L'interface la plus importante. Une seule méthode : <code>Error() string</code>. Tout type qui l'implémente peut être une erreur.</KeyPoint>
                <KeyPoint term="interface{}">Implémentée par tous les types. Go 1.18+ ajoute <code>any</code> comme alias. Nécessite des type assertions.</KeyPoint>
                <KeyPoint term="Type Assertion"><code>value, ok := interface.(Type)</code> — sûr, ne panic pas si ça échoue.</KeyPoint>
                <KeyPoint term="Type Switch">Switch sur le type dynamique d'une interface.</KeyPoint>
                <KeyPoint term="Stringer"><code>fmt.Stringer</code> avec <code>String() string</code>. Format d'affichage personnalisé.</KeyPoint>
            </>
        ),
    },
    {
        id: 'goroutines',
        title: 'A.5 — Goroutines & Channels',
        icon: Zap,
        content: (
            <>
                <SectionHeading title="Goroutines et Channels" subtitle="La vraie force de Go" color={COLOR} />
                <ConceptBlock title="Goroutines" color={COLOR}>
                    <p>Légères threads gérées par le runtime Go. Beaucoup moins coûteuses que les threads OS (2KB de stack initial vs 1MB+). Le runtime peut gérer des <strong className="text-[#F4F2F7]">millions de goroutines</strong>. Lancer avec <code>go fonction()</code>.</p>
                </ConceptBlock>
                <ConceptBlock title="Comment ça fonctionne" color="#2ED9FF">
                    <p>Le scheduler Go multiplex les goroutines sur des threads OS (M:N threading). Il utilise le work-stealing — les threads inactifs "volent" du travail. Les goroutines bloquées sont mises de côté, libérant le thread.</p>
                </ConceptBlock>
                <ConceptBlock title="Channels" color="#FF2ECC">
                    <p>"Don't communicate by sharing memory; share memory by communicating." — philosophie Go. Un channel est un tube typé pour envoyer et recevoir des valeurs entre goroutines.</p>
                </ConceptBlock>
                <KeyPoint term="Directionnel"><code>chan&lt;-</code> (envoi seulement) et <code>&lt;-chan</code> (réception seulement). Clarifie l'intention.</KeyPoint>
                <KeyPoint term="Buffered vs Unbuffered">Non-bufferisé : bloque émetteur et récepteur (synchronisation). Bufferisé : bloque seulement quand le buffer est plein (asynchronisme partiel).</KeyPoint>
                <KeyPoint term="select">Comme un switch pour les channels. Attend qu'un cas soit prêt. Avec <code>default</code>, ne bloque pas.</KeyPoint>
                <InfoCard title="Patterns de concurrence Go" items={[
                    'Pipeline — stages connectés par channels',
                    'Fan-out / Fan-in — distribuer et collecter',
                    'Worker Pool — goroutines workers consommant depuis un channel',
                    'Done channel — signaler l\'annulation',
                    'Context package — annulation, timeouts, valeurs de requête',
                ]} color={COLOR} />
            </>
        ),
    },
    {
        id: 'errors',
        title: 'A.6 — Gestion des Erreurs',
        icon: GitBranch,
        content: (
            <>
                <SectionHeading title="Gestion des Erreurs en Go" subtitle="Pas d'exceptions — les erreurs sont des valeurs explicites" color={COLOR} />
                <KeyPoint term="Pattern standard"><code>résultat, err := fonction()</code>. Toujours vérifier <code>err != nil</code> immédiatement. Retourner avec contexte : <code>fmt.Errorf("contexte: %w", err)</code>.</KeyPoint>
                <KeyPoint term="errors.Is()">Vérifie si une erreur dans la chaîne correspond à une cible. Utilisez ça à la place de la comparaison directe.</KeyPoint>
                <KeyPoint term="errors.As()">Extrait un type d'erreur spécifique de la chaîne.</KeyPoint>
                <KeyPoint term="Types personnalisés">Structs implémentant l'interface <code>error</code> avec champs contextuels.</KeyPoint>
                <KeyPoint term="Panic & Recover"><code>panic</code> arrête l'exécution et remonte la pile. <code>recover</code> dans un <code>defer</code> peut intercepter. Réservé aux bugs, pas aux erreurs attendues.</KeyPoint>
            </>
        ),
    },
    {
        id: 'packages',
        title: 'A.7 — Packages & Outils',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Packages, Modules et Outils Go" color={COLOR} />
                <KeyPoint term="Package">Un répertoire = un package. Le package <code>main</code> est le point d'entrée.</KeyPoint>
                <KeyPoint term="Go Modules"><code>go.mod</code> définit le module et ses dépendances. <code>go get</code> ajoute des dépendances. <code>go mod tidy</code> nettoie.</KeyPoint>
                <ConceptBlock title="Visibilité" color={COLOR}>
                    <p>Déterminée par la casse. <strong className="text-[#F4F2F7]">Majuscule = exporté</strong> (public). <strong className="text-[#F4F2F7]">Minuscule = non-exporté</strong> (privé au package). Simple et efficace.</p>
                </ConceptBlock>
                <InfoCard title="Go Toolchain" items={[
                    'go build — compile',
                    'go run — compile et exécute',
                    'go test — tests (-v verbose, -race race detection, -cover couverture)',
                    'go fmt — formate automatiquement (obligatoire)',
                    'go vet — analyse statique',
                    'go doc — documentation',
                    'golangci-lint — linter tiers complet',
                ]} color={COLOR} />
            </>
        ),
    },
];

export default function GoPage() {
    return (
        <PageLayout
            title="Go (Golang)"
            subtitle="La performance du C avec la simplicité du Python. Goroutines, channels, et binaires auto-suffisants."
            icon={Server}
            color={COLOR}
            tag="⭐ Langage Essentiel #5"
            sections={sections}
            prevPage={{ title: 'Bash / Shell', path: '/bash' }}
            nextPage={{ title: 'Autres Langages', path: '/other-languages' }}
        />
    );
}
