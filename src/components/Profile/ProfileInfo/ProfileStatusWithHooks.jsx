import React, { useState } from 'react';
import classes from './ProfileInfo.module.css'

// let stateWithSetState = useState(false); Возвращает массив из 2-х элементов. 
// Деструктуризация: let arr = [0, () => {}];
//                   let [a, setA] = arr;

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
                </div >
            }
            {
                editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}></input>
                </div >
            }
        </div >
    )
}
export default ProfileStatusWithHooks;