import React, { useState } from "react";
import TodoForm from "./TodoForm";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => (
        <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
        >
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <button
                className="edit-btn"
                onClick={() => setEdit({ id: todo.id, value: todo.text })}
            >
                Edit
            </button>
            <button className="delete-btn" onClick={() => removeTodo(todo.id)}>
                Delete
            </button>
        </div>
    ));
};

export default Todo;
