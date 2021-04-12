import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/withdraw.scss'

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from '../patterns'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'

const WithdrawScreen = () => {

    const renderInfo = (
        <div 
            style={{
                display:'flex',
                alignItems:'center',
                gridGap:16
                ,marginBottom:'2em'
            }}
        >
            <img src={info} alt="info" />
            <p className="txt-reg-14-txt-grad">
                This is an experimental software. 
                Use it at your own risk.
            </p>
        </div>
    
    )

    const renderScreen = (
        <>
            {renderInfo}
            <Wallet 
             title="Withdraw"
             details="Withdrawing takes tokens from your 
                privacy pool and enters them into the 
                metamask wallet. Once there, they can be 
                redeemed by you to deposit funds into 
                your privacy pool."
            />
        </>
    )

    return (
        <>
            {renderScreen}
           <Work />
           <Footer />
        </>
    )
}

export default WithdrawScreen
