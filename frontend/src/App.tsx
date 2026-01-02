import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { PostsIndex } from './pages/PostsIndex'
import { PostShow } from './pages/PostShow'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<PostsIndex />} />
          <Route path="/posts/:slug" element={<PostShow />} />
        </Routes>
      </main>
    </>
  )
}

export default App
