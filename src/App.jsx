import { useState } from 'react'
import { Nav } from './nav'
import { Homepage } from './Homepage'
import './App.css'

function App() {
  const [productName, setProducts] = useState("")
  console.log(productName)
  

  return (
    <>
      
      <Nav setProducts={setProducts}/>
      <Homepage/>
    </>
  )
}

export default App
