import { BaseThunkType, InferActionsTypes } from './ReduxStore'
import { PostsType, PhotosType, BasicInfoType, ContactsType } from './../types/types'
import { ResultCode } from '../api/api'
import { appActions } from './appReducer'
import { ProfileType } from '../types/types'
import { profileAPI } from '../api/profileAPI'

const ADD_POST = 'profile/ADD_POST'
const SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS'
const SET_PROFILE_PHOTO = 'profile/SET_PROFILE_PHOTO'
const SET_PROFILE_DATA = 'profile/SET_PROFILE_DATA'
const TOGGLE_LOADING = 'profile/TOGGLE_LOADING'
const TOGGLE_SENDING = 'profile/TOGGLE_SENDING'

const initialState = {
	data: {
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
	status: null as string | null,
	posts: [{ id: 1, text: 'Hello', name: 'Ivan', likeCount: 0, liked: false }] as Array<PostsType>,
	isLoading: true,
	isSending: false,
}

const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return { ...state, isLoading: action.isLoading }
		case TOGGLE_SENDING:
			return { ...state, isSending: action.isSending }
		case SET_PROFILE_STATUS:
			return {
				...state,
				status: action.status,
			}
		case SET_PROFILE_PHOTO:
			return {
				...state,
				data: { ...state.data, photos: action.photos },
			}
		case SET_PROFILE_DATA:
			return {
				...state,
				data: {
					...action.profile,
				},
			}
		case ADD_POST:
			return {
				...state,
				posts: [
					...state.posts,
					{
						id: state.posts.length + 1,
						text: action.text,
						name: state.data.fullName,
						likeCount: 0,
						liked: false,
					},
				],
			}
		default:
			return state
	}
}

export const profileActions = {
	toggleLoading: (isLoading: boolean) =>
		({
			type: TOGGLE_LOADING,
			isLoading,
		} as const),
	toggleSending: (isSending: boolean) =>
		({
			type: TOGGLE_SENDING,
			isSending,
		} as const),
	setProfilePhoto: (photos: PhotosType) => ({ type: SET_PROFILE_PHOTO, photos } as const),
	addPost: (text: string) => ({ type: ADD_POST, text } as const),
	setProfileStatus: (status: string) =>
		({
			type: SET_PROFILE_STATUS,
			status,
		} as const),

	setProfileData: (profile: ProfileType) =>
		({
			type: SET_PROFILE_DATA,
			profile,
		} as const),
	setSnackbarMessage: appActions.setSnackbarMessage,
}

export const changeProfilePhoto = (photo: File): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.changeProfilePhoto(photo)
		if (response.resultCode === ResultCode.success) {
			dispatch(profileActions.setProfilePhoto(response.data))
			dispatch(appActions.setSnackbarMessage('Changes saved', 'success'))
		} else {
			dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))
		}
	}
}
export const getProfileData = (userId: string, isAuth = true): ThunkType => {
	return async (dispatch) => {
		dispatch(profileActions.toggleLoading(true))
		const profile = await profileAPI.getProfileData(userId)
		const status = await profileAPI.getProfileStatus(userId)
		dispatch(profileActions.setProfileData(profile))
		dispatch(profileActions.setProfileStatus(status))
		dispatch(profileActions.toggleLoading(false))
		!isAuth &&
			userId === '16182' &&
			dispatch(
				appActions.setSnackbarMessage(
					'You are in demo mode, to enter your page please sign in',
					'warning',
					10000
				)
			)
	}
}
export const changeProfileStatus = (status: string): ThunkType => {
	return async (dispatch) => {
		const response = await profileAPI.changeProfileStatus(status)
		if (response.resultCode === ResultCode.success) {
			dispatch(profileActions.setProfileStatus(status))
			dispatch(appActions.setSnackbarMessage('Changes saved', 'success'))
		} else {
			dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))
		}
	}
}
export const getProfileStatus = (userId: string): ThunkType => {
	return async (dispatch) => {
		dispatch(profileActions.toggleLoading(true))
		const response = await profileAPI.getProfileStatus(userId)
		dispatch(profileActions.setProfileStatus(response))
		dispatch(profileActions.toggleLoading(false))
	}
}

export const changeContacts = (data: ContactsType, id: number, resetForm: () => void): ThunkType => {
	return async (dispatch) => {
		dispatch(profileActions.toggleSending(true))
		const profileData = await profileAPI.getProfileData(id)
		const newProfileData = { ...profileData, contacts: data }
		const response = await profileAPI.changeProfileData(newProfileData)
		response.resultCode === ResultCode.success
			? dispatch(appActions.setSnackbarMessage('Changes saved', 'success'))
			: dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))
		dispatch(profileActions.toggleSending(false))
		resetForm()
	}
}
export const changeBasicInfo = (data: BasicInfoType, id: number, resetForm: () => void): ThunkType => {
	return async (dispatch) => {
		dispatch(profileActions.toggleSending(true))
		const profileData = await profileAPI.getProfileData(id)
		const newProfileData = { ...data, contacts: profileData.contacts, userId: id }
		const response = await profileAPI.changeProfileData(newProfileData)
		response.resultCode === ResultCode.success
			? dispatch(appActions.setSnackbarMessage('Changes saved', 'success'))
			: dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))
		dispatch(profileActions.toggleSending(false))
		resetForm()
	}
}

type ActionsTypes = InferActionsTypes<typeof profileActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export default profileReducer
