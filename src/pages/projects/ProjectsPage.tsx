import { Container } from '../../components/layout/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';

export function ProjectsPage() {
  return (
    <section className="section fade-in">
      <Container>
        <SectionHeading
          eyebrow="项目"
          title="精选工程案例研究。"
          description="详细的项目页面将在此添加，涵盖实时系统、可视化、跨平台应用和复杂前端架构。"
        />
      </Container>
    </section>
  );
}