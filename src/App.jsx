import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, SetshowFinished] = useState(true)

  const togglefinished = (params) => {
    SetshowFinished(!showFinished)
  }
  
  const savetoLS = () =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleAdd = () =>{
    setTodos([...todos,{id: uuidv4() ,todo, isCompleted: false}])
    setTodo("")
    console.log(todos);
    savetoLS()
  }
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=> i.id===id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    savetoLS()
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    savetoLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id ===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS()
  }

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
        setTodos(todos);
    }


  }, [])
  

  return (
    <>
      <div className='bg-slate-800'>
        <Navbar />
        <div className="sm:container mx-auto my-9 p-5 rounded-2xl bg-zinc-400 min-h-[80vh] md:w-3/5 flex-col items-center ">
          <div className='text-4xl font-bold w-full mx-auto text-center'> Listly📝 - Manage your tasks in one place </div>
          <div className="addTodo ">
            <h2 className=" font-bold text-lg my-7 text-center">  Add a to-do:</h2>
            <input onKeyDown={(e) => {if (e.key === "Enter") { handleAdd();}}} value={todo} onChange={handleChange} type="text" className="text-black bg-white p-2 rounded-md outline-2 md:w-3/4 ml-7"/>
            <button onClick={handleAdd} disabled={todo.length<=0} className="text-white cursor-pointer bg-green-500 px-4 py-2 rounded-4xl ml-6 hover:bg-green-800 font-bold disabled:bg-green-700"> Save </button>
          </div>
          <input onChange={togglefinished} type="checkbox" name="" checked={showFinished} id="" className=' mt-5 ml-6' /> Show finished
          <div className='h-[1px] bg-black w-[90%] mx-auto my-3 '></div>
          <h1 className='text-3xl font-bold text-center'> Your To-dos</h1>
          <div className="todos">
            {todos.length===0 && <div className='mx-6 text-2xl my-20 text-center' > Your to-do's will appear here </div> }
            {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center my-3 w-1/2 justify-between ">
              <div className='flex gap-5'>
                <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                <div className = {`${item.isCompleted?"line-through":""}  sm:min-w-90 md:min-w-50 lg:min-w-120 xl:min-w-140 2xl:min-w-200 `} > {item.todo}</div>
              </div> 
             <div className="buttons flex">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="text-white cursor-pointer bg-cyan-600 px-2 py-1 rounded-xl ml-4 hover:bg-cyan-900 font-bold"><MdEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="text-white cursor-pointer bg-red-700 px-2 py-1 rounded-xl ml-4 hover:bg-red-900 font-bold"><MdDeleteOutline /></button>
             </div>
            </div>
                    })}
        </div>
      </div>
      </div>

    </>
  )
}

export default App