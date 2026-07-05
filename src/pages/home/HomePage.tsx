import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { projects } from '../../features/projects/data/projects';
import { openSourcePackages } from '../../features/open-source/data/packages';
import { labs } from '../../features/labs/data/labs';

const techStack = [
  'React',
  'Vue',
  'React Native',
  'Expo',
  'D3.js',
  'Three.js',
  'Canvas',
  'Konva',
  'WebSocket',
  'AI',
  'IoT',
  'TypeScript',
];

const expertise = [
  {
    index: '01',
    title: '前端架构',
    description:
      'React、Vue、TypeScript、Vite、组件抽象、状态管理和可扩展的前端系统。',
  },
  {
    index: '02',
    title: '跨平台开发',
    description:
      'React Native、Expo、UniApp、移动性能优化和原生交互模式。',
  },
  {
    index: '03',
    title: '数据可视化',
    description:
      'D3.js、ECharts、AntV、Canvas和Konva，用于仪表板、图表、拓扑和标注工具。',
  },
  {
    index: '04',
    title: '实时系统',
    description:
      'WebSocket、SSE、MQTT和Agora，用于实时市场数据、设备监控和实时交互。',
  },
  {
    index: '05',
    title: 'AI界面',
    description:
      'AI工具界面、提示交互、视觉标注工作流和智能产品体验。',
  },
  {
    index: '06',
    title: '全周期交付',
    description:
      '需求分解、技术设计、API集成、性能调优和生产交付。',
  },
];

export function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="home-page fade-in">
      <section className="hero-section">
        <Container className="hero-section__inner">
          <div className="hero-section__content">
            <p className="hero-section__eyebrow">
              前端工程师 · 可视化 · 跨平台 · 实时系统
            </p>

            <h1 className="hero-section__title">
              构建交互式、实时的跨平台网络体验。
            </h1>

            <p className="hero-section__description">
              我专精于React、Vue、React Native、D3.js、Three.js、Canvas、
              WebSocket、AI界面和IoT仪表板—在复杂前端架构、数据可视化、性能优化
              和全周期项目交付方面有丰富的实践经验。
            </p>

            <div className="hero-section__actions">
              <Button href="/projects">View Projects</Button>
              <Button href="/labs" variant="secondary">
                Explore Labs
              </Button>
              <Button href="/open-source" variant="ghost">
                Open Source
              </Button>
            </div>

            <div className="hero-section__badges">
              {techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <Card className="hero-profile-card">
            <p className="hero-profile-card__label">开发者档案</p>
            <h2>Ding Yiwei</h2>
            <p>前端 / 跨平台工程师</p>

            <div className="hero-profile-card__divider" />

            <ul>
              <li>复杂前端架构</li>
              <li>数据可视化系统</li>
              <li>实时通信</li>
              <li>移动和跨平台应用</li>
              <li>开源组件</li>
            </ul>
          </Card>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="精选作品"
            title="围绕复杂前端问题构建的精选项目。"
            description="一个专注于实时、可视化、跨平台和重交互工程的精选作品集。"
          />

          <div className="project-grid">
            {featuredProjects.map((project) => (
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

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="专业技能"
            title="超越UI实现的工程能力。"
            description="我的工作专注于产品复杂性、交互深度、性能和可维护的前端架构。"
          />

          <div className="expertise-grid">
            {expertise.map((item) => (
              <Card key={item.title} className="expertise-card">
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="开源项目"
            title="React、Vue和重交互界面的可重用包。"
            description="开源是我将重复的前端问题转化为可重用工具和开发者API的地方。"
          />

          <div className="package-grid">
            {openSourcePackages.map((pkg) => (
              <Card key={pkg.name} className="package-card">
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <code>{pkg.installCommand}</code>

                <div className="card-badges">
                  {pkg.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <a href={pkg.npmUrl} target="_blank" rel="noreferrer">
                  View on npm →
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="实验室"
            title="不断增长的视觉、实时和WebGL实验场所。"
            description="这里将展示Three.js、D3.js、Canvas、Konva、WebSocket、AI和Unity WebGL演示。"
          />

          <div className="lab-grid">
            {labs.map((lab) => (
              <Card key={lab.title} className="lab-card">
                <div className="lab-card__top">
                  <p className="card-kicker">{lab.category}</p>
                  <Badge>{lab.status}</Badge>
                </div>
                <h3>{lab.title}</h3>
                <p>{lab.description}</p>

                <div className="card-badges">
                  {lab.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section contact-cta-section">
        <Container>
          <Card className="contact-cta-card">
            <p className="card-kicker">联系方式</p>
            <h2>有兴趣一起构建交互式前端系统吗？</h2>
            <p>
              我对前端、跨平台、可视化、实时和
              AI相关的工程机会持开放态度。
            </p>

            <div className="hero-section__actions">
              <Button href="https://github.com/dingyiweije" target="_blank" rel="noreferrer">
                GitHub
              </Button>
              <Button href="/contact" variant="secondary">
                Contact Me
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}