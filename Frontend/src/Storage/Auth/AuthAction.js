import axios from "axios";
import { REGISTER_SUCCESS,REGISTER_REQUEST,REGISTER_FAILURE,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE, FETCH_SUCCESS, FETCH_FAILURE, UPDATE_REQUEST, FETCH_REQUEST, UPDATE_SUCCESS, COVER_IMAGE_UPDATE_REQUEST, COVER_IMAGE_UPDATE_SUCCESS, COVER_IMAGE_UPDATE_FAILURE, LOGOUT } from "./AuthActionType";
import { API_BASE_URL } from "../APIConfig";
import Swal from 'sweetalert2'


//register user
export const registerUser = (registerData,navigate) =>{

    return async (dispatch) =>{

        //dispatch like sending action to the redux store.in here it request action to set loading = true
        dispatch({type:REGISTER_REQUEST})
        // console.log("SD: ",registerData)

        try{

            const response = await axios.post(`${API_BASE_URL}/api/user/register`,registerData)

            const data = response.data
            console.log("REGD: ",data)
        

            //if backend send jwt token with response data it should store 
            if(data.token){
                localStorage.setItem("jwt",data.token)
            }

            Swal.fire({
                title: "Success",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              }).then(()=>{
                navigate("/settings")
              })
              

            dispatch({
                type:REGISTER_SUCCESS,
                payload: response.data
            })

        } catch (error) {

            Swal.fire({
                title: "Error",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type:REGISTER_FAILURE,
                payload:error.response?.data?.message || 'Register failed',
            })

        }
    }
}

//user login
export const userLogin = (loginData,navigate) => {

    return async (dispatch) => {

        //send login request action to set loading == true
        dispatch({type: LOGIN_REQUEST})
        console.log("sd ",loginData)

        try{

            const response = await axios.post(`${API_BASE_URL}/api/user/login`,loginData)

            const data = response.data

            if(data.token){
                console.log("JWT Token Received:", data.token);
                localStorage.setItem("jwt",data.token) //store the token as "jwt"
            }

            Swal.fire({
                title: "Success",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "bg-[#F3FCF0]",
                
              }).then(()=>{
                navigate("/dashboard")
              })

            dispatch({
                type: LOGIN_SUCCESS,
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
                type: LOGIN_FAILURE,
                payload: error.response?.data?.message || "Login Failed",
            })
        }
    }

    
}




//fetch user details
export const fetchUserDetails = () =>{

    return async (dispatch) =>{

        dispatch({type: FETCH_REQUEST})

        try{

            const token = localStorage.getItem("jwt")

            const response = await axios.get(`${API_BASE_URL}/api/user/fetchdetail`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })  

            const data = response.data
            console.log("UD: ",data)
 
            dispatch({
                type: FETCH_SUCCESS,
                payload: response.data
            })


        } catch(error){
            
            
            dispatch({
                type: FETCH_FAILURE,
                payload: error.response?.data?.message || "Fetch failed"
            })
        }
    }
}

//update user detail
export const updateDetails = (formData) =>{

    return async (dispatch) => {

        dispatch({type: UPDATE_REQUEST})

        try{

            const token = localStorage.getItem("jwt")

            console.log("form ",formData)
            const response = await axios.put(`${API_BASE_URL}/api/user/update`,formData,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })

            const data = response.data
            console.log("Upd: ",data)

            Swal.fire({
                title: "Success",
                width: 500,
                padding: "3em",
                color: "bg-[#F3FCF0]",
                background: "bg-[#F3FCF0]",
                
              })

            dispatch({
                type:UPDATE_SUCCESS,
                payload: response.data
            })

    
            
        } catch(error){

            dispatch({
                type:FETCH_FAILURE,
                payload: error.response?.data?.message || "Update failed."
            })
        }

    }
}

export const uploadCoverImage = (imageFile) => {
    return async (dispatch) => {
      dispatch({ type: COVER_IMAGE_UPDATE_REQUEST });
  
      try {
        const token = localStorage.getItem("jwt");
  
        // Prepare FormData
        const formData = new FormData();
        formData.append("coverImage", imageFile);
  
        const response = await axios.put(
          `${API_BASE_URL}/api/user/coverimage`,
          formData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // very important!
            },
          }
        );
  
        const data = response.data;
        console.log("COVER IMG URL: ", data);
  
        Swal.fire({
          title: "Success",
          width: 500,
          padding: "3em",
          color: "#716add",
          background: "bg-[#F3FCF0]",
        }
    );
  
        dispatch({
          type: COVER_IMAGE_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          width: 500,
          padding: "3em",
          color: "#716add",
          background: "bg-[#F3FCF0]",
        });
  
        dispatch({
          type: COVER_IMAGE_UPDATE_FAILURE,
          payload: error.response?.data?.message || "Image upload failed",
        });
      }
    };
  };
  

  //logout
  export const logout = () => {

    return async (dispatch) => {
        
        localStorage.removeItem("jwt")

    dispatch({type: LOGOUT})

    }
    
  }