import { InferActionsTypes } from "./redux-store"

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

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND_MESSAGE": {
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

export const actions = {
  sandMessageCreator: (newMessageBody: string) =>
    ({
      type: "SN/DIALOGS/SEND_MESSAGE",
      newMessageBody,
    } as const),
}

export default dialogsReducer

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
