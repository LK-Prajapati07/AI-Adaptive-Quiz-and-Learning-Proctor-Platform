import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { 
  QueryClient, 
  QueryClientProvider 
} from "@tanstack/react-query"

import App from './App.jsx'
import { Toaster } from "sonner"
import { store } from './store/store'
import AuthInit from './components/AuthInit'


const queryClient = new QueryClient({

  defaultOptions: {

    queries: {

      refetchOnWindowFocus: false,

      retry: 1,

    },

  },

})


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Provider store={store}>

      <QueryClientProvider client={queryClient}>

        <BrowserRouter>

          <Toaster/>

          <AuthInit><App/></AuthInit>

        </BrowserRouter>

      </QueryClientProvider>

    </Provider>

  </StrictMode>

)