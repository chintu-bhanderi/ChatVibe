import axios from 'axios';

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
               console.log(error.response.data);
          }

     }
}