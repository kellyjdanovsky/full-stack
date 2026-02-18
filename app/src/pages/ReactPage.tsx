import { Layers } from 'lucide-react';
import PageLayout from './PageLayout';
import ReactCourse from '../sections/ReactCourse';

export default function ReactPage() {
    return (
        <PageLayout
            title="React"
            subtitle="La bibliothèque UI de référence. Composants, Hooks et Écosystème."
            icon={Layers}
            color="#61DAFB"
            tag="Frontend Modern"
            sections={[
                {
                    id: 'course',
                    title: 'Module de Cours',
                    icon: Layers,
                    content: <div className="-mx-4 sm:-mx-8 lg:-mx-12"><ReactCourse className="!py-0 !bg-transparent" /></div>
                }
            ]}
            prevPage={{ title: 'Python', path: '/python' }}
            nextPage={{ title: 'Node.js', path: '/node' }}
        />
    );
}
