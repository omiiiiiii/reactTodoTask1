import React, { useEffect, useState } from 'react'

const Todolist = ({todos,geTodo}) => {
  var checkedData=[]
  const [todolength,setTodolength]=useState(0)
  const [isActive,setisActive]=useState(false)
  const manageAll=()=>{
    todos.map((item,index)=>{   

        document.getElementById(index).style.visibility='visible'
     
    })
    setTodolength(todos.length)
  }
  useEffect(() => {
    todos.map((item)=>{
        checkedData.push(item._id)
     
    })
  }, [todos])
  
  const manageComplte=()=>{
    var Count = 0
    checkedData.map((item,index)=>{
      if(document.getElementById(item).type==='checkbox')
      {
        Count=Count+1
        document.getElementById(index).style.visibility= 'hidden'
      }
      else{
        document.getElementById(index).style.color= 'green'
      }
     
    })
    setTodolength(todos.length-Count)
  }
  const host = "http://localhost:5000"
  const todoInitial = [];
  const [todoes, setTodo] = useState(todoInitial);
const deleteTodo= async(id)=>{
  // API Call
  const response = await fetch(`${host}/api/todo/deletetodo/${id}`, {
   method: 'DELETE',
   headers: {
     'Content-Type': 'application/json'
   }
 });
 const newTodo= todoes.filter((todoes)=>{return todoes._id!==id})
 setTodo(newTodo);
 geTodo();
}

  const manageActive= ()=>{
    todos.map((item)=>{
      if(checkedData.indexOf(item._id)===-1){
        checkedData.push(item._id)
      }
     
    })

    checkedData.map((item,index)=>{
      if(document.getElementById(item).checked){
        document.getElementById(item).type='radio'//
        document.getElementById(index).style.color='red'//
      }
     
    })
  }
  return (
    <div style={{color:'white', margin:'10px'}}>
        {todos.map((item,index)=>{
           return <>
           <div  id={index} style={{display:'flex' ,alignItems:'center'}}>
                <input type="checkbox" id={item._id}  name={item.todoTask}   value={item.todoTask} />
                <label for={item._id} > {item.todoTask}</label><br></br>
                <button style={{margin:'10px' , backgroundColor:'#00C0F0',borderRadius:'5px',cursor:'pointer', color:'white'}} onClick={()=>{deleteTodo(item._id)}} >Delete</button>
            </div>
           </>     
        })}

        <div>
          Total Count:{todolength?todolength:todos.length}
        </div>
      {todos.length ?   <div>
        <div style={{margin:'10px'}}>
            Filter Options:
        </div>
        <div>
            <button style={{margin:'10px' , backgroundColor:'#00C0F0',borderRadius:'5px',cursor:'pointer', color:'white',}}  onClick={manageActive} >Active</button>
            <button style={{margin:'10px', backgroundColor:'#00C0F0',borderRadius:'5px',cursor:'pointer', color:'white'}} onClick={manageComplte}>Completed</button>
            <button style={{margin:'10px', backgroundColor:'#00C0F0',borderRadius:'5px',cursor:'pointer', color:'white'}} onClick={manageAll}>All</button>
        </div>
        <div>
            <ul style={{color:'white'}}>
                <li>Active button make checkbox to radio button </li>
                <li>Complete button show the list on Task for which checkbox become radio button</li>
                <li>All button show the list of all task</li> 
            </ul>
        </div>
    </div>:''}
        </div>
    
  ) 
}

export default Todolist