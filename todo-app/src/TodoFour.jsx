import React, { useState } from 'react';

function TodoFour() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  const toggleTodo = id => {

    setTodos(todos.map(todo => {

        if(todo.id === id){
            return{
                ...todo,
                completed : !todo.completed
            }

        } else {
            return {
                todo
            }
        }
    }

    //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>📝 Todo List</h2>
      <input
        type="text"
        value={input}
        placeholder="Add a task..."
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>

      <div style={{ margin: '1rem 0' }}>

        <button onClick={() => setFilter('all')}>All</button>{' '}
        <button onClick={() => setFilter('active')}>Active</button>{' '}
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              marginBottom: '0.5rem',
            }}
          >
            {todo.text}
          </li>
        ))}
        {filteredTodos.length === 0 && <p>No todos to show.</p>}
      </ul>
    </div>
  );
}

export default TodoFour;
