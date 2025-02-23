<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    
    <App />
    </Provider>
  </StrictMode>,
=======

import { createRoot } from 'react-dom/client'
import { MainLayout } from './layout/MainLayout'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/index.css"
import "./styles/styles.css"
createRoot( document.getElementById( 'root' ) ).render(
  <MainLayout />,
>>>>>>> fad9ed9 (customer view updates)
)
