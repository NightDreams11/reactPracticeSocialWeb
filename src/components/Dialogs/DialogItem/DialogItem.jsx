import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './../Dialogs.module.css'

const DialogItem = (props) => {
    let pass = '/dialogs/' + props.id
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={pass}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;