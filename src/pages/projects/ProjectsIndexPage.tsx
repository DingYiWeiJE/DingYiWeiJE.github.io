import { FeaturedProjectsSection } from '../../features/projects/components/FeaturedProjectsSection';
import { projects } from '../../features/projects/data/projects';

export function ProjectsIndexPage() {
  return (
    <div className="projects-index-page fade-in">
      <FeaturedProjectsSection
        projects={projects}
        eyebrow="所有项目"
        title="完整的项目作品集"
        description="探索我在前端开发、可视化、跨平台和实时系统方面的完整作品集。"
      />
    </div>
  );
}