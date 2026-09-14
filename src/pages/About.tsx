import { profile } from '../data/profile'

export function About() {
  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-xs tracking-[0.35em] text-magenta uppercase">dossier // identity</p>
        <h1 className="font-display mt-2 text-3xl tracking-[0.16em] text-cyan uppercase neon-text">
          About Me
        </h1>
      </header>

      <section className="panel p-6">
        <h2 className="font-display mb-4 text-sm tracking-[0.3em] text-amber uppercase">About</h2>
        <p className="text-lg leading-relaxed text-cyan/90">{profile.about}</p>
        <p className="mt-4 font-mono text-xs text-cyan/50">
          Source:{' '}
          <a href={profile.linkedin} className="text-magenta hover:underline" target="_blank" rel="noreferrer">
            LinkedIn profile
          </a>
        </p>
      </section>

      <section className="panel p-6">
        <h2 className="font-display mb-6 text-sm tracking-[0.3em] text-amber uppercase">Experience</h2>
        <ol className="space-y-6">
          {profile.experience.map((job) => (
            <li key={`${job.title}-${job.dates}`} className="border-l-2 border-magenta/60 pl-4">
              <p className="font-display text-sm tracking-widest text-cyan uppercase">{job.title}</p>
              <a
                href={job.orgUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg text-magenta hover:underline"
              >
                {job.org}
              </a>
              <p className="font-mono text-sm text-cyan/70">
                {job.dates} · {job.duration}
              </p>
              <p className="text-sm text-cyan/80">
                {job.location} · {job.detail}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-8 border-t border-cyan/20 pt-6">
          <h3 className="font-display mb-4 text-xs tracking-[0.28em] text-cyan/70 uppercase">
            Education
          </h3>
          {profile.education.map((edu) => (
            <div key={edu.title} className="border-l-2 border-cyan/50 pl-4">
              <p className="font-display text-sm tracking-widest text-cyan uppercase">{edu.title}</p>
              <a
                href={edu.orgUrl}
                target="_blank"
                rel="noreferrer"
                className="text-lg text-magenta hover:underline"
              >
                {edu.org}
              </a>
              <p className="font-mono text-sm text-cyan/70">{edu.dates}</p>
              <p className="text-sm text-cyan/80">{edu.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-6">
        <h2 className="font-display mb-6 text-sm tracking-[0.3em] text-amber uppercase">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {profile.skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono mb-3 text-xs tracking-[0.24em] text-cyan uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-sm text-cyan"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
