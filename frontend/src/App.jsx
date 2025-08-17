
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"



const App = () => {
  return (
   <div>
<Router>
<Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
</Router>

   </div>
  )
}

export default App