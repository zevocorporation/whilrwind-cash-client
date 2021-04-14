import React from 'react'

//IMPORTING STYLESHEET

import '../styles/patterns/card.scss'

//IMPORTING MEDIA ASSETS

// import uparrow from '../assets/icons/uparrow.svg'
// import downarrow from '../assets/icons/downarrow.svg'

const Card = (props) => {

    const renderWorkcard = (
        <div className="work-card">
            <img src={props.image} alt="type" />
            <p className="txt-reg-24-txt-pri" style={{margin:'1em 0'}}>{props.title}</p>
            <p className="txt-reg-14-txt-sec">{props.description}</p>
        </div>
    )

    const renderTransactionType = (
        <div className="card-details">
        </div>
    )

    return props.variant==="transaction" ? renderTransactionType : renderWorkcard
}

export default Card
