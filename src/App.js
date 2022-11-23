import { HashRouter, Routes, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';
import TestPage from './pages/TestPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import Home from './pages/Home';
import Profile from './pages/Profile';
import AnalyzeMusic from './pages/AnalyzeMusic';
import IsAlreadyLogin from './utils/IsAlreadyLogin'
import { AnalyzeMusicTwo } from './pages/AnalyzeMusicTwo';
import AnalyzeDate from './pages/AnalyzeDate';
import RecommendPage from './pages/RecommendPage';
function App() {
  return (
      <HashRouter>
        <Navbar/>
        <div className="container dark">
          <div className='app'>
          <AuthProvider>
            <Routes>
                <Route path='/' exact element={<PrivateRoute/>}>
                  <Route path="" element={<Home />} />
                </Route>
                <Route path='/register' exact element={<IsAlreadyLogin/>}>
                  <Route path="" element={<Register />} />
                </Route>
                <Route path='/login' exact element={<IsAlreadyLogin/>}>
                  <Route path="" element={<Login />} />
                </Route>
                <Route path='/notelist' element={<NoteListPage/>}/>
                <Route path='/note/:id' element={<NotePage/>}/>
                <Route path='/test/:id' element={<TestPage/>}/>
                <Route path='/analyzeonemusictwo' element={<AnalyzeMusicTwo/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/analyzeonemusic' element={<AnalyzeMusic/>}/>
                <Route path='/analyzedate' element={<AnalyzeDate/>}/>
                <Route path='/recommend' element={<RecommendPage/>}/>
            </Routes>
          </AuthProvider>
          </div>
        </div>
      </HashRouter>
  );
}

export default App;
