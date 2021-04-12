import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/activity.scss'

//IMPORTING PATTERNS

import { Footer, Wallet } from '../patterns'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'

const ActivityScreen = () => {

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
            variant="activity"
             title="activity"
             details="Activity is used to get info about a every 
                transaction occured in Whirlwind, such as deposits, 
                withdrawals and more."
            />
        </>
    )

    return (
        <>
            {renderScreen}
           <Footer />
        </>
    )
}

export default ActivityScreen

