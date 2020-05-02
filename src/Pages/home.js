// Imports
import React, { useState, useEffect } from 'react'

// Style
import style from '../styles/home.module.css'

// Components
import SuccessMsg from '../components/success_msg' 

  
function Home({loggedIn, nome, handleLogout, isLoggeout, reRender}) {

    // Setting initial states
    const [ HomeLogged, setHomeLogged ] = useState(false)
    const [ HomeLoggedout, setHomeLoggedout ] = useState(true)


 
    const logout = async () => {

        await handleLogout()

    }
    

    useEffect(() => {
        function handleLogged(){
            if(localStorage.getItem('JWT')){
                setHomeLogged(true)
                setHomeLoggedout(false)
            }
            else{
                setHomeLogged(false)
                setHomeLoggedout(true)
            }
          }

        handleLogged()
    
      }, [loggedIn, isLoggeout, reRender])

   


    return(
               
        <div className = {style.container}>

            {loggedIn && (<SuccessMsg msg = {`Bem vindo ${nome} !`} />)}

            {HomeLogged ? (
                            <div className = {style.textContainer}>
                                <h1>{`Olá ${nome}, `}</h1>
                                <h3>{`Bem vindo a pagina principal !`}</h3>
                                <button  onClick={logout} className={style.bttReg}>Logout</button>
                            </div>)
                            : 
            HomeLoggedout ? (
                            <div className = {style.textContainer}>
                                
                                <h1>BEM VINDO !</h1>
                                
                                <h2>Ainda não tem uma conta aqui ? Sem problemas, registre-se aqui</h2>

                                <a href="/usuario/registro" className={style.bttReg}>Registrar</a>

                            </div>
                            ):
                            null
                            }

            
        
        </div>
    )
}


export default Home