import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Vsl1 from './Vsl1'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '')
const isVsl1 = path === '/vsl1'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isVsl1 ? <Vsl1 /> : <App />}
  </React.StrictMode>,
)
