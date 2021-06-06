import React, { useState } from "react";
import "./ToDo.css";

const ListContent = props => {
    return (
        <React.Fragment>
            <div>
                <h3>{props.taskName}</h3>
            </div>
            <div>
                <code>{props.date}</code>
            </div>
            <div>
                <button onClick={props.onEdit}>Edit</button>
            </div>
            <div>
                <button onClick={props.onDelete}>Delete</button>
            </div>
        </React.Fragment>
    );
};

const List = props => {
    return (
        <React.Fragment>
            {props.tasks.length !== 0 ? (
                props.tasks.map(task => (
                    <ListContent
                        taskName={task.task}
                        date={task.date}
                        key={task.id} 
                        onEdit={() => props.onEdit(task.id, task.task)} 
                        onDelete={() => props.onDelete(task.id)}
                    />
                ))) : 
                (<p>No Tasks</p>)}
            {<p>Pending Task: {props.tasks.length}</p>}
        </React.Fragment>
    );
};

const TodoInput = props => {
    const [enteredTask, setEnteredTask] = useState("");

    const taskHandler = (event) => {
        let text = event.target.value;
        setEnteredTask(text);
        // console.log(enteredTask);
    };



    const submitHandler = event => {
        event.preventDefault();
        if (enteredTask.length !== 0 && enteredTask.trim().length !== 0) {
            const taskData = {
                id: parseInt(Math.random() * 100000),
                task: enteredTask.trim(),
                date: new Date().toLocaleDateString(),
            };
            props.onAddData(taskData);
            setEnteredTask("");
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Enter the Task"
                    onChange={taskHandler}
                    value={enteredTask}
                />
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
};

const ToDo = props => {
    const [tasks, setTasks] = useState([]);

    const addDataHandler = task => {
        if (tasks.length === 0) {
            setTasks([task]);
        } else {
            setTasks((prevTask) => [task, ...prevTask]);
        }
        console.log(task);
    };

    const editDataHandler = (key, data) => {
        setTasks(data);
        deleteHandler(key);
    };

    const editHandler = (key, data) => {
        editDataHandler(key, data);
    };

    const deleteHandler = (key) => {
        const filteredData = tasks.filter((task) => key !== task.id);
        setTasks([...filteredData]);

    };

    return (
        <React.Fragment>
            <div>
                <TodoInput onAddData={addDataHandler} onEditData={(data) => editDataHandler(data)}/>
            </div>
            <div>
                <List tasks={tasks} onEdit={(key, data) => editHandler(key, data)} onDelete={(key) => deleteHandler(key)} />
            </div>
        </React.Fragment>
    );
};

export default ToDo;
