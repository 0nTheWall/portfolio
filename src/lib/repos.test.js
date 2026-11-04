import { describe, expect, it } from 'vitest'
import { toProjects } from './repos'

const repo = (overrides) => ({
  id: 1,
  name: 'demo',
  description: 'From GitHub',
  language: 'Java',
  html_url: 'https://github.com/someone/demo',
  homepage: '',
  fork: false,
  size: 10,
  pushed_at: '2026-01-01T00:00:00Z',
  ...overrides,
})

describe('toProjects', () => {
  it('drops forks', () => {
    const projects = toProjects([repo({ id: 1 }), repo({ id: 2, fork: true })])
    expect(projects.map(p => p.id)).toEqual([1])
  })

  it('uses my details over the GitHub description', () => {
    const [project] = toProjects([repo()], { demo: { title: 'Demo App', summary: 'Mine', tags: ['React'] } })
    expect(project).toMatchObject({ title: 'Demo App', summary: 'Mine', tags: ['React'] })
  })

  it('falls back to the repo name, description and language', () => {
    const [project] = toProjects([repo()])
    expect(project).toMatchObject({ title: 'demo', summary: 'From GitHub', tags: ['Java'] })
  })

  it('handles a repo with no description, language or code', () => {
    const [project] = toProjects([repo({ description: null, language: null, size: 0 })])
    expect(project).toMatchObject({ summary: 'No description yet.', tags: [], empty: true })
  })

  it('puts featured repos first, then the most recently pushed', () => {
    const projects = toProjects(
      [
        repo({ id: 1, name: 'old', pushed_at: '2025-01-01T00:00:00Z' }),
        repo({ id: 2, name: 'new', pushed_at: '2026-06-01T00:00:00Z' }),
        repo({ id: 3, name: 'star', pushed_at: '2024-01-01T00:00:00Z' }),
      ],
      { star: { featured: true } },
    )
    expect(projects.map(p => p.name)).toEqual(['star', 'new', 'old'])
  })
})
