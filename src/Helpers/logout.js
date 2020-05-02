// Imports 
import axios from 'axios'

import { useHistory } from 'react-router-dom'


export const logout = async () => {

    await axios.get('/usuario/logout')
    
    .then(() => {

        localStorage.removeItem('JWT')
        
        const history = useHistory()
        history.push('/')
        
    }).catch((err) => {

        console.log(err)

    })


}