import { FC, useEffect } from 'react'
import s from './App.module.sass'
import Content from './components/Content/Content'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'

import { connect, ConnectedProps, Provider } from 'react-redux'
import store, { AppStateType } from './redux/ReduxStore'
import { getAuthData } from './redux/authReducer'
import Preloader from './components/common/Preloader/Preloader'
import Snackbar from './components/common/Snackbar/Snackbar'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ComponentsContainer />
            </Provider>
        </BrowserRouter>
    )
}

const Components: FC<PropsType> = ({ isLoading, getAuthData, gameMode }) => {
    useEffect(() => {
        getAuthData()
        // eslint-disable-next-line
    }, [])
    if (isLoading) {
        return <Preloader />
    }
    return (
        <div className={s.wrapper}>
            <Header />
            <div style={{ display: gameMode ? 'block' : 'grid' }} className={s.container}>
                {!gameMode && <Navbar />}
                <Content />
            </div>
            <Snackbar />
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    isLoading: store.auth.isLoading,
    gameMode: store.games.gameMode,
})

const ComponentsContainer = connect(mapStateToProps, {
    getAuthData,
})(Components)

const connector = connect(mapStateToProps, { getAuthData })
type PropsType = ConnectedProps<typeof connector>

export default App
