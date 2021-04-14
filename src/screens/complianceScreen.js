import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/withdraw.scss'

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from '../patterns'
import { Button } from '../components'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'
import hint from '../assets/icons/hint.svg'
import uparrow from '../assets/icons/uparrow.svg'

const ComplianceScreen = () => {

    //HANDLING METHODS

    const handleCompliance = () => {
        
    }

    //INLINE STYLES
    
    const inlineStyle={
        flex:{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            width:'100%'
        },
        flexGap:{
            display:'flex',
            alignItems:'center',
            gridGap:10
        }
    }

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
        <div className="block-right">
        <div style={inlineStyle.flex}>
            <p className="title-b-24-txt-pri">Latest deposits</p>
            <p className="txt-reg-14-txt-grad">see more</p>
        </div>
            <div className="transaction-card">
                    <div className="history">
                        <img src={uparrow} alt="uparrow" />
                        <span>0 ETH</span>
                        <span>address</span>
                        <span>2 mins</span>
                    </div>
            </div>
        </div>
    )

    const renderDetails = (
        <div className="details-block">
            <div className="block-left">
                <p style={inlineStyle.flexGap}>
                    <span className="txt-reg-16-txt-pri">Note</span>
                    <img src={info} alt="info" />
                </p>
                <div className="txt-reg-14-txt-pri note">
                whirlwind-bnb-1-56-0x0c5cb0536f9f825f0e14cad9
                c8750a37f1ce89fff5295e404c9c4a54be9d509fff8e4
                73c319a94be0712e40bc340102d70cac089a9141b0125
                56d6c3b5b6iaskh2s515c15z1xc15xcc1s-sds-czx5xc
                52zxc11z-ase
            </div>
            <p style={inlineStyle.flexGap}>
                <span className="txt-reg-16-txt-pri">Recipient</span>
                <img src={info} alt="info" />
            </p>
            <div style={inlineStyle.flexGap}>
                    <img src={hint} alt="hint" />
                    <p style={{width:'90%'}} className="txt-reg-14-txt-sec">
                        <span style={{color:'#4FACFE',fontSize:16}}>Hint:</span>
                        It is recommended you wait a little 
                        between deposit and withdrawal. Give 
                        your deposit some time to mix with 
                        deposits from other users, so that 
                        it won’t be possible to trace your 
                        transaction back to you.
                    </p>
                </div>
                <Button className="btn-primary" onClick={() => handleCompliance()}>
                    Get compliance info
                </Button>
            </div>
            {renderDetailsCard}
        </div>
    )


    const renderScreen = (
        <div className="compliance-screen">
            {renderInfo}
            <Wallet 
             title="compliance"
             details="Compliance is used to get info about a note, 
                such as its deposit as well as any matching withdrawal."
            />
            {renderDetails}
        </div>
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

