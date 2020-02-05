import {GET_TASKS, GET_TASK, DELETE_TASK} from "../actions/types";

const initalState = {
    tasks: [],
    task: {}
}
export default function(state=initalState, action){
    switch(action.type){
        case GET_TASKS:
            return{
                ...state,
                tasks: action.payload
            };

        case GET_TASK:
            return{
                ...state,
                task: action.payload
            };

        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        default:
            return state;
    }
}