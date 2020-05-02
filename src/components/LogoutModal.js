import React, { useState } from 'react'

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact';


const LogoutModal = ({handleLogout, cancelLogout}) => {

    // Initial States
    const [ modal, setModal ] = useState(true)

    const toggle = () => {
      setModal(!modal)
      cancelLogout()
    }

    const loggedOutToggle = () => {

      toggle()
      handleLogout()

    }


    return (
      <MDBContainer>
      <MDBModal modalStyle="danger" className="text-white" size="md" side position="bottom-right" backdrop={false} isOpen={modal}
        toggle={toggle}>
        <MDBModalHeader className="text-center" titleClass="w-100" tag="p" toggle={toggle}>
          Você tem certeza que deseja sair ?
        </MDBModalHeader>
        <MDBModalBody className="text-center">
          <MDBIcon icon="sign-out-alt" size="4x" className="animated rotateIn" />
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          <MDBBtn color="danger" onClick={loggedOutToggle}>Sim</MDBBtn>
          <MDBBtn color="danger" outline onClick={toggle}>Não</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
      )
}



export default LogoutModal









