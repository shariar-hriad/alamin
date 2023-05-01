import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'
import { AuthContext } from '../context/authContext'
import { TodoContext } from '../context/todoContext'

const validationSchema = Yup.object({
    todo: Yup.string().required('Input must be required!'),
})

const TodoForm = () => {
    const { dispatch } = useContext(TodoContext)
    const { user } = useContext(AuthContext)

    const onSubmit = async (values, { resetForm }) => {
        const response = await axios.post('http://localhost:8080/api/v1/todo/add-todo', values, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })

        resetForm()

        dispatch({ type: 'CREATE_TODO', payload: response.data.new_todo })
    }

    return (
        <Formik
            initialValues={{
                todo: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='todo'>
                        Todo
                    </label>
                    <Field name='todo' className='form-control' component='textarea' placeholder='Add todo' />
                    <ErrorMessage name='todo' component='span' className='text-danger' />
                </div>

                <input className='btn btn-success' type='submit' value='Add Todo' />
            </Form>
        </Formik>
    )
}

export default TodoForm
