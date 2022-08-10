import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/object-helpers"

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHNG = "TOGGLE_IS_FETCHNG"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

interface IArrayField {
  users: {
    count: number
    page: number
    term: string
    friend: boolean
  }
}

type initialStateType = {
  users: IArrayField[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: []
  fake: number
}

type reducersProps = {
  type: string
  [index: string]: any
}

let initialState: initialStateType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  fake: 10,
}

const usersReducer = (state = initialState, action: reducersProps) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      }

    case SET_USERS:
      return { ...state, users: action.users }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count }

    case TOGGLE_IS_FETCHNG:
      return { ...state, isFetching: action.isFetching }

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      }

    default:
      return state
  }
}

export const followSuccess = (userId: string) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId: string) => ({ type: UNFOLLOW, userId })
export const setUsers = (users: string) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
})
export const setTotalUsersCount = (totalUsersCount: number) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
})
export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHNG,
  isFetching,
})
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: string
) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
})

export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: Function) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)

    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
  }
}

const followUnfollowFlow = async (
  dispatch: Function,
  userId: string,
  apiMethod: Function,
  actionCreator: Function
) => {
  dispatch(toggleFollowingProgress(true, userId))

  let response = await apiMethod(userId)

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: string) => {
  return async (dispatch: Function) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    )
  }
}

export const unfollow = (userId: string) => {
  return async (dispatch: Function) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    )
  }
}

export default usersReducer
