import axios from 'axios'
import { useContext, useEffect } from 'react'
import { TodoContext } from '../context/todoContext'
import Todo from './Todo'
import TodoForm from './TodoForm'

const Home = () => {
    const { todos, dispatch } = useContext(TodoContext)

    useEffect(() => {
        const fetch_todo = async () => {
            const response = await axios.get('http://localhost:8080/api/v1/todo/')

            dispatch({ type: 'ALL_TODO', payload: response.data })
        }

        fetch_todo()
    }, [dispatch])

    return (
        <section className='main__section'>
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
        </section>
    )
}

export default Home
