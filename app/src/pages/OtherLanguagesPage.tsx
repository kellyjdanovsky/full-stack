import { Layers, Globe, Smartphone, Palette, Shield, Cpu, Box, Sparkles, Zap, BarChart3, Database } from 'lucide-react';
import PageLayout, { SectionHeading, SubSection, KeyPoint } from './PageLayout';
import type { SectionData } from './PageLayout';

const COLOR = '#FF2ECC';

const sections: SectionData[] = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="Autres Langages Importants" subtitle="Explorez selon vos besoins spécifiques" color={COLOR} />
                <p className="text-[#B8B2C6] text-sm leading-[1.8] mb-6">
                    Il n'est pas nécessaire de tout apprendre. Choisissez ces langages uniquement si vous avez un projet spécifique ou une carrière dans un domaine particulier (Mobile, Data Science, Système, etc.).
                </p>
            </>
        ),
    },
    {
        id: 'rust',
        title: 'Rust (Systèmes)',
        icon: Shield,
        content: (
            <>
                <SectionHeading title="Rust" subtitle="La sécurité mémoire sans garbage collector" color="#DEA584" />
                <KeyPoint term="Ownership & Borrowing">Le concept unique de Rust. Chaque valeur a un propriétaire unique. Quand le propriétaire sort de la portée, la valeur est libérée. Les références (&) permettent d'emprunter sans prendre la propriété.</KeyPoint>
                <KeyPoint term="Lifetimes">Des annotations pour dire au compilateur combien de temps les références sont valides. Empêche les 'dangling pointers'.</KeyPoint>
                <KeyPoint term="Zero-cost abstractions">Les itérateurs, closures et generics sont compilés aussi efficacement que du code écrit à la main.</KeyPoint>
                <KeyPoint term="Cargo">Le gestionnaire de paquets et système de build. Incroyablement moderne et efficace.</KeyPoint>
            </>
        ),
    },
    {
        id: 'java',
        title: 'Java / Kotlin (Enterprise)',
        icon: Cpu,
        content: (
            <>
                <SectionHeading title="Java & Kotlin" subtitle="L'écosystème JVM" color="#B07219" />
                <SubSection title="Java">
                    <p>Le standard de l'industrie pour les grosses applications d'entreprise. Verbeux mais robuste. La JVM (Java Virtual Machine) permet le "Write Once, Run Anywhere". Écosystème gigantesque (Spring Boot, Hibernate, Maven/Gradle).</p>
                </SubSection>
                <SubSection title="Kotlin">
                    <p>Le remplaçant moderne de Java, officiellement soutenu par Google pour Android. 100% interopérable avec Java mais plus concis. Null safety intégrée (fini les NullPointerException). Coroutines pour l'asynchrone.</p>
                </SubSection>
            </>
        ),
    },
    {
        id: 'csharp',
        title: 'C# (Microsoft)',
        icon: Layers,
        content: (
            <>
                <SectionHeading title="C# (.NET)" color="#68217A" />
                <KeyPoint term="LINQ">Language Integrated Query. Requêter des collections, XML ou SQL directement avec une syntaxe déclarative élégante en C#.</KeyPoint>
                <KeyPoint term="ASP.NET Core">Framework web ultra-rapide et multiplateforme. L'un des plus performants du marché.</KeyPoint>
                <KeyPoint term="Unity">Le moteur de jeu le plus populaire utilise C# pour le scripting.</KeyPoint>
                <KeyPoint term="Blazor">Créer des applications web interactives en C# au lieu de JavaScript (via WebAssembly).</KeyPoint>
            </>
        ),
    },
    {
        id: 'php',
        title: 'PHP (Web Backend)',
        icon: Globe,
        content: (
            <>
                <SectionHeading title="PHP" subtitle="Le roi du web (WordPress, Laravel)" color="#777BB4" />
                <p className="text-[#B8B2C6] text-sm mb-4">Ne croyez pas les mèmes — PHP moderne (8.x) est rapide, typé et robuste.</p>
                <KeyPoint term="Laravel">Le framework backend le plus élégant et complet. Eloquent ORM, Blade templating, Queues, Scheduler, tout est inclus.</KeyPoint>
                <KeyPoint term="WordPress">Propulse 40% du web. Connaître PHP est indispensable pour créer des thèmes et plugins.</KeyPoint>
                <KeyPoint term="Facilité de déploiement">Copiez les fichiers sur un serveur, ça marche. Pas de build step complexe obligatoire (bien que recommandée).</KeyPoint>
            </>
        ),
    },
    {
        id: 'glsl',
        title: 'GLSL (Graphisme 3D)',
        icon: Palette,
        content: (
            <>
                <SectionHeading title="GLSL (OpenGL Shading Language)" subtitle="Programmation GPU" color="#EF5097" />
                <KeyPoint term="Parallelisme massif">Le code s'exécute pour CHAQUE pixel (Fragment Shader) ou CHAQUE sommet (Vertex Shader) en parallèle sur le GPU.</KeyPoint>
                <KeyPoint term="Types vectoriels">vec2, vec3, vec4, mat3, mat4 sont natifs. Opérations mathématiques sur vecteurs (dot product, cross product) ultra-rapides.</KeyPoint>
                <KeyPoint term="Shadertoy">Plateforme pour apprendre et prototyper des shaders.</KeyPoint>
                <KeyPoint term="SDF (Signed Distance Functions)">Technique mathématique pour dessiner des formes 3D complexes avec des équations simples.</KeyPoint>
            </>
        ),
    },
    {
        id: 'mobile',
        title: 'Swift & Dart (Mobile)',
        icon: Smartphone,
        content: (
            <>
                <SectionHeading title="Langages Mobiles" color="#F05138" />
                <SubSection title="Swift (iOS)">
                    <p>Créé par Apple. Rapide, sûr, expressif. SwiftUI permet de créer des interfaces déclaratives. Optionals, generics, protocols.</p>
                </SubSection>
                <SubSection title="Dart (Flutter)">
                    <p>Créé par Google pour le framework Flutter. Permet de créer des apps natives pour iOS, Android, Web et Desktop avec une seule base de code. Hot Reload incroyable pour le développement UI.</p>
                </SubSection>
            </>
        ),
    },
    {
        id: 'datascience',
        title: 'R & Julia (Data)',
        icon: BarChart3,
        content: (
            <>
                <SectionHeading title="Science des Données" color="#276DC3" />
                <KeyPoint term="R">Spécialisé en statistiques et visualisation. Tidyverse (dplyr, ggplot2) est une collection d'outils puissants pour la data science.</KeyPoint>
                <KeyPoint term="Julia">Syntaxe intuitive comme Python, mais vitesse comparable au C. Résout le "two language problem" (prototyper en Python, réécrire en C++).</KeyPoint>
            </>
        ),
    },
    {
        id: 'web3',
        title: 'Solidity (Blockchain)',
        icon: Sparkles,
        content: (
            <>
                <SectionHeading title="Solidity" subtitle="Smart Contracts Ethereum" color="#363636" />
                <KeyPoint term="EVM">Le code tourne sur l'Ethereum Virtual Machine, distribuée mondialement.</KeyPoint>
                <KeyPoint term="Gas">Chaque opération coûte de l'argent (Ether). L'optimisation est critique.</KeyPoint>
                <KeyPoint term="Immuabilité">Une fois déployé, le code ne peut plus être modifié (sauf patterns proxy complexes).</KeyPoint>
                <KeyPoint term="Sécurité">Les bugs coûtent des millions. Re-entrancy attacks, integer overflow (géré depuis 0.8).</KeyPoint>
            </>
        ),
    },
];

export default function OtherLanguagesPage() {
    return (
        <PageLayout
            title="Autres Langages"
            subtitle="Un aperçu des langages spécialisés pour des domaines spécifiques : Système, Mobile, Data, 3D, Web3."
            icon={Globe}
            color={COLOR}
            tag="Exploration"
            sections={sections}
            prevPage={{ title: 'Go (Golang)', path: '/go' }}
        />
    );
}
