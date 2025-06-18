import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BoardsGrid from './pages/BoardsGrid.jsx'
import BoardView from './pages/BoardView.jsx'
import CardView from './pages/CardView.jsx'

function App() {

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
            <Route path="/cards/:cardId" element = {<CardView/>}/>
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
