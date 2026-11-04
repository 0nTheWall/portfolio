import { profile } from '../profile'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Built with React and Vite · project data from the GitHub REST API · hosted on Amazon S3</p>
      <p>© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}
