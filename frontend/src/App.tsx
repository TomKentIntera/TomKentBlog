import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { PostsIndex } from './pages/PostsIndex'
import { PostShow } from './pages/PostShow'

function App() {
  return (
    <>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ fontWeight: 700 }}>
            Blog
          </Link>
          <nav style={{ marginLeft: 'auto' }}>
            <a href="/canvas" target="_blank" rel="noreferrer">
              Admin (Canvas)
            </a>
          </nav>
        </header>

        <main style={{ marginTop: 16 }}>
          <Routes>
            <Route path="/" element={<PostsIndex />} />
            <Route path="/posts/:slug" element={<PostShow />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
