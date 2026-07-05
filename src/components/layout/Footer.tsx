import { Container } from './Container';

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <p>© {new Date().getFullYear()} Dingyiwei</p>

        <div className="site-footer__links">
          <a href="https://github.com/dingyiweije" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="/open-source">Open Source</a>
          <a href="/contact">Contact</a>
        </div>
      </Container>
    </footer>
  );
}