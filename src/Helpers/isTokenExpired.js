// Imports
import { getUserInfo } from './userInfo'


export const isTokenExpired = () => {

    getUserInfo().then(res => {
        if(res === 401){

            return true
            
        }
        else{
            return false
        }
    })


}






