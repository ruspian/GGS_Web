import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastProvider } from "@heroui/toast";
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement='top-center' toastOffset={60} name='toast' />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HeroUIProvider>
  </StrictMode>,
)
