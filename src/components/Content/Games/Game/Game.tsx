import { connect, ConnectedProps } from 'react-redux'
import { FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { gameActions } from '../../../../redux/gamesReducer'
import s from './Game.module.sass'
import { AppStateType } from '../../../../redux/ReduxStore'

const Game: FC<PropsType> = ({ games, match, toggleGameMode }) => {
    useEffect(() => {
        toggleGameMode(true)
        // eslint-disable-next-line
    }, [])
    const currentGame = games.filter((g) => {
        return g.id === Number(match.params.gameId)
    })

    return (
        <iframe
            style={{ maxWidth: currentGame[0].size?.width }}
            className={s.game}
            src={currentGame[0].url}
            height={currentGame[0].size?.height}
            width='100%'
            title='iframe'
        ></iframe>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    games: store.games.games,
})

const connector = connect(mapStateToProps, { toggleGameMode: gameActions.toggleGameMode })

type StatePropsType = ConnectedProps<typeof connector>
type PropsType = StatePropsType & RouteComponentProps<{ gameId: string }>

export default withRouter(connector(Game))
