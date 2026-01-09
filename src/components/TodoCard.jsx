import React from 'react'

export default function TodoCard({ children, handleDeleteTodo, handleEditTodo, index }) {

  const currentText = (children && children.props && children.props.children) || children

  return (
    <li className='todoitem'>
      {children}
      <div className='actionsContainer'>
        <button onClick={() => {
          const updated = window.prompt('Edit todo:', currentText)
          if (updated !== null && typeof handleEditTodo === 'function') {
            handleEditTodo(index, updated)
          }
        }}> 
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        <button onClick={() => {
          if (typeof handleDeleteTodo === 'function') handleDeleteTodo(index)
        }}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  )
}
