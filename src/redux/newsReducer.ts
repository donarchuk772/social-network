import { InferActionsTypes, BaseThunkType } from './ReduxStore'
import { NewsType } from '../types/types'
import { newsAPI } from '../api/newsAPI'

const SET_NEWS_DATA = 'news/SET_NEWS_DATA'
const TOGGLE_LOADING = 'news/TOGGLE_LOADING'

const initialState = {
    news: [] as Array<NewsType>,
    totalNewsCount: 0,
    isLoading: true,
}

const newsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_NEWS_DATA:
            return {
                ...state,
                news: action.news,
                totalNewsCount: action.totalNewsCount > 96 ? 96 : action.totalNewsCount,
            }
        case TOGGLE_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}

export const newsActions = {
    setNewsData: (news: Array<NewsType>, totalNewsCount: number) =>
        ({
            type: SET_NEWS_DATA,
            news,
            totalNewsCount,
        } as const),

    toggleLoading: (isLoading: boolean) =>
        ({
            type: TOGGLE_LOADING,
            isLoading,
        } as const),
}

export const getNews = (page: number): ThunkType => {
    return async (dispatch) => {
        dispatch(newsActions.toggleLoading(true))
        const response = await newsAPI.getNews(page)
        const { articles, totalResults } = response
        dispatch(newsActions.setNewsData(articles, totalResults))
        dispatch(newsActions.toggleLoading(false))
    }
}

type ActionsTypes = InferActionsTypes<typeof newsActions>
type ThunkType = BaseThunkType<ActionsTypes>
export type initialStateType = typeof initialState
export default newsReducer
