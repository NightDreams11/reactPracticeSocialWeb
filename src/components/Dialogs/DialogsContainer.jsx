import React from 'react';
import { connect } from 'react-redux';
import { updateNewMessageBodyCreator, sandMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


// const DialogsContainer = () => {

//     return <StoreContext.Consumer>
//         {
//             (store) => {

//                 let state = store.getState().dialogsPage;

//                 let onSendMessageClick = () => {
//                     store.dispatch(sandMessageCreator());
//                 }
//                 let onNewMessageChange = (body) => {
//                     store.dispatch(updateNewMessageBodyCreator(body))
//                 }


//                 return <Dialogs
//                     updateNewMessageBody={onNewMessageChange}
//                     sendMessage={onSendMessageClick}
//                     dialogsPage={state}>
//                 </Dialogs>
//             }
//         }
//     </StoreContext.Consumer>

// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: () => {
            dispatch(sandMessageCreator())
        }
    }
}

//HOC
let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;