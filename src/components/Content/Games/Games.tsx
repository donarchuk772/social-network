import { connect, ConnectedProps } from 'react-redux'
import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { gameActions } from '../../../redux/gamesReducer'
import s from './Games.module.sass'
import { AppStateType } from '../../../redux/ReduxStore'

const Games: FC<PropsType> = ({ games, toggleGameMode }) => {
    useEffect(() => {
        toggleGameMode(false)
        // eslint-disable-next-line
    }, [])
    return (
        <div className={s.games}>
            {games.map((g) => (
                <NavLink to={`/games/${g.id}`} className={s.game} key={g.id}>
                    <img alt='' src={g.img} />
                    <div className={s.name}>{g.name}</div>
                </NavLink>
            ))}
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    games: store.games.games,
})

const connector = connect(mapStateToProps, { toggleGameMode: gameActions.toggleGameMode })
type PropsType = ConnectedProps<typeof connector>

export default connector(Games)
