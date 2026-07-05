import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { Container } from './Container';

const navItems = [
  { label: '项目', to: '/projects' },
  { label: '实验室', to: '/labs' },
  { label: '开源', to: '/open-source' },
  { label: '关于', to: '/about' },
  { label: '联系', to: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="group flex items-center gap-3"
          aria-label="返回首页"
        >
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-sm font-black text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)] transition-transform group-hover:scale-105">
            DY
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-wide text-white">
              Ding Yiwei
            </span>
            <span className="block truncate font-mono text-[11px] text-slate-400">
              前端架构 / 可视化 / 跨端开发
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-100 transition-colors hover:bg-white/[0.08] md:hidden"
          aria-label={isMenuOpen ? '关闭导航菜单' : '打开导航菜单'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={[
                'h-0.5 w-5 rounded-full bg-current transition-transform',
                isMenuOpen ? 'translate-y-1.5 rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'h-0.5 w-5 rounded-full bg-current transition-opacity',
                isMenuOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'h-0.5 w-5 rounded-full bg-current transition-transform',
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>
      </Container>

      {isMenuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-16 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
            aria-label="关闭导航菜单"
            onClick={closeMenu}
          />

          <div
            id="mobile-navigation"
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] z-50 rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:hidden"
          >
            <nav className="space-y-2" aria-label="移动端导航">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      'block rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
                      isActive
                        ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100'
                        : 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/20 hover:bg-white/[0.06]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
              <p className="text-sm font-medium text-cyan-100">
                Developer Portfolio 正在持续升级中
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                后续会接入 Three.js、D3.js、Canvas、Unity WebGL、开源项目和技术博客。
              </p>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}