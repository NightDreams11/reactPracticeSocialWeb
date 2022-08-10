type FriendsType = {
  name: string
}

let initialState = {
  friends: [
    { name: "One" },
    { name: "Two" },
    { name: "Three" },
  ] as Array<FriendsType>,
}

type InitialStateType = typeof initialState

const sidebarReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  return state
}

export default sidebarReducer
