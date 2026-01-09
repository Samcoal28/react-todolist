import React from "react"

export default function Todoinput({ handleAddTodos }) {

    const [todoValue, setTodoValue] = React.useState('')

    return(
        <header>
          <input placeholder="Enter Todo..." 
               value={todoValue} onChange={(e) => 
           setTodoValue(e.target.value)} />
          <button onClick={() => {
            handleAddTodos(todoValue)
            setTodoValue('')
          }}>Add</button>
        </header>
    )
}