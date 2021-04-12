//IMPORTING NPM PACKAGES

import React from 'react'
import { Link as ReactLink } from 'react-router-dom'

const Link = (props) => {
    return (
        <ReactLink
            to={props.to}
            className={props.className}
        >
            {props.children}
        </ReactLink>
    )
}

export default Link
