import { NavLink } from 'react-router';

import { Container } from './Container';

const navItems = [
  { label: 'Projects', to: '/projects' },
  { label: 'Labs', to: '/labs' },
  { label: 'Open Source', to: '/open-source' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <NavLink to="/" className="site-logo" aria-label="Go to homepage">
          <span className="site-logo__mark">DY</span>
          <span className="site-logo__text">Ding Yiwei</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}