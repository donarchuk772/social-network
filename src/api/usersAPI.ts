import { UsersType } from './../types/types'
import { example, GetItemsType, APIResponseType } from './api'

export const usersAPI = {
    getUsers(currentPage = 1, searchQuery = '', onlyFriend: boolean, pageSize = 5) {
        return example
            .get(
                `users?page=${currentPage}
            &count=${pageSize}
            &term=${searchQuery}
            ${onlyFriend ? `&friend=true` : ''}
            `
            )
            .then((res) => res.data) as Promise<GetItemsType<UsersType>>
    },
    follow(id: number) {
        return example.post(`follow/${id}`).then((res) => res.data) as Promise<APIResponseType>
    },
    unfollow(id: number) {
        return example.delete(`follow/${id}`).then((res) => res.data) as Promise<APIResponseType>
    },
}
