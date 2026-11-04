import { profile } from '../profile'

export default function About() {
  return (
    <section id="about">
      <h2>About</h2>
      {profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <div className="skill-groups">
        {profile.skills.map(({ group, items }) => (
          <div key={group}>
            <h3>{group}</h3>
            <ul className="chips">
              {items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
