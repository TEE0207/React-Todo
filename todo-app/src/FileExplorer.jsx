import React, { useState } from 'react';
import json from './data.json';
import { FaFolderPlus } from "react-icons/fa";


// Single Node Component
const Node = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState({ });

  const handleToggle = () => {
    setIsExpanded((prev) => ({
        ...prev,
        [node.name] : !prev[node.name]
    }));
  };

  return (
    <div style={{ marginLeft: 20, marginTop: 5 }}>

      <div style={{display : "flex", flexDirection: "row" , alignItems: "center"}}>

        {/* Only show toggle button if it's a folder */}
        {node.isFolder && (
          <span
            onClick={handleToggle}
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              marginRight: 8,
              color: '#007bff',
            }}
          >
            {isExpanded?.[node.name] ? '-' : '+'}
          </span>
          
        )}

        {/* Always show the name */}
        <span>{node.name}</span>
        {
          node.isFolder && (
             <span style={{marginLeft : "0.5rem"}} onClick={()=> addNodeToList(node.id)}>
           <FaFolderPlus />
        </span>
          )
        }
       
      </div>

      {/* Recursively render children if expanded */}

      {/* only show this children when it's expanded and when their is children in it */}

      {isExpanded?.[node.name] && node ?.children && (
        <div style={{ marginTop: 5 }}>
          <List list={node.children} />
        </div>
      )}
    </div>
  );
};

// Recursive List Component
const List = ({ list }) => {
  return (
    <div className="container">
      {list.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};

// Main Component
const FileExplorer = () => {
  const [data, setData] = useState(json);

  const addNodeToList = (ParentId) =>{

    const name = prompt("Enter Name")

    const updateTree = (list) => {

        return list.map(node => {
            if(node.id === ParentId){
                return {
                    ...node,
                    children : [...node.children, {id : "123", name :name, isFolder : true , children : []}]
                }
            }

            if(node.children){
                return{
                    ...node,
                    children : updateTree()
                }
            }
        })



    } ;

    setData((prev) => updateTree(prev))
  }



  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>File / Folder Explorer</h1>
      <List list={data} />
    </div>
  );
};

export default FileExplorer;
