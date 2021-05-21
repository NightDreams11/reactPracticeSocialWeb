const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MEWSSAGE-TEXT'

const dialogsReducer = (state, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 7,
                message: state.newMessageText
            };

            state.messages.push(newMessage);
            state.newMessageText = '';
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;

        default:
            return state;
    }
}


export const addMessageActionCreator = () => ({ type: 'ADD-MESSAGE' })

export const updateNewMessageTextActionCreator = (text) =>
    ({ type: 'UPDATE-NEW-MEWSSAGE-TEXT', newText: text })

export default dialogsReducer;