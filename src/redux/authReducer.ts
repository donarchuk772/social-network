import { AuthDataType, loginDataType, ProfileType } from './../types/types'
import { BaseThunkType, InferActionsTypes } from './ReduxStore'
import { appActions } from './appReducer'
import { profileActions } from './profileReducer'
import { profileAPI } from '../api/profileAPI'
import { authAPI } from '../api/authAPI'
import { ResultCode } from '../api/api'

const SET_AUTH_DATA = 'auth/SET_AUTH_DATA'
const SET_AUTH_PROFILE = 'auth/SET_AUTH_PROFILE'
const TOGGLE_LOADING = 'auth/TOGGLE_LOADING'

const initialState = {
    isLoading: true,
    isAuth: false,
    data: {
        id: null as number | null,
        email: null as string | null,
        login: null as string | null,
    } as AuthDataType,
    profile: {
        userId: null as number | null,
        lookingForAJob: null as boolean | null,
        lookingForAJobDescription: null as string | null,
        fullName: null as string | null,
        contacts: {
            github: null as string | null,
            vk: null as string | null,
            facebook: null as string | null,
            instagram: null as string | null,
            twitter: null as string | null,
            website: null as string | null,
            youtube: null as string | null,
            mainLink: null as string | null,
        },
        photos: {
            large: null as string | null,
            small: null as string | null,
        },
        aboutMe: null as string | null,
    } as ProfileType,
}

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                isAuth: action.isAuth,
            }
        case SET_AUTH_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case TOGGLE_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}
const authActions = {
    setAuthData: (authData: AuthDataType, isAuth: boolean) =>
        ({
            type: SET_AUTH_DATA,
            authData,
            isAuth,
        } as const),
    toggleLoading: (isLoading: boolean) =>
        ({
            type: TOGGLE_LOADING,
            isLoading,
        } as const),
    setAuthProfile: (profile: ProfileType) =>
        ({
            type: SET_AUTH_PROFILE,
            profile,
        } as const),
    setSnackbarMessage: appActions.setSnackbarMessage,
    setProfileData: profileActions.setProfileData,
}

export const getAuthData = (): ThunkType => {
    return async (dispatch) => {
        dispatch(authActions.toggleLoading(true))
        const response = await authAPI.getAuthData()
        if (response.resultCode === ResultCode.success) {
            const profile = await profileAPI.getProfileData(response.data.id)
            dispatch(authActions.setAuthProfile(profile))
            dispatch(profileActions.setProfileData(profile))
            dispatch(authActions.setAuthData(response.data, true))
        }
        dispatch(authActions.toggleLoading(false))
    }
}

export const loginUser = (data: loginDataType): ThunkType => {
    return async (dispatch) => {
        const { email, rememberMe, password } = data
        const response = await authAPI.loginUser(email, rememberMe, password)
        response.resultCode === ResultCode.success
            ? dispatch(getAuthData())
            : dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))
    }
}
export const logoutUser = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logoutUser()
        const data = {
            id: 0,
            email: '',
            login: '',
        }
        response.resultCode === ResultCode.success && dispatch(authActions.setAuthData(data, false))
    }
}

type ActionsTypes = InferActionsTypes<typeof authActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export default authReducer
