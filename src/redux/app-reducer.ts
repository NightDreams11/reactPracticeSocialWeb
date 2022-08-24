import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType, InferActionsTypes } from "./redux-store"

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// type InitializedSuccessType = {
//   // В данном случае мы хотим что бы тип соответствовал конкретному значению. Например "sahdbiqeblahcqjnw"
//   // typeof в TS отличается от JS. В даннгом случае присвоится конкретное значение,
//   // которое сидит в переменной, вместо ТИПА (например string) этой переменной
//   type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
// }

export const actions = {
  initializedSuccess: () =>
    ({
      type: "SN/APP/INITIALIZED_SUCCESS",
    } as const),
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  let promise = dispatch(getAuthUserData())
  // dispatch(somethingElse())
  // dispatch(somethingElse())
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer
