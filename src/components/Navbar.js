import React, { useState, useEffect } from 'react';

import { MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavbarBrand } from 'mdbreact';


import Avatar from '@material-ui/core/Avatar';
 

const Navbar = ({loggedIn, handleLogout, nome, isLoggeout, reRender}) => {

  const [ navLogged, setNavLogged ] = useState(loggedIn)
  const [ navLoggedout, setNavLoggedout ] = useState(isLoggeout)

  const [collapse, setCollapse] = useState(false)

  const onClick = () =>  {
    
      setCollapse(!collapse)
      
  }

  const logout = async () => {

    await handleLogout()
    
}


  // Watch the localStorage every time loggedIn and Loggout changes 
  useEffect(() => {

    function handleNav(){
      if(localStorage.getItem('JWT')){

        setNavLogged(true)
        setNavLoggedout(false)
      }

      else{

        setNavLogged(false)
        setNavLoggedout(true)

      }
    }

    handleNav()
  }, [loggedIn, isLoggeout, reRender])

  
  return (
    <div >
        <header>
                <MDBNavbar fixed="top" dark expand="md" transparent style={{ boxShadow: "0px 23px 24px -22px rgba(0,0,0,0.82)" }}>
                    <MDBContainer fluid>
                      <MDBNavbarBrand href="/">
                        <strong>Logo</strong>
                      </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={onClick} />

                            {navLogged ? (

                                <MDBCollapse isOpen={collapse} navbar >
                                    <MDBNavbarNav right>
                                        
                                        <MDBNavItem>

                                          <MDBDropdown>

                                              <MDBDropdownToggle nav >
                                                <Avatar variant="circle" style={{backgroundColor: '#2150a8'}}> {nome.charAt(0)} </Avatar>
                                              </MDBDropdownToggle>

                                              

                                            <MDBDropdownMenu className="dropdown-default">

                                              <MDBDropdownItem to = '#'>Perfil </MDBDropdownItem>

                                              <MDBDropdownItem to = '#' onClick={logout} >Logout</MDBDropdownItem>

                                            </MDBDropdownMenu>

                                        </MDBDropdown>
                                      </MDBNavItem>

                                    </MDBNavbarNav>
                                </MDBCollapse>

                                )
                                :
                                navLoggedout ? (
                                    <MDBCollapse isOpen={collapse} navbar>
                                        <MDBNavbarNav left  >
                                            <MDBNavItem >
                                                    <MDBNavLink to = '/' style={collapse ? { backgroundColor:'rgba(62, 100, 173, 0.6)'} : {backgroundColor: 'transparent'}}>Home</MDBNavLink>
                                            </MDBNavItem>
                                            <MDBNavItem >
                                                    <MDBNavLink to = '/' style={collapse ? {backgroundColor: 'rgba(62, 100, 173, 0.8)'} : {backgroundColor: 'transparent'}}>Sobre</MDBNavLink>
                                            </MDBNavItem>
                                            <MDBNavItem >
                                                    <MDBNavLink to = '/' style={collapse ? {backgroundColor: 'rgba(62, 100, 173, 0.6)'} : {backgroundColor: 'transparent'}}>Projetos</MDBNavLink>
                                            </MDBNavItem>
                                        </MDBNavbarNav>

                                        <MDBNavbarNav right className="justify-content-end">
                                            <MDBNavItem >
                                                    <MDBNavLink to = '/usuario/login' style={collapse ? {backgroundColor: 'rgba(62, 100, 173, 0.8)'} : {backgroundColor: 'transparent'}}>Login</MDBNavLink>
                                            </MDBNavItem>
                                            <MDBNavItem >
                                                    <MDBNavLink to = '/usuario/registro' style={collapse ? {backgroundColor: 'rgba(62, 100, 173, 0.6)'} : {backgroundColor: 'transparent'}}>Registro</MDBNavLink>
                                            </MDBNavItem>
                                        </MDBNavbarNav>
                                    </MDBCollapse>
    
                                ):
                                null
                                }
                        
                    </MDBContainer>
                </MDBNavbar>
        </header>
    </div>

  );

}




export default Navbar