const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'Ross' },
        { id: 2, name: 'Vik' },
        { id: 3, name: 'And' },
        { id: 4, name: 'Nast' },
        { id: 5, name: 'Svet' },
        { id: 6, name: 'Art' },
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Yo' },
    ],
    newMessageBody: 'it-kamasutra.com'
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({ id: 6, message: body });
            return state;

        default:
            return state;
    }
}


export const sandMessageCreator = () => ({ type: 'SEND-MESSAGE' })

export const updateNewMessageBodyCreator = (body) =>
    ({ type: 'UPDATE-NEW-MESSAGE-BODY', body: body })

export default dialogsReducer;