import React, { FC, useEffect, useState } from 'react'
import s from './News.module.sass'
import { connect, ConnectedProps } from 'react-redux'
import { getNews } from '../../../redux/newsReducer'
import Paginator from '../../common/Paginator/Paginator'
import Preloader from '../../common/Preloader/Preloader'
import { AppStateType } from '../../../redux/ReduxStore'

const News: FC<PropsType> = ({ news, getNews, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        getNews(currentPage)
        // eslint-disable-next-line
    }, [])

    const handleChange = (event: () => void, values: number) => {
        setCurrentPage(values)
        getNews(values)
    }
    if (isLoading) {
        return <Preloader />
    }
    return (
        <div>
            <div className={s.news}>
                {news.news.map((n) => (
                    <a
                        key={n.description}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={s.item}
                        href={n.url}
                    >
                        <div className={s.preview}>
                            <img alt='' src={n.urlToImage} />
                        </div>
                        <div className={s.title}>{n.title}</div>
                        <div className={s.description}>{n.description}</div>
                    </a>
                ))}
            </div>
            <div className={s.paginator}>
                <Paginator
                    isLoading={isLoading}
                    currentPage={currentPage}
                    totalCount={news.totalNewsCount}
                    handleChange={handleChange}
                    portion={6}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    news: store.news,
    isLoading: store.news.isLoading,
})

const connector = connect(mapStateToProps, { getNews })
type PropsType = ConnectedProps<typeof connector>

export default connect(mapStateToProps, { getNews })(News)
