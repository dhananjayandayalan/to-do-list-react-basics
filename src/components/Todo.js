import React, { useState } from "react";
import TodoForm from "./TodoForm";
import "./Todo.css";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: "",
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => {
        return (
            <div className="todo-row" key={index}>
                <div key={todo.id} className="todo-text">
                    {todo.text}
                </div>
                <div className="todo-btn">
                    <button
                        className="edit-btn"
                        onClick={() =>
                            setEdit({ id: todo.id, value: todo.text })
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => removeTodo(todo.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    });
};

export default Todo;
