import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MainPage from './MainPage.jsx'
import Movies from './Movies.jsx'
import Search from './Search.jsx'
import Info from './Info.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/'>
            <Route path="*" element={<h1>Something went wrong... Try again later.</h1>} />
            <Route index element={<MainPage/>}/>          
            <Route path='movies' element={<Movies/>}/>
            <Route path='searches' element={<Search/>}/>
            <Route path='info' element={<Info/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)


