import { Code2, Sparkles } from 'lucide-react';
import PageLayout, { type SectionData } from './PageLayout';
import CleanCodeCourse from '../sections/CleanCodeCourse';

const COLOR = '#00E676';

const sections: SectionData[] = [
    {
        id: 'course',
        title: 'Guide Complet',
        icon: Sparkles,
        content: (
            <div className="-mx-4 sm:-mx-8 lg:-mx-12">
                <CleanCodeCourse className="!py-0 !bg-transparent" />
            </div>
        ),
    },
];

export default function CleanCodePage() {
    return (
        <PageLayout
            title="Clean Code & Algos"
            subtitle="Le guide ultime pour passer de codeur à développeur professionnel. Lisibilité, Algorithmes, Structure et Bonnes Pratiques."
            icon={Code2}
            color={COLOR}
            tag="🚀 Excelence Technique"
            sections={sections}
            prevPage={{ title: 'Architecture', path: '/project-structure' }}
            nextPage={{ title: 'Accueil', path: '/' }}
        />
    );
}
