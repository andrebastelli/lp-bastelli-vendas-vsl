import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const path = window.location.pathname.replace(/\/+$/, '')
const isVsl1 = path === '/vsl1'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App gated={isVsl1} />
  </React.StrictMode>,
)
