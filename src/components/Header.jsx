import { profile } from '../profile'

export default function Header() {
  const { name, tagline, links } = profile

  return (
    <header className="hero">
      <nav className="top-nav" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#now">This quarter</a>
      </nav>
      <h1>{name}</h1>
      <p className="tagline">{tagline}</p>
      <div className="actions">
        <a className="button primary" href={links.github}>GitHub</a>
        <a className="button" href={links.linkedin}>LinkedIn</a>
        {links.resume && <a className="button" href={links.resume}>Resume</a>}
      </div>
    </header>
  )
}
