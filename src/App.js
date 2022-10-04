import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Header from './components/Header';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';
import TestPage from './pages/TestPage';
function App() {
  return (
      <HashRouter>
        <div className="container dark">
          <div className='app'>
          <Header/>
          <Routes>
            <Route path='/' exact element={<NoteListPage/>}/>
            <Route path='/note/:id' element={<NotePage/>}/>
            <Route path='/test/:id' element={<TestPage/>}/>
          </Routes>
          </div>
        </div>
      </HashRouter>
  );
}

export default App;
