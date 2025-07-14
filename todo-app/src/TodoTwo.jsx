import React, { useState } from 'react'

const TodoTwo = () => {

    const [input , setInput] = useState("")
   const [todoList , setTodoList] = useState([])
      const [editingId , setEditingId] = useState(null)

   



   const addTodoItem = () => {

    if (input.trim() === "") return


    if(editingId !== null){

        setTodoList(

            todoList.map(t => {

                if(t.id === editingId){

                    return{
                        ...t, 
                        text: input.trim() }

                } else {
                    return t
                }
            })

        )

        setEditingId(null)
    }

    else{
      

      const item = {

        id : Date.now(),
        text : input.trim(),
        completed : false,
       }

     setTodoList(prev => [...prev, item])

     setInput("")
    }
    
   }



   const toggleCompleted = (id) => {
     
    setTodoList(
        todoList.map(t => {
            if(t.id === id)  {
                return {
                    // spread all we have in t  and pick completed property and change it's and toggle between true and false
                    ...t,
                 completed: !t.completed
                }
            } else {
                return t
            }
            }
        )
    )
   }


   const deleteTodo = (id) => {
      setTodoList(
    todoList.filter(item => item.id !== id )
)
   }

   const editTodo = (id) => {
  
    // Here you have to find out with the id not index number
    const todoToEdit = todoList.find(t => t.id === id)

    // if todoToEdit is true, put it's text value in the input field 
    if(todoToEdit){
        setInput(todoToEdit.text)

        setEditingId(id)
    }
     
   }

   const cancelEdit = () => {
    setEditingId(null)
    setInput("")
   }



  return (

    <div>

        

            <input type="text"
            placeholder='Enter todo'
            name = ""
            value={input}
            onChange={(e) => setInput(e.target.value)}

            
            />
        

            <button onClick ={(e)=> addTodoItem()}>Add</button>




        

        <ul>
            {
                todoList.map(t => <li key={t.id}>
                    <input type="checkbox" checked = {t.completed} onChange={() => toggleCompleted(t.id)} />
                    <span className={t.completed ?'strikeThrough' : ""}>{t.text}</span>
                    <button onClick={()=>{deleteTodo(t.id)}}>Delete</button>
                    <button onClick={()=>{editTodo(t.id)}}>Edit</button>

                    <button onClick={()=> cancelEdit()}> Cancel Edit</button>

                </li>)
            }
        </ul>
        

    </div>
  )
}

export default TodoTwo