import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import messengerReducer from './messengerReducer'
import profileReducer from './profileReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import appReducer from './appReducer'
import newsReducer from './newsReducer'
import gamesReducer from './gamesReducer'

const rootReducer  = combineReducers({
    messenger: messengerReducer,
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
    app: appReducer,
    news: newsReducer,
    games: gamesReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
    ? U
    : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<
    R,
    AppStateType,
    unknown,
    A
>

//@ts-expect-error
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
