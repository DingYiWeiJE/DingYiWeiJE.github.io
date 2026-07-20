import { useNavigate } from 'react-router';
import { Container } from '../../components/layout/Container';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { openSourcePackages } from '../../features/open-source/data/packages';
import { FeaturedProjectsSection } from '../../features/projects/components/FeaturedProjectsSection';
import { projects } from '../../features/projects/data/projects';

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
  const navigate = useNavigate();

  const handleScrollTo = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    fetch('https://hanlyenergy.tech/wp-json/wp/v2/posts')
    .then(response => {
      // 判断请求是否成功
      if (!response.ok) throw new Error(`请求失败：${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('获取数据成功', data);
    })
    .catch(err => {
      console.error('请求报错：', err);
    });
  }, []);

  return (
    <div className="home-page fade-in">
      <section id="home" className="hero-section">
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
              <Button onClick={() => navigate('/projects')}>View Projects</Button>
              <Button onClick={() => handleScrollTo('open-source')} variant="secondary">
                Open Source
              </Button>
              <Button onClick={() => handleScrollTo('contact')} variant="ghost">
                Contact Me
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
            <h2>丁志鹏</h2>
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

      <FeaturedProjectsSection projects={projects} />

      <section id="expertise" className="section">
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

      <section id="open-source" className="section">
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

      <section id="contact" className="section contact-cta-section">
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
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}