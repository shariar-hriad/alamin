import axios from 'axios'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { TodoContext } from '../context/todoContext'

const Todo = ({ todo }) => {
    const { dispatch } = useContext(TodoContext)
    const { user } = useContext(AuthContext)

    const handleDelete = async () => {
        const response = await axios.delete(`http://localhost:8080/api/v1/todo/${todo?._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })

        dispatch({ type: 'DELETE_TODO', payload: response.data })
    }

    return (
        <div className='col-12'>
            <div className='p-4 border rounded shadow-sm'>
                <pre className='lead'>
                    <code>{todo.todo}</code>
                </pre>
                <button className='btn text-capitalize fw-bold btn-danger' onClick={handleDelete}>
                    delete
                </button>
            </div>
        </div>
    )
}

export default Todo

Todo.propTypes = {
    todo: PropTypes.any,
}
