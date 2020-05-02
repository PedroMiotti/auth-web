// IMPORTS
import React from 'react'

// Style
import style from '../styles/confirmEmail.module.css'

import path from 'path'


const ConfirmEmail = () => {

    const imgPath = path.join(__dirname, '../resources/img/email.png')

    return(
        <div className={style.container}>
            <div className={style.wrapper}>
                <img src={imgPath} alt="email" />
                <h1>Confirmacao de email</h1>
                <p>Nos te enviamos um email para 'email aqui' para confirmar a 
                    veracidade do seu endereco de email</p>

            </div>
        </div>
    )
}

export default ConfirmEmail
