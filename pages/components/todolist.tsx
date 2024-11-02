import { useEffect, useState } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            const data = await response.json();
            setTodos(data);
        };

        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim()) {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newTodo }),
            });
            const todo = await response.json();
            setTodos([...todos, todo]);
            setNewTodo('');
        }
    };

    const toggleTodo = async (id: number, completed: boolean) => {
        const response = await fetch('/api/todos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, completed }),
        });
        const updatedTodos = await response.json();
        setTodos(todos.map(todo => (todo.id === id ? updatedTodos : todo)));
    };

    const deleteTodo = async (id: number) => {
        await fetch('/api/todos', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }), // Kirim ID di body, bukan di URL
        });
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
            <ul className="list-group">
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
                                cursor: 'pointer',
                            }}
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                        >
                            {todo.text}
                        </span>
                        <div className="d-flex">
                            <div className="col-auto">
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                            <div className="col-auto">
                                {todo.completed ? (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            toggleTodo(todo.id, !todo.completed)
                                        }
                                    >
                                        Incomplete
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                            toggleTodo(todo.id, !todo.completed)
                                        }
                                    >
                                        Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
