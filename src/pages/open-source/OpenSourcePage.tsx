import { Container } from '../../components/layout/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';

export function OpenSourcePage() {
  return (
    <section className="section fade-in">
      <Container>
        <SectionHeading
          eyebrow="开源"
          title="可重用的包和开发者工具。"
          description="此页面将展示npm包、API设计、用例和实现细节。"
        />
      </Container>
    </section>
  );
}