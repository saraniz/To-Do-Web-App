import axios from "axios";
//the {} brackets mean you are importing named exports from another file.
//When you do NOT use {} during import,JavaScript expects that the file you are importing from has a default export
//A default export means one thing is exported as the main thing from a file.Only one default export allowed per file.
import { ADD_TASK_REQUEST,ADD_TASK_SUCCESS,ADD_TASK_FAILURE, FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAILURE } from "./taskActionType";
import { API_BASE_URL } from "../APIConfig";
import Swal from "sweetalert2";
  

//add task
export const addTasks = (taskData) => {

    console.log("td ",taskData)

    return async (dispatch) => {

        dispatch({type: ADD_TASK_REQUEST})

        try{

            const token = localStorage.getItem("jwt")

            const response = await axios.post(`${API_BASE_URL}/api/task/addtask`,taskData,{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })

            const data = response.data
            console.log("Task d ",data)

             Swal.fire({
                            title: "Success",
                            width: 600,
                            padding: "3em",
                            color: "#716add",
                            background: "bg-[#F3FCF0]",
                            
                          })

            dispatch({
                type: ADD_TASK_SUCCESS,
                payload : response.data,
            })
        } catch(error){

            dispatch({
                type: ADD_TASK_FAILURE,
                payload: error.response?.data?.message || "Add task failed."
            })
        }
    } 
 }

//fetch tasks
export const fetchTasks = () => {

    return async (dispatch) => {

        dispatch({type: FETCH_TASK_REQUEST})

        try{

            const token = localStorage.getItem("jwt")

            const response = await axios.get(`${API_BASE_URL}/api/task/fetchtask`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = response.data
            console.log("Task detail: ",data)

            
            dispatch({
                type: FETCH_TASK_SUCCESS,
                payload: response.data,
            })

        } catch(error){

            Swal.fire({
                title: "Success",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type: FETCH_TASK_FAILURE,
                payload: error.response?.data?.message || "Fetch Task Failed."
                //?. is optional chaining — it prevents the code from throwing an error if any part of the chain is undefined or null.
            })
        }

    }
}


//search tasks
export const searchTasks = (searchQuery) => {

    console.log("SQuery: ",searchQuery)

    return async (dispatch) => {

        dispatch({type: SEARCH_REQUEST})

        try{

            const token = localStorage.getItem("jwt")

            //we access search query in backend using 'term' keyword.that's why we use term: search like this
            const response = await axios.post(`${API_BASE_URL}/api/task/search`,{term: searchQuery},{
                headers :{
                    "Authorization" : `Bearer ${token}`
                }
            })

            const data = response.data
            console.log("Search data: ",data)


            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data,
            })
        } catch(error){

            Swal.fire({
                title: "Error",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type: SEARCH_FAILURE,
                payload: error.response?.data?.message || "Search failed"
            })
        }
    }
}

export const deleteTasks = (taskId) => {

    console.log("Taskid: ",taskId)

    return async (dispatch) => {

        dispatch({type: TASK_DELETE_REQUEST})

        try{

            const token = localStorage.getItem("jwt")
            console.log("DJWT: ",token)

            const response = await axios.delete(`${API_BASE_URL}/api/task/delete/${taskId}`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = response.data
            console.log("DATA: ",data)

            Swal.fire({
                title: "Success",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type: TASK_DELETE_SUCCESS,
                payload: response.data,
            })

        } catch(error){

            Swal.fire({
                title: "Error",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type: TASK_DELETE_FAILURE,
                payload: error.response?.data?.message || "DELETE Failed"
            })
        }


    }
}