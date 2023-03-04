import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'

const All_routes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
    </Routes>
  )
}

export default All_routes
