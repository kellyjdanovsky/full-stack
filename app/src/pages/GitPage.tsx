import { GitBranch } from 'lucide-react';
import PageLayout from './PageLayout';
import GitTypeScriptCourse from '../sections/GitTypeScriptCourse';

export default function GitPage() {
    return (
        <PageLayout
            title="Git & TypeScript"
            subtitle="Outils professionnels. Versionning et typage statique pour des projets robustes."
            icon={GitBranch}
            color="#F05032"
            tag="Outils Pro"
            sections={[
                {
                    id: 'course',
                    title: 'Module de Cours',
                    icon: GitBranch,
                    content: <div className="-mx-4 sm:-mx-8 lg:-mx-12"><GitTypeScriptCourse className="!py-0 !bg-transparent" /></div>
                }
            ]}
            prevPage={{ title: 'Architecture', path: '/project-structure' }}
        />
    );
}
