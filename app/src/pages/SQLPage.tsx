import { Database, Box, Layers, Zap, Code2, BookOpen, Settings, Sparkles, Cpu, GitBranch } from 'lucide-react';
import PageLayout, { SectionHeading, SubSection, ConceptBlock, KeyPoint, InfoCard } from './PageLayout';
import type { SectionData } from './PageLayout';

const COLOR = '#336791';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <SectionHeading title="SQL" subtitle="Ce que c'est profondément" color={COLOR} />
                <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-4">
                    <p>SQL (Structured Query Language) a été créé chez IBM dans les années 1970 par Edgar Codd, basé sur sa théorie des bases de données relationnelles. Il est normalisé (ANSI SQL) mais chaque SGBD (PostgreSQL, MySQL, SQLite) a ses propres extensions. C'est le langage de presque toutes les données structurées dans le monde.</p>
                </div>
            </>
        ),
    },
    {
        id: 'relational',
        title: 'A.1 — Modèle Relationnel',
        icon: Box,
        content: (
            <>
                <SectionHeading title="Le Modèle Relationnel" color={COLOR} />
                <KeyPoint term="Tables">Les données sont organisées en tables (relations). Colonnes (attributs) avec des types définis et lignes (tuples/enregistrements).</KeyPoint>
                <KeyPoint term="Clés Primaires">Identifient de manière unique chaque ligne. Doivent être uniques et non nulles. Souvent un entier auto-incrémenté ou un UUID.</KeyPoint>
                <KeyPoint term="Clés Étrangères">Référencent la clé primaire d'une autre table. Peuvent avoir des règles <code>ON DELETE</code> (CASCADE, SET NULL, RESTRICT).</KeyPoint>
                <KeyPoint term="Contraintes"><code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code>, <code>PRIMARY KEY</code>, <code>FOREIGN KEY</code>.</KeyPoint>
                <InfoCard title="Types PostgreSQL" items={[
                    'INTEGER, BIGINT, DECIMAL(p,s) — précision fixe pour la finance',
                    'REAL / DOUBLE PRECISION — virgule flottante',
                    'BOOLEAN — vrai/faux',
                    'TEXT / VARCHAR(n) — chaînes de caractères',
                    'DATE, TIMESTAMP WITH TIME ZONE',
                    'JSON / JSONB — JSON binaire indexable',
                    'UUID — identifiants universels',
                    'ARRAY — tableaux natifs',
                ]} color={COLOR} />
            </>
        ),
    },
    {
        id: 'select',
        title: 'A.2 — Les Requêtes SELECT',
        icon: Code2,
        content: (
            <>
                <SectionHeading title="Les Requêtes SELECT" color={COLOR} />
                <KeyPoint term="SELECT">Détermine quelles colonnes retourner. <code>*</code> retourne toutes les colonnes. Expressions, fonctions, alias.</KeyPoint>
                <KeyPoint term="FROM">Détermine la table source. Peut inclure des sous-requêtes.</KeyPoint>
                <KeyPoint term="WHERE">Filtre les lignes. <code>AND</code>/<code>OR</code>/<code>NOT</code>, <code>IN</code>, <code>BETWEEN</code>, <code>LIKE</code>, <code>IS NULL</code>.</KeyPoint>
                <KeyPoint term="GROUP BY">Regroupe les lignes par valeurs identiques. Permet les agrégations sur les groupes.</KeyPoint>
                <KeyPoint term="HAVING">Filtre les groupes. Comme WHERE mais pour les groupes — s'applique après l'agrégation.</KeyPoint>
                <KeyPoint term="ORDER BY">Trie les résultats. <code>ASC</code> (défaut) ou <code>DESC</code>.</KeyPoint>
                <KeyPoint term="LIMIT / OFFSET">Paginer les résultats.</KeyPoint>
                <InfoCard title="Ordre d'évaluation SQL" items={[
                    'FROM → JOIN → WHERE → GROUP BY → HAVING',
                    '→ SELECT → DISTINCT → ORDER BY → LIMIT/OFFSET',
                ]} color="#2ED9FF" />
            </>
        ),
    },
    {
        id: 'joins',
        title: 'A.3 — Les JOINs',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Les JOINs en Profondeur" subtitle="Combiner des lignes de plusieurs tables" color={COLOR} />
                <KeyPoint term="INNER JOIN">Retourne les lignes qui ont des correspondances dans LES DEUX tables.</KeyPoint>
                <KeyPoint term="LEFT JOIN">Retourne TOUTES les lignes de la table gauche, et les correspondances de la droite. NULL si pas de correspondance.</KeyPoint>
                <KeyPoint term="RIGHT JOIN">L'inverse — toutes les lignes de droite, correspondances de gauche.</KeyPoint>
                <KeyPoint term="FULL JOIN">Toutes les lignes des deux tables. NULL là où il n'y a pas de correspondance.</KeyPoint>
                <KeyPoint term="CROSS JOIN">Produit cartésien. Rarement utilisé directement.</KeyPoint>
                <KeyPoint term="SELF JOIN">Joindre une table avec elle-même. Utile pour les données hiérarchiques (employé → manager).</KeyPoint>
            </>
        ),
    },
    {
        id: 'functions',
        title: 'A.4 — Fonctions SQL',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Fonctions SQL" color={COLOR} />
                <ConceptBlock title="Fonctions d'Agrégation" color={COLOR}>
                    <p><code>COUNT(*)</code>, <code>COUNT(colonne)</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, <code>MAX()</code>, <code>STRING_AGG()</code>, <code>ARRAY_AGG()</code>.</p>
                </ConceptBlock>
                <ConceptBlock title="Window Functions" color="#2ED9FF">
                    <p>Opèrent sur un ensemble de lignes en relation avec la ligne courante, <strong className="text-[#F4F2F7]">sans effondrer les lignes</strong> en groupes. Utilisation de <code>OVER()</code> avec <code>PARTITION BY</code> et <code>ORDER BY</code>.</p>
                </ConceptBlock>
                <InfoCard title="Window Functions clés" items={[
                    'ROW_NUMBER() — numéro de ligne unique',
                    'RANK() — rang avec gaps pour égalités',
                    'DENSE_RANK() — rang sans gaps',
                    'LAG/LEAD — valeur n lignes avant/après',
                    'FIRST_VALUE / LAST_VALUE — première/dernière valeur',
                    'SUM(), AVG() comme window functions — calcul cumulatif',
                ]} color="#2ED9FF" />
                <KeyPoint term="Fonctions de Date"><code>NOW()</code>, <code>CURRENT_DATE</code>, <code>EXTRACT()</code>, <code>DATE_TRUNC()</code>, <code>AGE()</code>, <code>INTERVAL</code>.</KeyPoint>
                <KeyPoint term="Fonctions Conditionnelles"><code>CASE WHEN ... THEN ... ELSE ... END</code>. <code>COALESCE(a, b, c)</code> — première valeur non-NULL. <code>NULLIF(a, b)</code> — retourne NULL si a = b.</KeyPoint>
            </>
        ),
    },
    {
        id: 'subqueries',
        title: 'A.5 — Sous-requêtes & CTEs',
        icon: GitBranch,
        content: (
            <>
                <SectionHeading title="Sous-requêtes et CTEs" color={COLOR} />
                <KeyPoint term="Sous-requêtes">Requêtes imbriquées. Peuvent être dans SELECT (scalar), FROM (dérivée de table), WHERE, HAVING.</KeyPoint>
                <KeyPoint term="CTE (WITH)">Requêtes nommées temporaires. Plus lisibles que les sous-requêtes imbriquées. Peuvent se référencer mutuellement.</KeyPoint>
                <ConceptBlock title="CTEs Récursives" color={COLOR}>
                    <p>La CTE se réfère à elle-même. La partie non-récursive (base case) est combinée avec <code>UNION ALL</code> avec la partie récursive. Idéal pour les données hiérarchiques (arborescences, graphes).</p>
                </ConceptBlock>
            </>
        ),
    },
    {
        id: 'indexes',
        title: 'A.6 — Index & Performance',
        icon: Zap,
        content: (
            <>
                <SectionHeading title="Index et Performance" color={COLOR} />
                <ConceptBlock title="Index" color={COLOR}>
                    <p>Structure de données qui accélère les requêtes au prix de l'espace disque et de la vitesse d'écriture. Sans index, une requête doit scanner toute la table (seq scan). Avec un index, elle peut trouver directement les lignes (index scan).</p>
                </ConceptBlock>
                <KeyPoint term="B-Tree">Le type par défaut. Idéal pour les égalités et les comparaisons de plage. Supporte <code>=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>BETWEEN</code>, <code>IN</code>.</KeyPoint>
                <KeyPoint term="Hash">Uniquement pour les égalités exactes. Légèrement plus rapide que B-tree pour les égalités pures.</KeyPoint>
                <KeyPoint term="GIN">Pour les types composites : tableaux, JSONB, texte full-text.</KeyPoint>
                <KeyPoint term="GiST">Pour les données géométriques, les plages de valeurs, la recherche full-text.</KeyPoint>
                <KeyPoint term="Index Partiel">Index sur un sous-ensemble des lignes avec une clause <code>WHERE</code>.</KeyPoint>
                <KeyPoint term="EXPLAIN ANALYZE">Affiche le plan d'exécution de la requête avec les temps réels. Indispensable pour comprendre les performances.</KeyPoint>
            </>
        ),
    },
    {
        id: 'transactions',
        title: 'A.7 — Transactions & ACID',
        icon: Settings,
        content: (
            <>
                <SectionHeading title="Transactions et ACID" color={COLOR} />
                <ConceptBlock title="ACID" color={COLOR}>
                    <p>Un groupe d'opérations qui s'exécutent ensemble ou pas du tout.</p>
                </ConceptBlock>
                <KeyPoint term="Atomicité">La transaction réussit entièrement ou est annulée entièrement.</KeyPoint>
                <KeyPoint term="Cohérence">La transaction amène la BDD d'un état valide à un autre.</KeyPoint>
                <KeyPoint term="Isolation">Les transactions concurrentes s'exécutent comme si elles étaient séquentielles.</KeyPoint>
                <KeyPoint term="Durabilité">Les changements committés survivent aux pannes système.</KeyPoint>
                <InfoCard title="Niveaux d'isolation" items={[
                    'Read Uncommitted — dirty reads possibles',
                    'Read Committed — défaut de PostgreSQL',
                    'Repeatable Read — mêmes données à chaque lecture',
                    'Serializable — le plus strict, comme des transactions sérielles',
                ]} color={COLOR} />
            </>
        ),
    },
    {
        id: 'postgresql',
        title: 'A.8 — PostgreSQL Avancé',
        icon: Cpu,
        content: (
            <>
                <SectionHeading title="PostgreSQL Avancé" color={COLOR} />
                <KeyPoint term="JSONB">Stockage JSON binaire optimisé. Indexable avec GIN. Opérateurs : <code>-&gt;</code>, <code>-&gt;&gt;</code>, <code>#&gt;</code>, <code>@&gt;</code>, <code>?</code>.</KeyPoint>
                <KeyPoint term="Arrays">Tableaux natifs. <code>unnest()</code>, <code>array_agg()</code>, <code>array_length()</code>. Index GIN.</KeyPoint>
                <KeyPoint term="Full Text Search"><code>to_tsvector()</code> + <code>to_tsquery()</code>. Supporte AND, OR, NOT, préfixes, ranking.</KeyPoint>
                <KeyPoint term="Partitionnement">Diviser une grande table en partitions (range, list, hash). Améliore les performances.</KeyPoint>
                <KeyPoint term="Materialized Views">Comme une vue mais données stockées physiquement. Très rapide à lire, doit être rafraîchie.</KeyPoint>
                <KeyPoint term="Listen/Notify">Système pub/sub intégré pour des notifications asynchrones temps réel.</KeyPoint>
            </>
        ),
    },
];

export default function SQLPage() {
    return (
        <PageLayout
            title="SQL"
            subtitle="Le langage des données. PostgreSQL, MySQL, SQLite — maîtrisez les requêtes, joins, index et transactions."
            icon={Database}
            color={COLOR}
            tag="⭐ Langage Essentiel #3"
            sections={sections}
            prevPage={{ title: 'Python', path: '/python' }}
            nextPage={{ title: 'Bash / Shell', path: '/bash' }}
        />
    );
}
