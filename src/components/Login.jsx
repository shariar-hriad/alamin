import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useLogin from '../hooks/useLogin'

const validationSchema = Yup.object({
    username: Yup.string().required('Username must be required!'),
    password: Yup.string().required('Password must be required!'),
})

const Login = () => {
    const { login, isLoading } = useLogin()

    return (
        <section className='login__section'>
            <div className='login__form'>
                <div className='login__form_header'>
                    <h2>Admin Login</h2>
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        login(values)
                    }}
                >
                    <Form>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='username'>
                                Username
                            </label>
                            <Field name='username' className='form-control' type='text' placeholder='username' />
                            <ErrorMessage name='username' component='span' className='text-danger' />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='password'>
                                Password
                            </label>
                            <Field name='password' className='form-control' type='password' placeholder='password' />
                            <ErrorMessage name='password' component='span' className='text-danger' />
                        </div>

                        <input disabled={isLoading} className='btn btn-success' type='submit' value='Login' />
                    </Form>
                </Formik>
            </div>
        </section>
    )
}

export default Login
