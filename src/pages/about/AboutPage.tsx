import { Container } from '../../components/layout/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';

export function AboutPage() {
  return (
    <section className="section fade-in">
      <Container>
        <SectionHeading
          eyebrow="关于我"
          title="专注于复杂交互系统的前端和跨平台工程师。"
          description="我构建Web、H5、小程序和跨平台移动应用的前端系统，专注于可视化、实时通信、性能和全周期交付。"
        />
      </Container>
    </section>
  );
}