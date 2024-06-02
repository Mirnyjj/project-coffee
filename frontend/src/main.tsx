import ReactDOM from 'react-dom/client'
import Coffee from './Coffee.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from './store.ts'

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Coffee />
    </Provider>
  </BrowserRouter>

)
