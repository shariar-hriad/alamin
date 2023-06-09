import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext'
import { TodoContext } from '../context/todoContext'
import useLogout from '../hooks/useLogout'
import Todo from './Todo'
import TodoForm from './TodoForm'

const Home = () => {
    const { todos, dispatch } = useContext(TodoContext)
    const { user } = useContext(AuthContext)
    const { logout } = useLogout()

    useEffect(() => {
        const fetch_todo = async () => {
            const response = await axios.get('http://localhost:8080/api/v1/todo/')

            dispatch({ type: 'ALL_TODO', payload: response.data })
        }

        if (user) {
            fetch_todo()
        }
    }, [dispatch, user])

    return (
        <section className='main__section position-relative z-0'>
            <div className='container'>
                <div className='row'>
                    {/* left */}
                    <div className='col-lg-4 px-3 py-3'>
                        <TodoForm />
                    </div>
                    {/* right */}
                    <div className='col-lg-8 px-lg-5'>
                        <h2 className='display-3 mb-3'>Todos</h2>
                        <div className='row gap-3 justify-content-center'>
                            {todos?.map((todo) => (
                                <Todo todo={todo} key={todo._id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={logout} className='btn btn-info fw-bold logout'>
                Log Out
            </button>
        </section>
    )
}

export default Home
