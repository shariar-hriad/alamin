import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'

export const TodoContext = createContext({})

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ALL_TODO':
            return {
                todos: action.payload,
            }

        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos],
            }

        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((todo) => todo._id !== action.payload._id),
            }

        default:
            return state
    }
}

const TodoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, {
        todos: [],
    })

    return <TodoContext.Provider value={{ ...state, dispatch }}>{children}</TodoContext.Provider>
}

export default TodoContextProvider

TodoContextProvider.propTypes = {
    children: PropTypes.node,
}
