import { Container } from '../../../components/layout/Container';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { SectionHeading } from '../../../components/ui/SectionHeading';
import type { Project } from '../data/projects';

interface FeaturedProjectsSectionProps {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function FeaturedProjectsSection({
  projects,
  eyebrow = '精选作品',
  title = '围绕复杂前端问题构建的精选项目。',
  description = '一个专注于实时、可视化、跨平台和重交互工程的精选作品集。',
}: FeaturedProjectsSectionProps) {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="project-grid">
          {projects.map((project) => (
            <Card key={project.slug} className="project-card">
              <p className="card-kicker">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="card-badges">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
