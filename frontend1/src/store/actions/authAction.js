import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL} from "../types/authType";

export const userRegister = (data) => {
     return async (dispath) => {

          // const config = {
          //      headers: {
          //           'Content-Type':'application/json'
          //      }
          // }

          try{
               console.log("data-> ",data);
               const response = await axios.post('/api/messenger/user-register',data);
               // console.log(response.data);
               localStorage.setItem('authToken',response.data.token);

               dispath({
                    type : REGISTER_SUCCESS,
                    payload:{
                         successMessage: response.data.successMessage,
                         token : response.data.token
                    }
               })

          } catch(error){
               // console.log('errorAuth-> ',error)
               dispath({
                    type: REGISTER_FAIL,
                    payload:{
                         error : error.response.data.error.errorMessage 
                    }
                })
          }
     }
}


export const userLogin = (data) => {
     return async (dispath) => {
          try {
               const response = await axios.post('/api/messenger/user-login', data);
               localStorage.setItem('authToken', response.data.token);
               dispath({
                   type: USER_LOGIN_SUCCESS,
                   payload: {
                       successMessage: response.data.successMessage,
                       token: response.data.token
                   }
               })
           } catch (error) {
               dispath({
                   type: USER_LOGIN_FAIL,
                   payload: {
                       error: error.response.data.error.errorMessage
                   }
               })
           }
     }
}