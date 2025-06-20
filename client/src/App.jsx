import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BoardsGrid from './pages/BoardsGrid.jsx'
import BoardView from './pages/BoardView.jsx'
import { useState } from 'react'
const storedDarkMode = () => (localStorage.getItem('darkMode') == "true");

function App() {
  const [darkMode, setDarkMode] = useState(storedDarkMode)
  const toggleDarkMode = () =>{
    setDarkMode(!darkMode)
    localStorage.setItem("darkMode",(!darkMode).toString())
  }
  return (
    <>
      <BrowserRouter>
      <div className="top">
      <header className={darkMode ? "dark-mode" : "light-mode"}>
        <h1>Kudoboard</h1>
        <div className='dark-mode-toggle'>
          <button id="dark-mode-button" onClick={toggleDarkMode}>{darkMode ? "Dark": "Light"} Mode</button>
        </div>
      </header>
        <main className={darkMode ? "dark-mode" : "light-mode"}>
          <Routes>
            <Route path="/" element = {<BoardsGrid/>}/>
            <Route path="/boards/:boardId" element = {<BoardView/>}/>
          </Routes>
        </main>
        </div>
      <header className={darkMode ? "dark-mode" : "light-mode"}>
        Created By T.J. Nickerson, 2025
      </header>
      </BrowserRouter>
    </>
  )
}

export default App
