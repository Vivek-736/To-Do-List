import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () =>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo("")
    saveToLS()
  }

  const ToggleFinished = () =>{
    setShowFinished(!showFinished)
  }

  const handleChange = (e) =>{
    settodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id != id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item =>{
      return item.id != id
    })
    settodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="bg-violet-100 mx-10 my-5 rounded-xl p-5 min-h-[80vh]">
        <h1 className='font-bold text-center text-xl'>iTask - Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-slate-800 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input className='my-4' onChange={ToggleFinished} type="checkbox" name="" id="" checked={showFinished}/> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item =>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 md:w-1/4 justify-between">
            <div className='flex gap-7'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div> 
    </>
  )
}

export default App
