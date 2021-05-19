import React from 'react';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/state';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css'
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}></DialogItem>);
    let messagesElements = props.state.messages.map(m => <Message message={m.message} id={m.id}></Message>)

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        props.dispatch(addMessageActionCreator());
    }
    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        let action = updateNewMessageTextActionCreator(text);
        props.dispatch(action)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <textarea onChange={onMessageChange} ref={newMessageElement} value={props.state.newMessageText}></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Dialogs; //asdasdasdasd