import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { fetchProjects, type Project } from '../lib/github'
import { profile } from '../data/profile'

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data)
          setOpen(data[0]?.name ?? null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-8">
      <header>
        <p className="font-mono text-xs tracking-[0.35em] text-magenta uppercase">
          uplink // github.com/{profile.githubUser}
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-[0.16em] text-cyan uppercase neon-text">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-cyan/80">
          Public repositories loaded live from GitHub. Each description is the repo&apos;s README.md.
        </p>
      </header>

      {loading && (
        <p className="font-mono animate-pulse text-cyan">SYNCING REPOSITORIES…</p>
      )}
      {error && (
        <p className="panel p-4 font-mono text-magenta">
          Uplink failed: {error}. GitHub rate limits can block anonymous API calls — refresh in a
          minute.
        </p>
      )}

      <ul className="space-y-5">
        {projects.map((project) => {
          const expanded = open === project.name
          return (
            <li key={project.name} className="panel overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : project.name)}
                className="flex w-full flex-col gap-2 px-5 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-display block text-lg tracking-widest text-cyan uppercase">
                    {project.name}
                  </span>
                  <span className="font-mono text-xs text-cyan/60">
                    {project.language ?? 'unknown'} · updated{' '}
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </span>
                <span className="font-mono text-xs text-magenta uppercase">
                  {expanded ? '[-] collapse' : '[+] expand readme'}
                </span>
              </button>
              {expanded && (
                <div className="border-t border-cyan/20 px-5 py-5">
                  <div className="mb-4 flex flex-wrap gap-3 font-mono text-xs">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-magenta hover:underline"
                    >
                      Open on GitHub →
                    </a>
                    {project.homepage ? (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan hover:underline"
                      >
                        Live site →
                      </a>
                    ) : null}
                  </div>
                  {project.readme ? (
                    <article className="markdown">
                      <Markdown remarkPlugins={[remarkGfm]}>{project.readme}</Markdown>
                    </article>
                  ) : (
                    <p className="font-mono text-sm text-cyan/60">
                      {project.description || 'No README.md found in this repository.'}
                    </p>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
