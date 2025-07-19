import React, { useState } from 'react';
import json from './data.json';

// Single Node Component
const Node = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div style={{ marginLeft: 20, marginTop: 5 }}>
      <div>
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
            {isExpanded ? '-' : '+'}
          </span>
        )}

        {/* Always show the name */}
        <span>{node.name}</span>
      </div>

      {/* Recursively render children if expanded */}

      {/* only show this children when it's expanded and when their is children in it */}
      {isExpanded && node.children && (
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

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>File / Folder Explorer</h1>
      <List list={data} />
    </div>
  );
};

export default FileExplorer;
