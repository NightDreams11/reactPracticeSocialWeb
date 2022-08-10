const SEND_MESSAGE = "SEND_MESSAGE"

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Ross" },
    { id: 2, name: "Vik" },
    { id: 3, name: "And" },
    { id: 4, name: "Nast" },
    { id: 5, name: "Svet" },
    { id: 6, name: "Art" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
    { id: 6, message: "Yo" },
  ] as Array<MessageType>,
}

type initialStateType = typeof initialState

const dialogsReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      }
    }
    default:
      return state
  }
}

type SandMessageCreatorActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sandMessageCreator = (
  newMessageBody: string
): SandMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
})

export default dialogsReducer
