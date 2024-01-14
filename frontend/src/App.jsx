import { useEffect, useState } from 'react'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import WebFont from 'webfontloader'
import LoginSignup from './Components/User/LoginSignup'
import TaskProfile from './Components/TaskProfile/TaskProfile'
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "JetBrains Mono" ,"Product Sans" , "Droid Serif", "Droid Sans", "Chilanka"]
      }
    })
  }, [])
  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginSignup />} />
      <Route path='/taskprofile' element={<TaskProfile />} />
     </Routes>
    </>
  )
}

export default App
