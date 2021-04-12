import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/withdraw.scss'

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from '../patterns'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'

const ComplianceScreen = () => {

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
             title="compliance"
             details="Compliance is used to get info about a note, 
                such as its deposit as well as any matching withdrawal."
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

export default ComplianceScreen

