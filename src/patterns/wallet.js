import React from 'react'

//IMPORTING STYLESHEET

import '../styles/patterns/wallet.scss'

//IMPORTING MEDIA ASSETS

import wallet from '../assets/icons/wallet.svg'

const Wallet = (props) => {

    //RENDERING CONTENT

    const renderContent = (
        <div className="block-left">
            <p className="title-b-32-txt-pri">{props.title}</p>
            <p className="txt-reg-16-txt-sec">{props.details}</p>
        </div>
    )

    //RENDERING WALLET DETAILS

    const renderWalllet = (
        <div className="block-right">
            <img src={wallet} alt="wallet" />
            <p className="txt-reg-16-txt-sec" style={{textAlign:'center'}}>
                <span style={{color:'#4FACFE'}}>Connect Wallet</span> &nbsp; 
                to view your balance information.
            </p>
        </div>
    )

    return (
        <div className="wallet">
            {renderContent}
            {props.variant==="activity" ? null :renderWalllet}
        </div>
    )
}

export default Wallet
