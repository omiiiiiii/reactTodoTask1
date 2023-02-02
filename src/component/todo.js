import React, {useEffect, useState } from 'react'
import Spinner from './spinner'
import Todolist from './todolist'

const Todo = () => {
    const [data, setdata] = useState({todoTask:""})
    const host = "http://localhost:5000"
    const todoInitial = [];
    const [isLoading,setIsLoading]=useState(true)
    const [todos, setTodo] = useState(todoInitial);
    const addTask = async (todoTask) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/todo/addTask`, {
          method: 'POST', 
          headers: {            
            'Content-Type': 'application/json'
          },
        
          body: JSON.stringify({todoTask})
        });
    
        const todo = await response.json();
        setTodo(todos.concat(todo))
        geTodo()
      }
      const geTodo=async()=>{
        //TODO API Call
        const response = await fetch(`${host}/api/todo/getallTodo`, {
          
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }); 
        const json =await response.json();  
        setTodo(json) 
      }
    // const {addTask } = context;
    const handleclick =()=>{
      if(data.todoTask!==''){
        addTask(data.todoTask)
        setdata({todoTask:''})
      }
  
}
const enterKey=(e)=>{
  if(e.key==='Enter'){
    handleclick()
  }
}
    const onchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }  
    useEffect(() => {  
      geTodo()
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      // eslint-disable-next-line
    },[])
  return (
    <div>
        <div className='todo-list' style={{color:'white', fontSize:'24px'}}>
            Todo List - Using React & Node JS
        </div>
        <div>
            <input className='add-todo-title-input'onKeyDown={(e)=>{enterKey(e)}} name='todoTask' value={data.todoTask} placeholder='Enter the todo Task ' style={{marginTop:'20px'}} onChange={onchange} />
        </div>
     
        <button  onClick={handleclick} style={{margin:'10px', backgroundColor:'#00C0F0',borderRadius:'5px',cursor:'pointer', color:'white'}}>Add Task</button>
      {isLoading ?<Spinner />:   
            <Todolist todos ={todos} geTodo={geTodo}/>
        }
           </div>
  )
}

export default Todo