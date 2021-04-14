import React, { useState } from 'react'

//IMPORTING STYLESHEET

import '../styles/patterns/header.scss'

//IMPORTING COMPONENTS

import { Button, Link } from '../components'

import {Sidebar} from './'

//IMPORTING MEDIA ASSETS

import deposit from '../assets/icons/deposit.svg'
import withdraw from '../assets/icons/withdraw.svg'
import compliance from '../assets/icons/compliance.svg'
import activity from '../assets/icons/activity.svg'
import menu from '../assets/icons/menu.svg'
import logo from '../assets/logo/logo.png'
// import avatar from '../assets/images/avatar.svg'

const Header = () => {
    
    const [isSidebar,setIsSidebar] = useState(false)

    //HANDLING METHODS

    const connect = () => {
        console.log("connect")
    }

    //RENDERING LOGO

    const renderLogo = (
       <div className="logo">
            <img src={logo} alt="logo" width={'100%'} />
       </div>
    )

     //RENDERING LINKS

    const renderLinks=(
        <>
            <nav>
                <Link to="/" className="link" activeClassName="active">
                    <img src={deposit} alt="deposit-icon" />
                   <span>Deposit</span>
                </Link>
                <Link to="/withdraw"  className="link" activeClassName="active">
                    <img src={withdraw} alt="withdraw-icon" />
                   <span>Withdraw</span>
                </Link>
                <Link to="/compliance"  className="link" activeClassName="active">
                    <img src={compliance} alt="compliance-icon" />
                   <span>Compliance</span>
                </Link>
                <Link to="/activity"  className="link" activeClassName="active">
                    <img src={activity} alt="activity-icon" />
                   <span>Activity</span>
                </Link>
            </nav>
        </>
    )

     //RENDERING NAVBAR

    const renderNavbar = (
        <div className="navbar">
            {renderLinks}
            <Button 
                className="btn-primary"
                onClick={ () => connect() }
            >
                Connect wallet
            </Button>
            {/* IF USER CONNECTED */}
            {/* <img src={avatar} alt="avatar" className="avatar" /> */}
            <img 
                src={menu} 
                alt="menu" 
                className="menu cursor" 
                onClick={() => setIsSidebar(!isSidebar)} 
            />
        </div>
    )

    return (
        <>
        <div className="header">
            {renderLogo}
            {renderNavbar}
        </div>
        <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
        </>
    )
}

export default Header
