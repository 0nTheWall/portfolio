import { useEffect, useState } from 'react'
import fallbackRepos from '../data/fallback-repos.json'

// Loads a user's public repos from the GitHub REST API.
// status is 'loading', then 'live' on success or 'fallback' (saved snapshot) on any error,
// such as being offline or hitting GitHub's limit of 60 unauthenticated requests per hour.
export function useGitHubRepos(user) {
  const [state, setState] = useState({ status: 'loading', repos: [], error: null })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100`, {
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub responded ${res.status}`)
        return res.json()
      })
      .then(repos => setState({ status: 'live', repos, error: null }))
      .catch(err => {
        if (err.name === 'AbortError') return
        setState({ status: 'fallback', repos: fallbackRepos, error: err.message })
      })

    // Cancel the request if the component unmounts before it finishes.
    return () => controller.abort()
  }, [user])

  return state
}
