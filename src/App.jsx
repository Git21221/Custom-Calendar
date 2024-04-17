import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calender from './componenets/Calendar'

function App() {
const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Calender isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}

export default App
