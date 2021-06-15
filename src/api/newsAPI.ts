import axios from 'axios'
import { NewsType } from '../types/types'

type NewsAPIType = {
    articles: Array<NewsType>
    status: string
    totalResults: number
}

export const newsAPI = {
    getNews(page = 1) {
        return axios
            .get(
                `https://newsapi.org/v2/everything?q=keyword
            &apiKey=77a41fb3e5504a0f865b317569939375
            &sortBy=popularity&language=en&page=${page}&pageSize=6`
            )
            .then((res) => res.data) as Promise<NewsAPIType>
    },
}
