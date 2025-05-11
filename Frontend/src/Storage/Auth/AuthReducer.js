import { REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE,LOGIN_REQUEST,LOGIN_FAILURE,LOGIN_SUCCESS,FETCH_REQUEST,FETCH_SUCCESS,FETCH_FAILURE, UPDATE_SUCCESS, UPDATE_FAILURE, COVER_IMAGE_UPDATE_REQUEST, COVER_IMAGE_UPDATE_SUCCESS, COVER_IMAGE_UPDATE_FAILURE, LOGOUT } from "./AuthActionType";

//initial state
const initialState = {
    loading: false,  //in start request is not start.that's why it's false
    user: null,      //store the users[registered or logged]
    error: " ",     //store any error message
}

export const authReducer = (state=initialState, action) =>{

    switch(action.type){

        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case FETCH_REQUEST:
        case UPDATE_SUCCESS:
        case COVER_IMAGE_UPDATE_REQUEST:
            return{
                ...state, //in redux we don't change the state of the object directly.instead we copy old object state into new state.[.../spread operator copy all part of the previous object state]
                loading: true,
                error: '',
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case FETCH_SUCCESS:
        case UPDATE_SUCCESS:
        case COVER_IMAGE_UPDATE_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload,
                error: '',
            }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case FETCH_FAILURE:
        case UPDATE_FAILURE:
        case COVER_IMAGE_UPDATE_FAILURE:
            return{
                ...state,
                loading: false,       //loading false bcz process is done
                user: null,           //user clear bcz register or login failed
                error: action.payload,
            }

        case LOGOUT:
            return{
                ...state,
                loading: false,
                user: null,
                
            }

        default:
            return state
    }
}