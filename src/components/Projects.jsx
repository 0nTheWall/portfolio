import { profile, projectDetails } from '../profile'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { toProjects } from '../lib/repos'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { status, repos, error } = useGitHubRepos(profile.githubUser)
  const projects = toProjects(repos, projectDetails)

  return (
    <section id="projects">
      <div className="section-head">
        <h2>Projects</h2>
        <p className={`status status-${status}`} role="status">
          {statusText(status, projects.length, error)}
        </p>
      </div>
      <div className="grid">
        {status === 'loading'
          ? [1, 2].map(n => <div key={n} className="card skeleton" aria-hidden="true" />)
          : projects.map(project => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}

function statusText(status, count, error) {
  if (status === 'loading') return 'Loading from GitHub…'
  if (status === 'live') return `Live from the GitHub REST API · ${count} ${count === 1 ? 'repository' : 'repositories'}`
  return `Could not load from GitHub (${error}), showing a saved copy`
}
