import axios from 'axios';

export const userRegister = (data) => {
     return async (dispatch) => {

          const config = {
               headers: {
                    'Content-Type':'application/json'
               }
          }
          try{
               
               console.log("Reach");
               const response = await axios.post('/api/messenger/user-register',data,config);
               console.log(response.data);

          } catch(error){
               console.log('1->' , error.response.data);
          }

     }
}