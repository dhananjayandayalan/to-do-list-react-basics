import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

const App = () => {
    return (
        <React.Fragment>
            <header className="title-header">
                <h1>To Do List</h1>
            </header>
            <TodoList />
        </React.Fragment>
    );
};

export default App;
