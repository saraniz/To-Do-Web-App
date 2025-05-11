import { ADD_TASK_REQUEST,ADD_TASK_SUCCESS,ADD_TASK_FAILURE, FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, TASK_DELETE_REQUEST, TASK_DELETE_FAILURE, TASK_DELETE_SUCCESS } from "./taskActionType";

const initialState = {
    loading: false,
    task: [], //store multiple tasks
    searchtask: [],
    error:" ",
}

export const taskReducer = (state = initialState, action) =>{

    switch(action.type){

        case ADD_TASK_REQUEST:
        case FETCH_TASK_REQUEST:
        case SEARCH_REQUEST:
        case TASK_DELETE_REQUEST:
            return{
                ...state,
                loading: true,
                error:'',
            }

        case ADD_TASK_SUCCESS:
        case FETCH_TASK_SUCCESS:
            return{
                ...state,
                loading: false,
                task: [...state.task,action.payload],  //...state.task copy all the tasks then add new task and create new state
                error:'',
            }

        case SEARCH_SUCCESS:
            return{
                ...state,
                loading: false,
                searchtask: [action.payload],
                error: '',
            }

        //in here we want to delete task. in here ...state.task refers all the tasks store currently in redux store 
        //.filter((t) => ) this method is javascript array method that returns new array containing only the elements for which function is true.
        case TASK_DELETE_SUCCESS:
            return{
                ...state,
                loading: false,
                task: [...state.task.filter((t) => t._id != action.payload)],
                error: '',
            }

        case ADD_TASK_FAILURE:
        case FETCH_TASK_FAILURE:
        case SEARCH_FAILURE:
        case TASK_DELETE_FAILURE:
            return{
                ...state,
                loading: false,
                task: null,
                error: action.payload,
            }

        default:
            return state
    }
}