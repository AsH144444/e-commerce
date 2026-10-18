import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Catagories } from './categories.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router =createBrowserRouter([{
  path:"/",element:<App/>
 
},
{
   path:"/catagories",element:<Catagories/>
}]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
