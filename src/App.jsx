import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Now from './components/Now'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <About />
        <Projects />
        <Now />
      </main>
      <Footer />
    </div>
  )
}
