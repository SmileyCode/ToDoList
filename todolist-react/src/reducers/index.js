import {combineReducers} from "redux"
import errorsReducer from "./errorsReducer"
import taskReducer from "./taskReducer"
import securityReducer from "./securityReducer"

export default combineReducers ({
    errors: errorsReducer,
    task: taskReducer,
    security: securityReducer
})