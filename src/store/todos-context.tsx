import React, { useState } from "react";
import Todo from "../models/todos";

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

type Props = {children: React.ReactNode};

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (text: string) => { },
    removeTodo: (id: string) => { },
})

const TodosContextProvider: React.FC<Props> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([])

    const addToDoHandler = (text: string) => {
        setTodos((prevTodos) => {
            return prevTodos.concat(new Todo(text))
        })
    }

    const removeToDoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => {
                return todo.id !== todoId;
            })
        })
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addToDoHandler,
        removeTodo: removeToDoHandler,
    }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodosContextProvider;