import React, {useState, useEffect} from 'react'

import style from '../styles/registro.module.css'

import axios from 'axios'

// Redirect
import { useHistory as notHistory } from 'react-router-dom'

import ErrorMsg from '../components/error_msg' // Component

const Registro = ({}) => {

    // Initial states
    const [ nome, setNome ] = useState("")
    const [ sobrenome, setSobrenome ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")
    const [ senha2, setSenha2 ] = useState("")


    const [ usuarioCriado, setUsuarioCriado ] = useState(false)

    const [ errorMsg, setErrorMsg ] = useState('')
    const [ error, setError ] = useState(false)

    // Cadastrando o Usuario
    const handleCadastro = async (e) => {
        e.preventDefault()

        if(senha !== senha2){
            setErrorMsg('As senhas nao se correspondem')
            setError(true)
        }

        else{
            // Enviando os dados
            await axios.post('/usuario/registro', {nome, sobrenome, email, senha})

                .then(res => {

                    console.log('Usuario criado')

                    setUsuarioCriado(true)

                }).catch(err => {
                    if(err.response.status === 401){
                        setErrorMsg('Este e-mail já está em uso !')
                        setError(true)
                    }

                    else if(err.response.status === 403){

                        setErrorMsg('Erro interno no servidor ! Tente novamente mais tarde.')
                        setError(true)

                    }
                })
        }
    }

    // function to setError() to false
    const setErrorFalse = () => {
        setError(false)
    }

    // Redirect to home
    let history = notHistory()
    const pushRedirect = () => {
        history.push('/usuario/confirmaremail')
    }
    
    useEffect(() => {
    if(usuarioCriado){
        pushRedirect()
    }

    }, [usuarioCriado])

    return(
        <div className = {style.container}>
            
            <div className = {style.wrapper}>

                {error && (<ErrorMsg msg= {errorMsg} closeFunc = {setErrorFalse}/>)}

                <div className = {style.circle}> </div>

                <form className= {style.formulario} onSubmit={handleCadastro}>

                    <h2 className = {style.title}>Registro</h2>

                    <input className = {style.nome} placeholder= "Nome" name = {nome} value = {nome} onChange = { e => setNome( e.target.value ) }  required/>
                    <br/>
                    <input className = {style.sobrenome} placeholder= "Sobrenome" name = {sobrenome} value = {sobrenome} onChange = { e => setSobrenome( e.target.value ) } required/>
                    <br/>
                    <input className = {style.email} type = "email"  placeholder= "E-mail" name = {email} value = {email} onChange = { e => setEmail( e.target.value ) } required/>
                    <br/>
                    <input className = {style.senha} type = "password" placeholder= "Senha" name = {senha} value = {senha} onChange = { e => setSenha( e.target.value ) } required/>
                    <br/>
                    <input className = {style.senha2} type = "password"  placeholder= "Senha novamente" name = {senha2} value = {senha2} onChange = { e => setSenha2( e.target.value ) } required/>
                    <br/>
                    <button className = {style.loginBtt} type = 'submit' >Criar conta</button>

                    <a href = '/usuario/login' className = {style.facaLogin}> <p>Ja tem uma conta ? Faca o login aqui</p> </a>

                </form>

            </div>
        
        </div>
    )
}

export default Registro


 