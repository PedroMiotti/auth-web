// Imports
import React, { useState, useEffect } from 'react';

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// API connect
import axios from 'axios'

// Helpers
import { getUserInfo } from '../Helpers/userInfo'
import { logout } from '../Helpers/logout'

// Pages
import Home from '../Pages/home'
import Login from '../Pages/login'
import Registro from '../Pages/registro'
import ConfirmEmail from '../Pages/ConfirmEmail'

// Components
import NavbarComp from '../components/Navbar'
import LogoutModal from '../components/LogoutModal';


const Rotas = () => {

  // Initial states
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ showError, setShowError ] = useState(false)
  const [ logoutState, setLogoutState ] = useState(loggedIn ? false : true)
  const [ showModalLogout, setShowModalLogout] = useState(false)
  const [ rerender, setRerender ] = useState(false)

  // Informacao do usuario
  const [ userNome , setUserNome ] = useState('')
  const [ userSobrenome , setUserSobrenome ] = useState('')
  const [ userEmail , setUserEmail ] = useState('')


  // Handling the POST 
  const handleAuth = async (dataForm) => {

      // Sending the response with the email and senha on the body from the LoginForm
      await axios.post('/usuario/login', dataForm).then(res => {

          localStorage.setItem('JWT', res.data.token) // Setting the token on the localStorage
      
          setLoggedIn(true)
          setShowError(false)
          setRerender(true)
          
      }).catch(err => {
          if(err.response.data.message === 'Esta conta nao existe !' || err.response.data.message === 'Senha incorreta !'){

              setShowError(true)
            
          }

      })

  }

  // Funcao para setar showError() para false 
  const setShowErrorFalse = () => {

    setShowError(false)

  }

  // Funcao para quando o usurio clicar no botao de logout
  const setLogoutTrue = () => {

    setShowModalLogout(true)

  }

  // Funcao para quando o usuario clicar para cancelar o Logout
  const cancelLogout = () => {

    setShowModalLogout(false)

  } 

  // Funcao para fazer o Logout
  const handleLogout = async () => {

    await logout().then(() => {

      setLoggedIn(false)
      setLogoutState(true)
      setRerender(true)

    }).catch((err) => {

      console.log(err)

    })

  }

  // Getting the user information from the userInfo helper
  useEffect(() => {
    function handleLogged(){
      if(localStorage.getItem('JWT')){
        
        getUserInfo().then((data) => {

          setUserNome(data.nome)
          setUserSobrenome(data.sobrenome)
          setUserEmail(data.email)


        }).catch((err) => {

          console.log(err)

        })
        
      }
   }

   handleLogged()

  }, [loggedIn])

 
    return(

        <Router>

          <NavbarComp loggedIn={loggedIn} handleLogout ={setLogoutTrue} nome={userNome} isLoggeout={logoutState} reRender={rerender}/> 

          {showModalLogout && (<LogoutModal handleLogout={handleLogout} cancelLogout={cancelLogout}/>)}


          <Switch>

            {/* Home*/}
            <Route exact  path = '/' > 
              <Home loggedIn={loggedIn} nome={userNome} handleLogout ={setLogoutTrue} isLoggeout={logoutState} reRender={rerender}/> 
            </Route>
               

            {/* Login  */}
            <Route exact path = '/usuario/login' >
              <Login onSubmit={handleAuth} loggedIn={loggedIn} showError={showError} setErrorFalse={setShowErrorFalse}/>
            </Route>


            {/* Registro  */}
            <Route exact path = '/usuario/registro'>
              <Registro/>
              
            </Route>

            {/* Confirmar E-mail  */}
            <Route exact path = '/usuario/confirmaremail'>
              <ConfirmEmail/>
            </Route>
            
               
          </Switch>
          
        </Router>

    )
}

export default Rotas