import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/errorpage.scss'

//IMPORTING MEDIA ASSETS

import notfound from '../assets/images/notfound.svg'
import { Link } from '../components'

const ErrorScreen = () => {

    //RNDERING CONTENT

    const renderErrorContent = (
        <div>
            <p className="title-b-32-txt-pri">Page not found</p>
            <p  className="txt-reg-16-txt-sec">
                Oops! We can’t seem to find the 
                page you are probably looking for. 
                Try goining to the previous page 
            </p>
            <Link  className="txt-reg-16-txt-pri error-btn">Go to previous page</Link>
        </div>
    )

    //RENDERING IMAGE

    const renderErrorImage= (
        <div className="error-image">
            <img src={notfound} alt="404 not found" />
        </div>
    )

    return (
        <div className="error-screen">
            {renderErrorContent}
            {renderErrorImage}
        </div>
    )
}

//EXPORTING SCREENS

export default ErrorScreen
