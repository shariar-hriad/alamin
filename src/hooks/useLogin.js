import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useContext(AuthContext)

    const login = async (values) => {
        setIsLoading(true)
        setError(null)

        const response = await axios.post('http://localhost:8080/api/v1/user/login', values)

        localStorage.setItem('user', JSON.stringify(response.data))

        dispatch({ type: 'LOGIN', payload: response.data })

        setIsLoading(false)
    }

    return { login, isLoading, error }
}

export default useLogin
