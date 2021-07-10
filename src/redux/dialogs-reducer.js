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
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        }
        default:
            return state;
    }
}


export const sandMessageCreator = (newMessageBody) => ({ type: 'SEND-MESSAGE', newMessageBody })

export default dialogsReducer;