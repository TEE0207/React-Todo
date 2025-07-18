import React, { useState } from 'react'
import json from "./data.json"



// render list of object
const List = ({list}) =>{

    return(
    <div className='container'>
     {
        list.map(node => (
            <div key = {node.id}>
                <span>{node.name}</span>

                {/* Recursion  */}
                
                {node.children && <List list = {node.children}/>}
                
            </div>
        ))
     }

    </div>
    )
}


const FileExplorer = () => {

    const  [data , setData] = useState([json])
  return (

    <div className='App'>
        <h1>File / Folder Explorer</h1>
        <List list = {data} />

        
        

    </div>
  )
}

export default FileExplorer