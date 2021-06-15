import { AuthDataType } from './../types/types'
import { APIResponseType, example } from './api'

export const authAPI = {
    getAuthData() {
        return example.get(`auth/me`).then((res) => res.data) as Promise<
            APIResponseType<AuthDataType>
        >
    },
    loginUser(email: string, rememberMe: boolean, password: string, captcha = null) {
        return example
            .post(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then((res) => res.data) as Promise<APIResponseType>
    },
    logoutUser() {
        return example.delete(`auth/login`).then((res) => res.data) as Promise<APIResponseType>
    },
}
