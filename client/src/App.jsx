import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BoardsGrid from './pages/BoardsGrid.jsx'
import BoardView from './pages/BoardView.jsx'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <>
      <BrowserRouter>
      <div className="top">
      <header>
        <h1>Kudoboard</h1>

      </header>
        <main>
          <Routes>
            <Route path="/" element = {<BoardsGrid/>}/>
            <Route path="/boards/:boardId" element = {<BoardView/>}/>
          </Routes>
        </main>
        </div>
      <header>
        Created By T.J. Nickerson, 2025
      </header>
      </BrowserRouter>
    </>
  )
}

export default App
