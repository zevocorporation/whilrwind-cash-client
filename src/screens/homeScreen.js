import React from 'react'

//IMPORTING STYLESHEET

import '../styles/screens/home.scss'

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from '../patterns/'
import { Button } from '../components'

//IMPORTING MEDIA ASSETS

import info from '../assets/icons/info.svg'
import hint from '../assets/icons/hint.svg'
import downarrow from '../assets/icons/downarrow.svg'

import ConnectWallet, {checkNetwork} from '../patterns/modals/connectWallet'

const HomeScreen = () => {

    //HANDLING METHODS

    const handleDeposit = () => {

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

    //RENDER INFO

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

    //RENDER DETAILS CARD

    const renderDetailsCard = (
        <div className="block-right">
            <div className="block-header">
                <p className="title-b-24-txt-pri">Latest deposits</p>
                <p className="txt-reg-14-txt-grad">see more</p>
            </div>
            <div className="transaction-card">
                    <div className="history">
                        <img src={downarrow} alt="downarrow" />
                        <span>0 ETH</span>
                        <span>address</span>
                        <span>2 mins ago</span>
                    </div>
                    <div className="history">
                        <img src={downarrow} alt="downarrow" />
                        <span>0 ETH</span>
                        <span>address</span>
                        <span>2 mins ago</span>
                    </div>
            </div>
        </div>
    )

    //RENDER DETAILS

    const renderDetails = (
        <div className="details">
            <div className="block-left">
                <p className="txt-reg-16-txt-pri">Token </p>
                <div style={inlineStyle.flex} className="select-input">
                    <select>
                        <option>ETH - Ethereum</option>
                    </select>
                    <div style={inlineStyle.flexGap}>
                        <img src={info} alt="info" />
                        <span 
                            className="txt-reg-14-txt-pri" 
                            style={{whiteSpace:'nowrap'}}
                        >
                            1 ETH = $663.37
                        </span>
                    </div>
                </div>
                <p style={inlineStyle.flexGap}>
                    <span className="txt-reg-16-txt-pri">Amount</span> 
                    <img src={info} alt="info" width={18} />
                </p>
                <div className="amount-block">
                    <span>0.1 ETH</span>
                    <span>0.1 ETH</span>
                    <span>0.1 ETH</span>
                    <span>0.1 ETH</span>
                    <span>0.1 ETH</span>
                    <span>0.1 ETH</span>
                </div>
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
                <Button className="btn-primary" onClick={() => handleDeposit()}>
                    Connect wallet to deposit
                </Button>
            </div>
            {renderDetailsCard}
        </div>
    )

    //RENDER SCREEN
    
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
            <ConnectWallet/>
            <Footer />
        </>
    )
}

export default HomeScreen
