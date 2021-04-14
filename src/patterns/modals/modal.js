import React from 'react'

//IMPORTING STYLESHEET

import '../../styles/patterns/modal.scss'

//IMPORTING COMPONENTS

import { Button } from '../../components'

//IMPORTING MEDIA ASSETS

import sucesss from '../../assets/images/depositsuccess.svg'
import close from '../../assets/icons/close.svg'
import copy from '../../assets/icons/copy.svg'

export const SuccessModal = () => {
    return (
        <div className="success-modal">
            <img src={sucesss} alt="success-svg" />
            <p className="title-b-24-txt-pri">Congratulations</p>
            <p className="txt-reg-14-txt-sec">
                Your funds has been transfered into your 
                privacy pool and the can be withdrawed 
                with the personal note provided to you.
            </p>
            <Button className="btn-primary">Done for now</Button>
        </div>
    )
}

export const NoteModal = () => {

    //HANDLING METHODS

    const handleCopy = () => {

    }

    //INLINE STYLES

    const inlineStyle={
        flex:{
            display:'flex',
            alignItems:'center',
            gridGap:16
        }
    }

    return (
        <div className="note-modal">
            <div>
                <p>Your note</p>
                <img src={close} alt="close" />
            </div>
            <p className="txt-reg-16-txt-sec">
                Make sure you save this someplace safe. 
                If you do not, your funds will be lost forever.
            </p>
            <p  className="txt-reg-14-txt-sec note">
                whirlwind-bnb-1-56-0x0c5cb0536f9f825f0e14cad9c875
                0a37f1ce89fff5295e404c9c4a54be9d509fff8e473c319a
                94be0712e40bc340102d70cac089a9141b012556d6c3b5b6
                iaskh2s515c15z1xc15xcc1s-sds-czx5xc52zxc11z-ase
            </p>
            <div>
                <p className="txt-reg-16-txt-grad">See note</p>
                <p style={inlineStyle.flex} onClick={() => handleCopy()}>
                    <img src={copy} alt="copy" />
                    <span>Copy to clipboard</span>
                </p>
            </div>
            <p  style={inlineStyle.flex}>
                <input type="checkbox" />
                <span>I have backed up my personal note</span> 
            </p>
        </div>
    )
}