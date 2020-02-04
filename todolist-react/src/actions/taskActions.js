import axios from "axios";
import {GET_ERRORS, GET_TASKS, DELETE_TASK} from "./types";

export const addTask = (task, history) => async dispatch => {
    try{
        await axios.post("http://localhost:8080/api/todo", task);
        history.push("/");
        dispatch({
            type:GET_ERRORS,
            payload: {}
        })
    }
    catch (error){
        dispatch({
            type:GET_ERRORS,
            payload: error.response.data
        })
    }
    
}

export const getBacklog = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/todo/all")
    dispatch({
        type: GET_TASKS,
        payload: res.data
    })
}

export const deleteTask = task_id => async dispatch => {
    if(window.confirm(`Do you really want to delete task ${task_id}? this action can't be undone`)){
        await axios.delete(`http://localhost:8080/api/todo/${task_id}`);
        dispatch({
            type: DELETE_TASK,
            payload: task_id
        })
    }
}