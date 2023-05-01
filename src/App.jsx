import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Main'
import { AuthContext } from './context/authContext'

import 'bootstrap/dist/css/bootstrap.css'
import { useContext } from 'react'

function App() {
    const { user } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
