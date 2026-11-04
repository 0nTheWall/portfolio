// Turns raw GitHub API repos into the cards the Projects section shows:
// forks are dropped, my own details override GitHub's, featured repos come first, then newest.
export function toProjects(repos, details = {}) {
  return repos
    .filter(repo => !repo.fork)
    .map(repo => {
      const extra = details[repo.name] ?? {}
      return {
        id: repo.id,
        name: repo.name,
        title: extra.title ?? repo.name,
        summary: extra.summary ?? repo.description ?? 'No description yet.',
        tags: extra.tags ?? (repo.language ? [repo.language] : []),
        url: repo.html_url,
        homepage: repo.homepage || null,
        updated: repo.pushed_at,
        empty: repo.size === 0,
        featured: Boolean(extra.featured),
      }
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.updated) - new Date(a.updated))
}

export function formatMonth(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
