import { formatMonth } from '../lib/repos'

export default function ProjectCard({ project }) {
  return (
    <article className={project.featured ? 'card featured' : 'card'}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <ul className="tags">
        {project.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      <div className="card-footer">
        <span className="links">
          {project.empty
            ? <span className="muted">Code not pushed yet</span>
            : <a href={project.url}>View code</a>}
          {project.homepage && <a href={project.homepage}>Live site</a>}
        </span>
        <span className="muted">Updated {formatMonth(project.updated)}</span>
      </div>
    </article>
  )
}
