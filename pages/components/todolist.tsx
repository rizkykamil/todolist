import { useState } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([
                ...todos,
                { id: Date.now(), text: newTodo, completed: false },
            ]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="container my-4">
            <h1 className="text-center">To-Do List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tambah ToDo Baru"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTodo}>
                    Tambah
                </button>
            </div>
            <ul className="list-group container px-5">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            todo.completed ? 'list-group-item-success' : ''
                        }`}
                    >
                        <span
                            style={{
                                textDecoration: todo.completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.text}
                        </span>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            hapus
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
