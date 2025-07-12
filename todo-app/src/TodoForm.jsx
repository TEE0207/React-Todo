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
        // if storedTodos is not empty parse it and setEnteredTodos to it
        if(storedTodos){
            setEnteredTodos(JSON.parse(storedTodos))
        }
        // This useEffect will run first then which will get what is in the localStorage first before then setInitailLoad to false and when it's false, the setItem localStorage will run
        setInitailLoad(false)
    },[])

    //   storing to local storage
    // Based on React principle there's a race effect on this 2 useEffect based on who should run first when the component mount, so it's going to run based on which one is depending on one, so the important one would run first, and when it run it set enteredTodo to an empty array because that what we set enteredTodo to in the state because component run from top to down. So when a user enter a todo and the user refresh the page, the enteredTodo will be back to an empty array. So we need to make sure that whenever a user refresh the page the previous enteredTodo is gotten first b4 we set the new enteredTodos in the localStorage
    // so here we set a condition to make is not run first when when the component mount.
    useEffect(()=>{
        if(!initialLoad){
            localStorage.setItem("reactTodos", JSON.stringify(enteredTodos))
        }
    },[enteredTodos])

    
    //Handle Submition 
    const todoSubmitter=(e)=>{
        e.preventDefault()
        // putting it in an arry
        // if edit indicator is not null i.e get the index number of that particular todo you want to edit
       if(editIndicator !== null){
        //bringing all the todo in the array and spread it including the one you want to edit and put it in allTodos
        const allTodos = [...enteredTodos]
        //Go into allTodos array and select the todo that has the index number of editIncator and set it  as todo, Since todo is not created when the form is submitted, it is created the moment when onChange event is fired
        // from all the allTodos bring the one of the editIndicator (editIndicator is set to index in the edit function) and let be equal to todo i.e let the value that have editIndicator index number in the allTodos Array be in the input field which is todo. todo will now update the existing value to the new value in the allTodos Array
        allTodos[editIndicator] = todo
   
        
        //Resetting the updated allTodos Array back into enteredTodos Array
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

    // To edit a particular todo in the array, we need to bring all the array where enteredTodos is stored and retrive the particular index number of that todo that you want to edit, then setTodoValue to it so that it can be in the input field.
    //
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
{/*  always put your function calling in a call back to aviod re-rendering issues  */}
                    <button onClick={(e)=>editTodo(index)}>Edit</button>
                    <button onClick={(e)=>deleteTodo(index)}>Delete</button>

                   </div>

                ))
              }
           </div>
          
        </div>
    )
}