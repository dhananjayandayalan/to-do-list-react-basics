import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./TodoList.css";

const retreivedObject = localStorage.getItem("todoDB");
let retrieved = JSON.parse(retreivedObject);
if (retrieved === null) {
    localStorage.setItem("todoDB", JSON.stringify([]));
    retrieved = JSON.parse(localStorage.getItem("todoDB"));
}

const TodoList = (props) => {
    const [todos, setTodos] = useState(retrieved ? retrieved : []);

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        setTodos((prev) => [todo, ...prev]);
        retrieved = [todo, ...todos];
        localStorage.setItem("todoDB", JSON.stringify(retrieved));
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos((prev) =>
            prev.map((item) => item.id === todoId ? newValue : item)
        );

        localStorage.setItem('todoDB', JSON.stringify(retrieved));
    };
    const removeTodo = (id) => {
        const removeArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(() => [...removeArr]);
        retrieved = [...removeArr];
        localStorage.setItem("todoDB", JSON.stringify(retrieved));
    };

    // const completeTodo = (id) => {
    //     let updatedTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             todo.isComplete = !todo.isComplete;
    //         }
    //         return todo;
    //     });

    //     setTodos(updatedTodos);
    // };

    return (
        <div className="container">
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                // completeTodos={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
};

export default TodoList;
