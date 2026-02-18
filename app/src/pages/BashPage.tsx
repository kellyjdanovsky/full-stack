import { Terminal, Box, Layers, Zap, Code2, BookOpen, Settings, Sparkles } from 'lucide-react';
import PageLayout, { SectionHeading, ConceptBlock, KeyPoint, InfoCard } from './PageLayout';
import type { SectionData } from './PageLayout';

const COLOR = '#4EAA25';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: BookOpen,
        content: (
            <>
                <SectionHeading title="Bash / Shell" subtitle="Ce que c'est profondément" color={COLOR} />
                <div className="text-[#B8B2C6] text-sm leading-[1.8] space-y-4">
                    <p>Bash (Bourne Again Shell) est le shell Unix le plus répandu. Il est l'interface entre vous et le système d'exploitation. Chaque commande que vous tapez dans un terminal est interprétée par un shell. Bash est aussi un langage de scripting complet pour l'automatisation.</p>
                </div>
            </>
        ),
    },
    {
        id: 'navigation',
        title: 'A.1 — Navigation & Fichiers',
        icon: Box,
        content: (
            <>
                <SectionHeading title="Navigation et Fichiers" color={COLOR} />
                <ConceptBlock title="Naviguer dans le système de fichiers" color={COLOR}>
                    <p><code>pwd</code> affiche le répertoire courant. <code>ls</code> liste les fichiers (<code>-l</code> format long, <code>-a</code> cachés, <code>-h</code> tailles lisibles, <code>-r</code> inversé, <code>-t</code> par date). <code>cd</code> change de répertoire. <code>..</code> parent. <code>~</code> home.</p>
                </ConceptBlock>
                <KeyPoint term="Manipuler fichiers"><code>cp</code> copie (<code>-r</code> récursif). <code>mv</code> déplace/renomme. <code>rm</code> supprime (<code>-r</code> dossiers, <code>-f</code> forcer — IRRÉVERSIBLE). <code>mkdir -p</code> crée dossiers avec parents. <code>touch</code> crée fichier vide.</KeyPoint>
                <KeyPoint term="Lire fichiers"><code>cat</code> tout afficher. <code>less</code> page par page. <code>head -n 20</code> premières lignes. <code>tail -n 20</code> dernières. <code>tail -f</code> temps réel (logs).</KeyPoint>
                <KeyPoint term="Rechercher"><code>find</code> : par nom, type, taille, date. <code>grep</code> : texte dans fichiers (<code>-r</code> récursif, <code>-i</code> insensible à la casse, <code>-n</code> numéros de ligne). <code>locate</code> : index pré-calculé.</KeyPoint>
            </>
        ),
    },
    {
        id: 'pipes',
        title: 'A.2 — Redirection & Pipes',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Redirection et Pipes" subtitle="La philosophie Unix : de petits programmes connectés ensemble" color={COLOR} />
                <KeyPoint term="Stdin (0)">Entrée (clavier par défaut)</KeyPoint>
                <KeyPoint term="Stdout (1)">Sortie (terminal par défaut)</KeyPoint>
                <KeyPoint term="Stderr (2)">Erreurs (terminal par défaut)</KeyPoint>
                <ConceptBlock title="Redirection" color={COLOR}>
                    <p><code>&gt;</code> vers fichier (écrase). <code>&gt;&gt;</code> ajoute. <code>&lt;</code> fichier vers stdin. <code>2&gt;</code> redirige stderr. <code>2&gt;&amp;1</code> redirige stderr vers stdout. <code>/dev/null</code> est le "trou noir".</p>
                </ConceptBlock>
                <KeyPoint term="Pipes |">Connecte stdout d'une commande à stdin de la suivante. Chaîner des transformations simples pour des résultats complexes.</KeyPoint>
            </>
        ),
    },
    {
        id: 'scripting',
        title: 'A.3 — Scripting Bash',
        icon: Code2,
        content: (
            <>
                <SectionHeading title="Scripting Bash" color={COLOR} />
                <KeyPoint term="Shebang"><code>#!/bin/bash</code> ou <code>#!/usr/bin/env bash</code> (plus portable).</KeyPoint>
                <KeyPoint term="Variables">Pas d'espaces autour du <code>=</code>. <code>$variable</code> ou <code>${'{variable}'}</code>. Locales en minuscules, d'environnement en MAJUSCULES.</KeyPoint>
                <KeyPoint term="Arguments"><code>$0</code> nom, <code>$1</code> <code>$2</code> positionnels, <code>$#</code> nombre, <code>$@</code> tous (tableau), <code>$*</code> tous (string).</KeyPoint>
                <KeyPoint term="Variables spéciales"><code>$?</code> code retour dernière commande (0 = succès). <code>$$</code> PID courant. <code>$!</code> PID dernier background.</KeyPoint>
                <InfoCard title="Guillemets" items={[
                    'Double "..." : expansion des variables',
                    "Simple '...' : tout est littéral, aucune expansion",
                    '$(commande) : substitution de commande — préférer à backticks',
                ]} color={COLOR} />
                <KeyPoint term="Conditions"><code>[[ condition ]]</code> (double crochets — plus puissant). Fichiers : <code>-f</code> existe, <code>-d</code> dossier, <code>-r</code> lisible, <code>-x</code> exécutable. Strings : <code>-z</code> vide, <code>-n</code> non-vide. Nombres : <code>-eq</code>, <code>-ne</code>, <code>-lt</code>, <code>-le</code>, <code>-gt</code>, <code>-ge</code>.</KeyPoint>
                <KeyPoint term="Boucles"><code>for variable in liste</code>, <code>for ((i=0; i&lt;10; i++))</code> C-style, <code>while</code>, <code>until</code>, <code>break</code>/<code>continue</code>.</KeyPoint>
                <KeyPoint term="Fonctions"><code>nom_fonction() {'{ ... }'}</code>. Params avec <code>$1</code>, <code>$2</code>. <code>return</code> pour code retour (entier).</KeyPoint>
                <KeyPoint term="Tableaux"><code>array=(v1 v2 v3)</code>. Accès <code>${'{array[0]}'}</code>. Tous <code>${'{array[@]}'}</code>. Taille <code>${'{#array[@]}'}</code>.</KeyPoint>
                <KeyPoint term="Tableaux Associatifs"><code>declare -A dict</code> puis <code>dict[clé]=valeur</code>.</KeyPoint>
            </>
        ),
    },
    {
        id: 'power-commands',
        title: 'A.4 — Commandes Puissantes',
        icon: Zap,
        content: (
            <>
                <SectionHeading title="Commandes Puissantes à Maîtriser" color={COLOR} />
                <KeyPoint term="awk">Traitement de texte par colonnes. <code>$1</code>, <code>$2</code> sont les champs. <code>NR</code> numéro de ligne. <code>NF</code> nombre de champs. Patterns <code>BEGIN</code> et <code>END</code>.</KeyPoint>
                <KeyPoint term="sed">Stream Editor. <code>s/pattern/replacement/flags</code> substitue. <code>d</code> supprime. <code>-i</code> modifie en place.</KeyPoint>
                <KeyPoint term="sort">Trie. <code>-n</code> numérique, <code>-r</code> inversé, <code>-u</code> unique, <code>-k</code> par colonne, <code>-t</code> séparateur.</KeyPoint>
                <KeyPoint term="uniq">Supprime doublons consécutifs. <code>-c</code> préfixe par le nombre d'occurrences. Combiner avec <code>sort</code>.</KeyPoint>
                <KeyPoint term="wc">Word Count. <code>-l</code> lignes, <code>-w</code> mots, <code>-c</code> caractères.</KeyPoint>
                <KeyPoint term="cut">Extraire colonnes. <code>-d</code> délimiteur, <code>-f</code> numéros de champs.</KeyPoint>
                <KeyPoint term="xargs">Construire des commandes depuis stdin.</KeyPoint>
                <KeyPoint term="tee">Écrire vers stdout ET un fichier simultanément.</KeyPoint>
                <KeyPoint term="curl">Requêtes HTTP en ligne de commande. APIs, téléchargements.</KeyPoint>
                <KeyPoint term="jq">Processeur JSON en ligne de commande.</KeyPoint>
                <KeyPoint term="ssh/scp/rsync">Connexion sécurisée, copie et synchronisation de fichiers.</KeyPoint>
                <KeyPoint term="cron">Planificateur de tâches. 5 champs : minute, heure, jour du mois, mois, jour de la semaine.</KeyPoint>
                <KeyPoint term="ps/top/htop">Liste et monitoring des processus.</KeyPoint>
                <KeyPoint term="kill"><code>-9</code> SIGKILL (force). <code>-15</code> SIGTERM (demande poliment).</KeyPoint>
                <KeyPoint term="chmod">Permissions. Octal : 7=rwx, 6=rw-, 5=r-x, 4=r--. Trois positions : owner, group, others.</KeyPoint>
            </>
        ),
    },
];

export default function BashPage() {
    return (
        <PageLayout
            title="Bash / Shell"
            subtitle="L'interface avec le système d'exploitation. Automatisation, scripting, gestion de serveurs Linux."
            icon={Terminal}
            color={COLOR}
            tag="⭐ Langage Essentiel #4"
            sections={sections}
            prevPage={{ title: 'SQL', path: '/sql' }}
            nextPage={{ title: 'Go (Golang)', path: '/go' }}
        />
    );
}
