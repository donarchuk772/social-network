import { InferActionsTypes } from './ReduxStore'
const SET_SNACKBAR_MESSAGE = 'app/SET_SNACKBAR_MESSAGE'

const initialState = {
    snackbarMessage: {
        text: null as string | null,
        type: null as string | null,
        duration: 5000 as number,
    } as const,
}

export type initialStateType = typeof initialState
const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                snackbarMessage: {
                    text: action.messageText,
                    type: action.messageType,
                    duration: action.duration,
                },
            }
        default:
            return state
    }
}
export const appActions = {
    setSnackbarMessage: (messageText: string | null, messageType: string | null, duration = 5000) =>
        ({
            type: SET_SNACKBAR_MESSAGE,
            messageText,
            messageType,
            duration,
        } as const),
}

type ActionsTypes = InferActionsTypes<typeof appActions>
export default appReducer
