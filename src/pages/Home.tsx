import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export function Home() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs tracking-[0.4em] text-magenta uppercase">
        // access granted · ottawa node
      </p>
      <motion.h1
        data-text={profile.name}
        className="glitch font-display mt-4 text-4xl font-black uppercase tracking-[0.12em] text-white neon-text sm:text-6xl md:text-7xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {profile.name}
      </motion.h1>
      <p className="mt-5 max-w-2xl font-mono text-sm text-cyan/80 sm:text-base">
        {profile.headline} @ {profile.school}
        <br />
        {profile.location}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/about"
          className="border border-cyan px-6 py-2 font-display text-xs tracking-[0.24em] text-cyan uppercase transition hover:bg-cyan hover:text-void"
        >
          About Protocol
        </Link>
        <Link
          to="/projects"
          className="border border-magenta px-6 py-2 font-display text-xs tracking-[0.24em] text-magenta uppercase transition hover:bg-magenta hover:text-void"
        >
          Load Projects
        </Link>
      </div>
      <img
        src={profile.avatar}
        alt={profile.name}
        className="mt-12 h-28 w-28 rounded-full border-2 border-cyan object-cover shadow-[0_0_30px_rgba(0,255,240,0.35)]"
      />
    </div>
  )
}
