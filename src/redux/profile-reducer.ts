import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profile-api"
import { PostType, ProfileType, PhotosType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 15 },
    { id: 2, message: "It`s my first post", likesCount: 20 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
}

const profileReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD-POST": {
      return {
        ...state,
        posts: [
          ...state.posts,
          { id: 5, message: action.newPostText, likesCount: 0 },
        ],
        newPostText: "",
      }
    }
    case "SN/PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      }
    }
    case "SN/PROFILE/SET_USER_PROFILE": {
      return { ...state, profile: action.profile }
    }
    case "SN/PROFILE/DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      }
    }
    case "SN/PROFILE/SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD-POST",
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
}

export const getUserProfile =
  (userId: number): BaseThunkType<ActionsType> =>
  async (dispatch) => {
    let data = await profileAPI.getProfile(userId)

    dispatch(actions.setUserProfile(data))
  }

export const getStatus =
  (userId: number): BaseThunkType<ActionsType> =>
  async (dispatch) => {
    let data = await profileAPI.getStatus(userId)

    dispatch(actions.setStatus(data))
  }

export const updateStatus =
  (status: string): BaseThunkType<ActionsType> =>
  async (dispatch) => {
    let data = await profileAPI.updateStatus(status)

    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status))
    }
  }

export const savePhoto =
  (file: File): BaseThunkType<ActionsType> =>
  async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }

export const saveProfile =
  (profile: ProfileType): BaseThunkType<ActionsType | FormAction> =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId))
      } else {
        throw new Error("userId can't be null")
      }
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
      return Promise.reject(data.messages[0])
    }
  }

export default profileReducer

type initialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
