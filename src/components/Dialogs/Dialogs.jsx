import React from 'react';
import { Redirect } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css'
import Message from './Message/Message';
import AddMesssageForm from './AddMessageForm/AddMessageForm.jsx'


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}></DialogItem>);
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id} key={m.id}></Message>)
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to={'/login'}></Redirect>;

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMesssageForm onSubmit={addNewMessage}></AddMesssageForm>
        </div>
    )
}

export default Dialogs;