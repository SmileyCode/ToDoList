import axios from "axios";
import {GET_ERRORS, GET_TASKS, GET_TASK, DELETE_TASK} from "./types";

export const addTask = (task, history) => async dispatch => {
    try{
        await axios.post("/api/todo", task);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
    
}

export const getBacklog = () => async dispatch => {
    const res = await axios.get("/api/todo/all");
    dispatch({
        type: GET_TASKS,
        payload: res.data
    });
};

export const deleteTask = task_id => async dispatch => {
    if(window.confirm(`Do you really want to delete task ${task_id}? this action can't be undone`)){
        await axios.delete(`/api/todo/${task_id}`);
        dispatch({
            type: DELETE_TASK,
            payload: task_id
        });
    }
};

export const getTask = (task_id, history) => async dispatch => {
    try{
        const res = await axios.get(`/api/todo/${task_id}`);
        dispatch({
            type: GET_TASK,
            payload: res.data
        });
    }
    catch(error){
        history.push("/");
    }
};