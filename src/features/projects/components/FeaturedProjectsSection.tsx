import { useNavigate } from 'react-router';
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
  const navigate = useNavigate();

  const handleProjectClick = (path: string) => {
    navigate(path);
  };

  return (
    <section id="projects" className="section">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="project-grid">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project.path)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="card-kicker">{project.category}</p>
                {project.badge && (
                  <Badge className="badge-primary">{project.badge}</Badge>
                )}
              </div>
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
