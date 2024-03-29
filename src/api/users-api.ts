import { AxiosPromise } from "axios"
import { APIResponseType, GetItemsType, instance } from "./api"

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        return res.data
      })
  },
  follow(userId: number) {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then((res) => res.data)
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as AxiosPromise<APIResponseType>
  },
}
