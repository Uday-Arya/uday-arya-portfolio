import { profile } from '../data/profile'

export type Repo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  default_branch: string
  topics: string[]
  homepage: string | null
  fork: boolean
}

export type Project = Repo & {
  readme: string | null
}

const SKIP = new Set(['uday-arya-portfolio'])

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=updated`,
  )
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: could not load repositories`)
  }
  const repos = (await res.json()) as Repo[]
  const visible = repos.filter((repo) => !repo.fork && !SKIP.has(repo.name))

  return Promise.all(
    visible.map(async (repo) => ({
      ...repo,
      readme: await fetchReadme(repo.name, repo.default_branch),
    })),
  )
}

async function fetchReadme(repo: string, branch: string): Promise<string | null> {
  const names = ['README.md', 'readme.md', 'Readme.md']
  for (const name of names) {
    const url = `https://raw.githubusercontent.com/${profile.githubUser}/${repo}/${branch}/${name}`
    const res = await fetch(url)
    if (res.ok) {
      const text = await res.text()
      return rewriteReadmeAssets(text, repo, branch)
    }
  }
  return null
}

function rewriteReadmeAssets(markdown: string, repo: string, branch: string) {
  const base = `https://raw.githubusercontent.com/${profile.githubUser}/${repo}/${branch}/`
  return markdown.replace(
    /(!?\[[^\]]*]\()(?!https?:\/\/|mailto:|#)([^)]+)(\))/g,
    (_match, open: string, path: string, close: string) => {
      const cleaned = path.replace(/^\.\//, '').replace(/^\//, '')
      return `${open}${base}${cleaned}${close}`
    },
  )
}
