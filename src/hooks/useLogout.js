import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { TodoContext } from '../context/todoContext'

const useLogout = () => {
    const { dispatch } = useContext(AuthContext)
    const { dispatch: dispatchTodos } = useContext(TodoContext)

    const logout = () => {
        // remove user from localstorage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchTodos({ type: 'ALL_TODO', payload: null })
    }

    return { logout }
}

export default useLogout
