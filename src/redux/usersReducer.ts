import { BaseThunkType, InferActionsTypes } from './ReduxStore'
import { UsersType } from '../types/types'
import { appActions } from './appReducer'
import { usersAPI } from '../api/usersAPI'
import { ResultCode } from '../api/api'

const TOGGLE_LOADING = 'users/TOGGLE_LOADING'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const SET_USERS = 'users/SET_USERS'
const CHANGE_SUBSCRIPTION_TYPE = 'users/CHANGE_SUBSCRIPTION_TYPE'
const TOGGLE_SUBSCRIPTION_LOADING = 'users/CHANGE_SUBSCRIPTION_IS_LOADING'

const initialState = {
	users: [] as Array<UsersType>,
	isLoading: true,
	totalUsersCount: 0 as number,
}

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount,
			}
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case CHANGE_SUBSCRIPTION_TYPE:
			return {
				...state,
				users: state.users.map((u) => {
					if (u.id === action.userId) {
						return { ...u, followed: action.subscriptionType }
					}
					return u
				}),
			}
		case TOGGLE_SUBSCRIPTION_LOADING:
			return {
				...state,
				users: state.users.map((u) => {
					if (u.id === action.userId) {
						return {
							...u,
							subscriptionIsLoading: action.subscriptionIsLoading,
						}
					}
					return u
				}),
			}
		default:
			return state
	}
}

export const usersActions = {
	toggleLoading: (isLoading: boolean) =>
		({
			type: TOGGLE_LOADING,
			isLoading,
		} as const),
	setTotalUsersCount: (totalUsersCount: number) =>
		({
			type: SET_TOTAL_USERS_COUNT,
			totalUsersCount,
		} as const),
	changeSubscriptionType: (subscriptionType: boolean, userId: number) =>
		({
			type: CHANGE_SUBSCRIPTION_TYPE,
			subscriptionType,
			userId,
		} as const),
	toggleSubscriptionLoading: (subscriptionIsLoading: boolean, userId: number) =>
		({
			type: TOGGLE_SUBSCRIPTION_LOADING,
			subscriptionIsLoading,
			userId,
		} as const),
	setUsers: (users: Array<UsersType>) =>
		({
			type: SET_USERS,
			users,
		} as const),
	setSnackbarMessage: appActions.setSnackbarMessage,
}
export const getUsers = (currentPage = 1, searchQuery = '', onlyFriend = false): ThunkType => {
	return async (dispatch) => {
		dispatch(usersActions.toggleLoading(true))
		const response = await usersAPI.getUsers(currentPage, searchQuery, onlyFriend)
		dispatch(usersActions.setTotalUsersCount(response.totalCount))
		dispatch(usersActions.setUsers(response.items))
		dispatch(usersActions.toggleLoading(false))
	}
}
export const unfollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		dispatch(usersActions.toggleSubscriptionLoading(true, userId))
		const response = await usersAPI.unfollow(userId)
		response.resultCode === ResultCode.success
			? dispatch(usersActions.changeSubscriptionType(false, userId))
			: dispatch(appActions.setSnackbarMessage(response.messages[0], 'error'))

		dispatch(usersActions.toggleSubscriptionLoading(false, userId))
	}
}
export const follow = (userId: number): ThunkType => {
	return async (dispatch) => {
		dispatch(usersActions.toggleSubscriptionLoading(true, userId))
		const response = await usersAPI.follow(userId)
		response.resultCode === ResultCode.success
			? dispatch(usersActions.changeSubscriptionType(true, userId))
			: dispatch(usersActions.setSnackbarMessage(response.messages[0], 'error'))

		dispatch(usersActions.toggleSubscriptionLoading(false, userId))
	}
}

type ActionsTypes = InferActionsTypes<typeof usersActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export default usersReducer
