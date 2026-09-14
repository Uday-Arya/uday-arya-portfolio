import { NavLink, Outlet } from 'react-router-dom'
import { profile } from '../data/profile'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
]

export function Layout() {
  return (
    <div className="grid-bg relative min-h-screen">
      <div className="scanlines" />
      <div className="vignette" />
      <header className="sticky top-0 z-30 border-b border-cyan/25 bg-void/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <NavLink to="/" className="font-display text-sm tracking-[0.28em] text-cyan neon-text">
            {profile.handle}
          </NavLink>
          <nav className="flex gap-1 font-mono text-xs uppercase tracking-[0.22em] sm:gap-4 sm:text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-2 py-1 transition ${
                    isActive
                      ? 'text-magenta shadow-[0_0_12px_rgba(255,43,214,0.6)]'
                      : 'text-cyan/70 hover:text-cyan'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <Outlet />
      </main>
      <footer className="relative z-10 border-t border-cyan/20 px-4 py-6 text-center font-mono text-xs text-cyan/60">
        SIGNAL LIVE // {profile.name} //{' '}
        <a className="text-magenta hover:underline" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>{' '}
        ·{' '}
        <a className="text-magenta hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </footer>
    </div>
  )
}
