import {combineReducers} from "redux"
import errorsReducer from "./errorsReducer"
import taskReducer from "./taskReducer"

export default combineReducers ({
    errors: errorsReducer,
    task: taskReducer
})