import axios from 'axios';
import {REGISTER_FAIL} from "../types/authType";

export const userRegister = (data) => {
     return async (dispatch) => {

          // const config = {
          //      headers: {
          //           'Content-Type':'application/json'
          //      }
          // }

          try{
               console.log("data-> ",data);
               const response = await axios.post('/api/messenger/user-register',data);
               console.log(response.data);

          } catch(error){
               // console.log('errorAuth-> ',error)
               dispatch({
                    type: REGISTER_FAIL,
                    payload:{
                         error : error.response.data.error.errorMessage 
                    }
                })
          }
     }
}