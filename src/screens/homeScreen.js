import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/home.scss'

//IMPORTING PATTERNS

import { Card, Footer, Wallet, Work } from '../patterns/'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'

const HomeScreen = () => {

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

    const renderDetailsCard = (
        <>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <p className="title-b-24-txt-pri">Latest deposits</p>
            <p className="txt-reg-14-txt-grad">see more</p>
        </div>
        <Card variant="transaction" />
        </>
    )

    const renderDetails = (
        <div className="details">
            <div>
                <p className="txt-reg-16-txt-pri">Token </p>
                <div>
                    <select></select>
                    <div>
                        <img src={info} alt="info" />
                        <span className="txt-reg-14-txt-pri">1 ETH = $663.37</span>
                    </div>
                </div>
            </div>
            {renderDetailsCard}
        </div>
    )

    const renderHomeScreen = (
        <div className="home">
            {renderInfo}
            <Wallet 
                title="deposit" 
                details="Depositing takes funds from your 
                    wallet and enters them into the privacy 
                    pool. Once there, they can be redeemed 
                    by anyone with the note; a secret that 
                    cannot be linked to the original deposit."
            />
            {renderDetails}
        </div>
    )

    return (
        <>
            {renderHomeScreen}
            <Work />
            <Footer />
        </>
    )
}

export default HomeScreen
