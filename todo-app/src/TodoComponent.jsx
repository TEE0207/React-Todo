export default function TodoComponent({input}){
   

    const todoItemContainer = {
        backgroundColor : "white", 
        padding : "1rem",
        display : "flex",
        flexDirection : "column",
        rowGap : "0.75rem"
    }

    const theText ={
        fontSize: "1.1rem",
        backgroundColor: "#d7d7d7"
    }

    return(
        <div style={todoItemContainer}>
             <h1 style={theText}>{input}</h1>
        </div>
       
    )
}