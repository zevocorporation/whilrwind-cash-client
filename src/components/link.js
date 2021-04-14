//IMPORTING NPM PACKAGES

import React from 'react'
import { NavLink } from 'react-router-dom'

const Link = (props) => {
    return (
        <NavLink
            to={props.to}
            className={props.className}
            onClick={props.onClick}
            activeClassName={props.activeClassName}
        >
            {props.children}
        </NavLink>
    )
}

export default Link
