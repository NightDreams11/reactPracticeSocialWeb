import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType } from "./redux-store"

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
}

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}
type ActionsTypes = InitializedSuccessType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type InitializedSuccessType = {
  // В данном случае мы хотим что бы тип соответствовал конкретному значению. Например "sahdbiqeblahcqjnw"
  // typeof в TS отличается от JS. В даннгом случае присвоится конкретное значение,
  // которое сидит в переменной, вместо ТИПА (например string) этой переменной
  type: typeof INITIALIZED_SUCCESS // "INITIALIZED_SUCCESS"
}

// Мы говорим, что возвращает функция
export const initializedSuccess = (): InitializedSuccessType => ({
  type: INITIALIZED_SUCCESS,
})

export const initializeApp = (): ThunkType => async (dispatch) => {
  let promise = dispatch(getAuthUserData())
  // dispatch(somethingElse())
  // dispatch(somethingElse())
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess())
  })
}

export default appReducer
