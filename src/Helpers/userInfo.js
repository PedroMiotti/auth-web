// Imports
import axios from 'axios' // API requests

import jwtDecode from 'jwt-decode' // Decode the JWT Token


export async function getUserInfo (){

    // Getting the token from the localStorage
    const token = localStorage.getItem('JWT')

    if(token){

        const infoEmail = jwtDecode(token)

        return await axios.get('/usuario/info', {
            params: {email: infoEmail.email},
            headers: { Authorization: `JWT ${token}`}
            
        }).then((res) => {

            return res.data

            
        }).catch((err) => {

            // It returns if the token is expired
            return err.response.status
            

        })
        
    }

    
}


