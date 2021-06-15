import axios from 'axios'
export enum ResultCode {
    success = 0,
    error = 1,
}

export const example = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '77312ac7-c272-416f-a64d-a552b1abaa57',
    },
})
export type GetItemsType<I> = {
    items: Array<I>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: ResultCode
}
