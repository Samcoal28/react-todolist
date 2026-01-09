import React from 'react'
import TodoCard from './TodoCard'

export default function Todolist({ todos, handleDeleteTodo, handleEditTodo }) {
    return (
        <ul className='main'>
            {todos.map((todo, todoindex) => (
                <TodoCard
                  key={todoindex}
                  index={todoindex}
                  handleDeleteTodo={handleDeleteTodo}
                  handleEditTodo={handleEditTodo}
                >
                  <p>{todo}</p>
                </TodoCard>
            ))}
        </ul>
    )
}