import { profile } from '../profile'

export default function Now() {
  return (
    <section id="now">
      <h2>This quarter</h2>
      <ul className="now-list">
        {profile.now.map(({ label, text }) => (
          <li key={label}>
            <span className="now-label">{label}</span>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
