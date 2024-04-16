import React from 'react'
import ReactDOM from 'react-dom/client'
import Coffee from './Coffee.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Coffee />
    </Provider>
  </BrowserRouter>

)
