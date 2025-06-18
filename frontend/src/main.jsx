import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HeroUIProvider>
  </StrictMode>,
)
