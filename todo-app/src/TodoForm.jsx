import { useEffect, useState } from "react"
import TodoComponent from "./TodoComponent.jsx"

export default function TodoForm(){
      

    const [todo, setTodoValue] = useState ("")

        //   creating the array using state
    const [enteredTodos, setEnteredTodos] = useState([])

             // Debugging the race btw the 2 useEffect to make the data persistance
    const [initialLoad, setInitailLoad] = useState(true)

    //edit incator
      const [editIndicator, setEditIndicator] = useState(null)

    //  Get and load data from local storage
    useEffect(()=>{
        const storedTodos = localStorage.getItem("ReactTodos")
        if(storedTodos){
            setEnteredTodos(JSON.parse(storedTodos))
        }
        setInitailLoad(false)
    },[])

    //   storing to local storage
    useEffect(()=>{
        if(!initialLoad){
            localStorage.setItem("reactTodos", JSON.stringify(enteredTodos))
        }
    },[enteredTodos])

    
    //Handle Submition 
    const todoSubmitter=(e)=>{
        e.preventDefault()
        // putting it in an arry
       if(editIndicator !== null){
        //bringing all the todo in the array and spread it including the one you want to edit and put it in allTodos
        const allTodos = [...enteredTodos]
        //Go into allTodos array and select the todo that has the index number of editIncator and set it  as todo, Since todo is not created when the form is submitted, it is created the moment when onChange event is fired
        allTodos[editIndicator] = todo

        //Resetting the updated allTodos back into the array which is enteredTodos
        setEnteredTodos(allTodos)

        //setting editIncator back to null once the update ic completed 
        setEditIndicator(null)
       }else{
        // The else part is for when the edit indicator is null, set entered todo into the array and we are spreading the array so that the previous entered todo will be updated with the new one
        setEnteredTodos([...enteredTodos, todo])
       }

        // setting todo back to empty string once value has been submitted 
        setTodoValue("")
    }


   // Edit Todo Function
   const editTodo = (index)=>{

    // To edit a value in the array with it's index number
    setTodoValue(enteredTodos[index])

    // when editindicator is not null
    setEditIndicator(index)
   }

   // Delete Todo Function

   const deleteTodo = (index)=>{
     const filteredTodos = enteredTodos.filter((_, ind)=> ind !== index)
     setEnteredTodos(filteredTodos)
    }


    return(
        <div className="form-container">
           <form className="form" onSubmit={todoSubmitter}>
                 <div className="input-group">
                    <label htmlFor="todoItem">Enter A Todo</label>
                    <input 
                    type="text" 
                    name="todoItem" 
                    id="todoItem" 
                    className="input"
                    value={todo || ""}
                    onChange={(e)=>setTodoValue(e.target.value)}
                    />
                 </div>

                 <div className="btn-container">
                    <button type="submit">Add Todo</button>
                 </div>
           </form>

           <div className="display-container">

              {
                enteredTodos.map((items,index)=>(
                   <div key={index} style={{display:"flex", justifyContent:"space-between"}}>

                    <TodoComponent
                    input={items}
                   
                    />

                    <button onClick={(e)=>editTodo(index)}>Edit</button>
                    <button onClick={(e)=>deleteTodo(index)}>Delete</button>

                   </div>

                ))
              }
           </div>
          
        </div>
    )
}