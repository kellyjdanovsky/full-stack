import { FolderTree } from 'lucide-react';
import PageLayout from './PageLayout';
import ProjectStructure from '../sections/ProjectStructure';

export default function ProjectStructurePage() {
    return (
        <PageLayout
            title="Architecture & Structure"
            subtitle="Organisation professionnelle des dossiers et fichiers pour des projets scalables."
            icon={FolderTree}
            color="#2ED9FF"
            tag="Best Practices"
            sections={[
                {
                    id: 'structure-module',
                    title: 'Explorateur de Structure',
                    icon: FolderTree,
                    content: <div className="-mx-4 sm:-mx-8 lg:-mx-12"><ProjectStructure className="!py-0 !bg-transparent" /></div>
                }
            ]}
            prevPage={{ title: 'Autres Langages', path: '/other-languages' }}
        />
    );
}
