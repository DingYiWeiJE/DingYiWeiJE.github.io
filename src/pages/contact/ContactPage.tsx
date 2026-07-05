import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";

export function ContactPage() {
  return (
    <section className="section fade-in">
      <Container>
        <SectionHeading
          eyebrow="联系方式"
          title="让我们一起构建交互式前端系统。"
          description="欢迎前端、跨平台、可视化、实时和AI相关的工程机会。"
        />

        <Button href="https://github.com/dingyiweije" target="_blank" rel="noreferrer">
          GitHub
        </Button>
      </Container>
    </section>
  );
}