import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CustomerView from './views/CustomerView'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomerView />
  </StrictMode>,
)
