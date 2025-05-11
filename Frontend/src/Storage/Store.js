import { thunk } from "redux-thunk";
import { applyMiddleware,combineReducers,legacy_createStore } from "redux";
import { authReducer } from "./Auth/AuthReducer";
import { taskReducer } from "./Task/taskReducer";

//thunk is middleware in redux.it allows making async actions in redux
//combinereducer mean connect all the reducers into one store
//legacy_createStore create redux store

const rootReducer = combineReducers({

    user: authReducer,
    task: taskReducer,

})

//legacy_createStore make the store using rootreducer(combining all the reducers).and apply thunk as a middleware
const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store