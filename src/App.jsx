import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleAdd = () =>{
    setTodos([...todos,{id: uuidv4() ,todo, isCompleted: false}])
    setTodo("")
    console.log(todos);
  }
  const handleEdit = (e,id)=>{
    let t = todos.filter(i=> i.id===id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
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
  }
  return (
    <>
      <Navbar />
        <div className="container mx-auto my-9 p-5 rounded-2xl bg-green-300 min-h-[80vh] flex-col items-center ">
          <div className="addTodo ">
            <h2 className=" font-bold text-lg my-5 ">  Add todo </h2>
            <input  value={todo} onChange={handleChange} type="text" className="text-black bg-white p-2 rounded-md outline-2 w-2xl"/>
            <button onClick={handleAdd} className="text-white bg-green-900 px-4 py-2 rounded-md ml-6 hover:bg-green-700 font-bold"> Add </button>
          </div>
          <h1 className='text-2xl font-bold'> Your Todos</h1>
          <div className="todos">
            {todos.length===0 && <div className='mx-6 text-3xl my-6' > No todos to display </div> }
            {todos.map(item => {

            return <div key={item.id} className="todo flex items-center my-3 w-1/2 justify-between ">
              <div className='flex gap-9'>
                <input name={item.id} type="checkbox" value={item.isCompleted} onChange={handleCheckbox} />
                <div className= {item.isCompleted?"line-through":""} > {item.todo}</div>
              </div> 
             <div className="buttons">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="text-white bg-green-900 px-2 py-1 rounded-md ml-4 hover:bg-green-700 font-bold">Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="text-white bg-green-900 px-2 py-1 rounded-md ml-4 hover:bg-green-700 font-bold">Delete</button>
             </div>
            </div>
                    })}
        </div>
      </div>

    </>
  )
}

export default App