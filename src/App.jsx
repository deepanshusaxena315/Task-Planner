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
      <div className=''>
        <Navbar />
        <div className="sm:container mx-auto my-6 p-5 rounded-2xl bg-white/5 min-h-[80vh] md:w-3/5 flex-col items-center ">
          <div className='text-4xl mt-4 font-bold text-amber-300/95 w-full mx-auto text-center'> Taskup - Manage your tasks in one place </div>
          <div className="addTodo ">
            <h2 className=" font-bold text-lg mt-10 mb-3 text-white/70 text-center">  Add a to-do:</h2>
            <input onKeyDown={(e) => {if (e.key === "Enter") { handleAdd();}}} value={todo} onChange={handleChange} type="text" className="text-white/80 text-center bg-white/20 p-2 rounded-full outline-none md:w-3/4 ml-16"/>
            <button onClick={handleAdd} disabled={todo.length<=0} className="text-white/80 cursor-pointer bg-cyan-400/70 px-6 py-2 rounded-full ml-6 hover:bg-gray-500/90 hover:text-black/60 font-bold disabled:bg-gray-700/50"> Save </button>
          </div>
          <input onChange={togglefinished} type="checkbox" name="" checked={showFinished} id="" className='accent-white my-5 ml-16  bg-transparent size-3' />   <label htmlFor="showFinished" className="text-sm text-white ml-2">  Show finished</label>
          <div className='h-[1px] bg-black w-[90%] mx-auto my-3 '></div>
          <h1 className='text-3xl font-bold text-center text-black/90'> Your To-dos</h1>
          <div className="todos">
            {todos.length===0 && <div className='mx-6 text-xl my-20 text-center' > Your to-do's will appear here </div> }
            {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center my-3 w-1/2 justify-between ">
              <div className='flex gap-5 ml-10 py-1'>
                <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                <div className = {`${item.isCompleted?"line-through":""} font-bold text-orange-400 sm:min-w-90 md:min-w-50 lg:min-w-120 xl:min-w-140 2xl:min-w-200 `} > {item.todo}</div>
              </div> 
             <div className="buttons flex">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="text-cyan-600 bg-white/20 cursor-pointer  px-2 py-2 rounded-full ml-4 hover:bg-cyan-900 hover:text-white font-bold"><MdEdit size={18} /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="text-red-600 bg-white/20 cursor-pointer  px-2 py-2 rounded-full ml-4 hover:bg-red-900 hover:text-white font-bold"><MdDeleteOutline size={18} /></button>
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