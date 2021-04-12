import React from 'react'

//IMPORTING STYLESHEET

import '../styles/patterns/card.scss'

const Card = (props) => {

    const renderWorkcard = (
        <div className="work-card">
            <img src={props.image} alt="type" />
            <p className="txt-reg-24-txt-pri" style={{margin:'1em 0'}}>{props.title}</p>
            <p className="txt-reg-14-txt-sec">{props.description}</p>
        </div>
    )

    const renderTransactionType = (
        <div>

        </div>
    )

    return props.variant==="transaction" ? renderTransactionType : renderWorkcard
}

export default Card
