import { useEffect, useState } from "react"




const TodoThree = () => {

const [todo , setTodo] = useState("")

const [todoList , setTodoList] = useState([])

const [editIndicator , setEditIndicator] = useState(null)

const [initialLoad , setInitialLoad] = useState (true)



useEffect(()=> {
    
    if(!initialLoad){
           localStorage.setItem("reactTodo", JSON.stringify(todoList))

    }
}, [todoList])


useEffect(() => {
    const storedTodo = localStorage.getItem("reactTodo")
    if(storedTodo){
        setTodoList(JSON.parse(storedTodo))

    }
    setInitialLoad(false)
}, [])



const handleSubmittion = (e) => {

    e.preventDefault()

     if (todo.trim() === "") return



    if(editIndicator != null){
        setTodoList (
            todoList.map(t => {
                if(t.id === editIndicator){
                    return{
                        ...t,
                        // here we set out text to what the user is typing presently 
                        text : todo.trim()
                    }
                }else {
                    return t
                }
            })
        )
        
    } else {

    const item = {
        id : todoList.length +1,
        text : todo.trim(),
        completed : false
    }

    setTodoList( prev => [...prev, item])
    setTodo("")

  }
}



const toggleCompleted = (id) => {

    setTodoList (
        todoList.map(t => {
          if(t.id === id){
             return{
               
                ...t,
                completed : !t.completed
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
        todoList.filter(t => t.id != id)
    )

}

const cancelEdit = () => {
    setEditIndicator(null)
    setTodo('')
}


const editTodo = (id) => {
    const todoToEdit = todoList.find(t => t.id === id)

    setTodo(todoToEdit.text)

    setEditIndicator(id)



}



  return (

    <div>
        <form onSubmit={handleSubmittion} >

            <input type="text"
             name="todo"
             placeholder="Enter todo"
             value={todo || ""}
             onChange={(e) => setTodo(e.target.value) }
             />
             <button type="submit">Add Todo</button>



        </form>

        <ul>

            {
              todoList.map(t => 
                <li key={t.id}>
                <input type="checkbox" checked={t.completed} onChange={()=> {toggleCompleted(t.id)} }  />
                    <span className={t.completed ? "strikeThrough" : "" }>{t.text}</span>
                    <button onClick={()=> { editTodo(t.id)}}>edit</button>
                    <button onClick={() => {deleteTodo(t.id)}}>Delete</button>

              {editIndicator !== null && ( <button onClick={() => cancelEdit()}>CancelEdit</button>
                   )}


                </li>
          )
            }
        </ul>
        


    </div>
  )
}

export default TodoThree