// Imports
import React, { useState, useEffect } from 'react'

// Redirect
import { useHistory as notHistory } from 'react-router-dom'

// Style
import style from '../styles/login.module.css' 

// Components
import ErrorMsg from '../components/error_msg' 



const Login = ({ onSubmit, loggedIn, showError, setErrorFalse }) => {

    // Setting the initial state
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")
    
    // Handling the POST 
    const handleSubmit = async (e) => {

        e.preventDefault()

        await onSubmit({
            email,
            senha
        })

    }

    // Redirect to home
    const history = notHistory()
    const pushRedirect = () => {
        history.push('/')
    }

    useEffect(() => {
        if(loggedIn){
            pushRedirect()
        }

    }, [loggedIn])
    

    if(!loggedIn){
        return(
            <div className = {style.container}>
                
                <div className = {style.wrapper}>
                
                {/* Messages  */}
                {showError && ( <ErrorMsg msg = "Este E-mail ou Senha nao estao cadastrados. Tente novamente !" closeFunc={setErrorFalse}/>)}
                    
                    <div className = {style.circle}></div>

                    <form className= {style.formulario} onSubmit={handleSubmit}>
                    
                        <h2 className = {style.title}>Login</h2>

                        <input className = {style.email} placeholder= "E-mail" type = "email" 
                                name = {email}
                                value = {email}
                                onChange = { e => setEmail( e.target.value ) } 
                                required 
                        />

                        <br/>

                        <input className = {style.senha} placeholder= "Senha" type = "password" 
                                name = {senha}
                                value = {senha}
                                onChange = { e => setSenha( e.target.value ) } 
                                required
                        />

                        <br/>

                        <button className = {style.loginBtt} type = 'submit' >Login</button>

                        <a href = '/usuario/registro' className = {style.CrieConta}> <p>Novo aqui ? Crie sua conta</p> </a>

                    </form>

                </div>
            
            </div>
        )
    }

    return null
                
}

export default Login


