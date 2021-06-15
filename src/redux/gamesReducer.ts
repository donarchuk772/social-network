import { InferActionsTypes } from './ReduxStore'
import { GameType } from './../types/types'
import games from '../assets/json/games.json'

const TOGGLE_GAME_MODE = 'news/TOGGLE_GAME_MODE'

const initialState = {
	gameMode: false,
	games: games as Array<GameType>,
}

const gamesReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case TOGGLE_GAME_MODE:
			return { ...state, gameMode: action.gameMode }
		default:
			return state
	}
}

export const gameActions = {
	toggleGameMode: (gameMode: boolean) =>
		({
			type: TOGGLE_GAME_MODE,
			gameMode,
		} as const),
}

type ActionsTypes = InferActionsTypes<typeof gameActions>
export type initialStateType = typeof initialState
export default gamesReducer
