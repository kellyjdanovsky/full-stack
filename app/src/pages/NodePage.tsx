import { Server, Database } from 'lucide-react';
import PageLayout from './PageLayout';
import NodeBackendCourse from '../sections/NodeBackendCourse';

export default function NodePage() {
    return (
        <PageLayout
            title="Node.js & Backend"
            subtitle="JavaScript côté serveur. APIs, bases de données et microservices."
            icon={Server}
            color="#339933"
            tag="Backend Master"
            sections={[
                {
                    id: 'course',
                    title: 'Module de Cours',
                    icon: Database,
                    content: <div className="-mx-4 sm:-mx-8 lg:-mx-12"><NodeBackendCourse className="!py-0 !bg-transparent" /></div>
                }
            ]}
            prevPage={{ title: 'React', path: '/react' }}
            nextPage={{ title: 'SQL', path: '/sql' }}
        />
    );
}
