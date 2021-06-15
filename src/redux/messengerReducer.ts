import { BaseThunkType, InferActionsTypes } from './ReduxStore'
import { DialogsType, MessagesType, ProfileType } from './../types/types'
import { ResultCode } from '../api/api'
import { messengerAPI } from '../api/messengerAPI'
import { profileAPI } from '../api/profileAPI'

const SET_DIALOGS = 'messenger/SET_DIALOGS'
const SET_CURRENT_MESSAGES = 'messenger/SET_CURRENT_MESSAGES'
const TOGGLE_LOADING = 'messenger/TOGGLE_LOADING'
const DELETE_MESSAGE_ON_STATE = 'messenger/DELETE_MESSAGE_ON_STATE'
const SET_CURRENT_INTERLOCUTOR = 'messenger/SET_CURRENT_INTERLOCUTOR'

const initialState = {
	messages: [
		{
			id: 1,
			userName: 'Alexandr',
		},
	] as Array<DialogsType>,
	currentMessages: [] as Array<MessagesType>,
	isLoading: false,
	currentInterlocutor: {
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

const messengerReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return { ...state, isLoading: action.isLoading }
		case DELETE_MESSAGE_ON_STATE:
			return {
				...state,
				currentMessages: state.currentMessages.filter((m) => {
					return m.id !== action.id
				}),
			}
		case SET_DIALOGS:
			return {
				...state,
				messages: action.dialogs,
			}
		case SET_CURRENT_INTERLOCUTOR:
			return {
				...state,
				currentInterlocutor: {
					...action.currentInterlocutor,
				},
			}
		case SET_CURRENT_MESSAGES:
			return {
				...state,
				currentMessages: action.currentMessages,
			}
		default:
			return state
	}
}

export const messengerActions = {
	toggleLoading: (isLoading: boolean) =>
		({
			type: TOGGLE_LOADING,
			isLoading,
		} as const),
	setCurrentMessages: (currentMessages: Array<MessagesType>) =>
		({
			type: SET_CURRENT_MESSAGES,
			currentMessages,
		} as const),
	deleteMessageOnState: (id: string) =>
		({
			type: DELETE_MESSAGE_ON_STATE,
			id,
		} as const),
	setCurrentInterlocutor: (currentInterlocutor: ProfileType) =>
		({
			type: SET_CURRENT_INTERLOCUTOR,
			currentInterlocutor,
		} as const),

	setDialogs: (dialogs: Array<DialogsType>) => ({ type: SET_DIALOGS, dialogs } as const),
}

export const getDialogs = (): ThunkType => {
	return async (dispatch) => {
		dispatch(messengerActions.toggleLoading(true))
		const dialogs = await messengerAPI.getDialogs()
		dispatch(messengerActions.setDialogs(dialogs))
		dispatch(messengerActions.toggleLoading(false))
	}
}
export const sendMessage = (userId: string, message: string): ThunkType => {
	return async (dispatch) => {
		const response = await messengerAPI.sendMessage(userId, message)
		response.resultCode === ResultCode.success && dispatch(getMessages(userId))
	}
}
export const deleteMessage = (id: string): ThunkType => {
	return async (dispatch) => {
		const response = await messengerAPI.deleteMessage(id)
		response.resultCode === ResultCode.success && dispatch(messengerActions.deleteMessageOnState(id))
	}
}
export const getMessages = (id: string): ThunkType => {
	return async (dispatch) => {
		dispatch(messengerActions.toggleLoading(true))
		const response = await messengerAPI.getMessages(id)
		dispatch(messengerActions.setCurrentMessages(response.items))
		dispatch(messengerActions.toggleLoading(false))
	}
}
export const getUserProfile = (id: string): ThunkType => {
	return async (dispatch) => {
		const userProfile = await profileAPI.getProfileData(id)
		dispatch(messengerActions.setCurrentInterlocutor(userProfile))
	}
}

type ActionsTypes = InferActionsTypes<typeof messengerActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export default messengerReducer
