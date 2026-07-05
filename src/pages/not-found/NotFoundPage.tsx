import { Link } from 'react-router';

import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="section fade-in">
      <Container>
        <p className="card-kicker">404</p>
        <h1>页面未找到。</h1>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          您要查找的页面不存在或已被移动。
        </p>

        <Button href="/">返回首页</Button>

        <p style={{ marginTop: 16 }}>
          <Link to="/projects">查看项目</Link>
        </p>
      </Container>
    </section>
  );
}