import { Container } from '../../components/layout/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import ChatComponent from '../../components/chat/ChatComponent';

export function LabsPage() {
  return (
    <section className="section fade-in">
      <Container>
        <SectionHeading
          eyebrow="实验室"
          title="交互式实验和技术演示。"
          description="Three.js、D3.js、Canvas、Konva、WebSocket、AI和Unity WebGL演示将在此整理展示。"
        />
        <div style={{ marginTop: '40px' }}>
          <ChatComponent />
        </div>
      </Container>
    </section>
  );
}