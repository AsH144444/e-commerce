import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Cart } from './cart.jsx'
import { Catagories } from './categories.jsx'
import { Checkout } from "./checkout.jsx"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
const router =createBrowserRouter([{
  path:"/",element:<App/>
 
},
{
   path:"/catagories",element:<Catagories/>
},
{
  path:"/cart",element:<Cart/>
},
{
    path: "/checkout",
    element: <Checkout />
}]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
