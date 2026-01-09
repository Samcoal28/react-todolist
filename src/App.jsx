import { useState } from "react"
import Todoinput from "./components/Todoinput"
import Todolist from "./components/Todolist"

function App() {
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem('todos')
    return localTodos ? JSON.parse(localTodos).todos : [
         "Learn React",
         "Build a Todo App", 
         "Master JavaScript"
    ]
  })    

  function persistData(newlist) {
    localStorage.setItem('todos', JSON.stringify({ todos:
      newlist }))
  }

  function handleAddTodo(newTodo) {
      const newTodolist = [...todos, newTodo]
      setTodos(newTodolist)
      persistData(newTodolist)
  }
  
   function handleDeleteTodo(todoIndex) {
      const newTodolist = todos.filter((todo, index) => {
        return index !== todoIndex
      })
      setTodos(newTodolist)
      persistData(newTodolist)  
   }

    function handleEditTodo(todoIndex, updatedTodo) {
      const newTodolist = todos.map((todo, index) => 
         index === todoIndex ? updatedTodo : todo
      )
      setTodos(newTodolist)
      persistData(newTodolist)
   }



  return (
    <>
      <Todoinput handleAddTodos={handleAddTodo} />
      <Todolist handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos} />
    </>
  )
}

export default App
