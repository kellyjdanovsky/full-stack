import { Layout } from 'lucide-react';
import PageLayout from './PageLayout';
import HTMLCSSCourse from '../sections/HTMLCSSCourse';

export default function HTMLCSSPage() {
    return (
        <PageLayout
            title="HTML & CSS"
            subtitle="Les fondations du web. Structure sémantique et design moderne."
            icon={Layout}
            color="#E34F26"
            tag="Fondations"
            sections={[
                {
                    id: 'course',
                    title: 'Module de Cours',
                    icon: Layout,
                    content: <div className="-mx-4 sm:-mx-8 lg:-mx-12"><HTMLCSSCourse className="!py-0 !bg-transparent" /></div>
                }
            ]}
            nextPage={{ title: 'JavaScript', path: '/javascript' }}
        />
    );
}
