import { FC, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import s from './Header.module.sass'
import LoginContainer from '../Content/Login/LoginContainer'
import logo from '../../assets/img/logo.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { NavLink } from 'react-router-dom'
import Menu from './Menu/Menu'
import { AppStateType } from '../../redux/ReduxStore'

const Header: FC<PropsType> = ({ isAuth, gameMode }) => {
    const [open, setOpen] = useState(false)
    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.flex}>
                    <NavLink className={s.logo} to='/profile'>
                        <img alt='' src={logo} />
                    </NavLink>
                    {gameMode && (
                        <NavLink to='/games' className={s.game}>
                            <ArrowBackIosIcon /> Games
                        </NavLink>
                    )}
                </div>
                {isAuth ? (
                    <Menu />
                ) : (
                    <div
                        className={s.signIn}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Sign in
                    </div>
                )}

                <LoginContainer open={open} setOpen={setOpen} />
            </div>
        </header>
    )
}
const mapStateToProps = (store: AppStateType) => ({
    isAuth: store.auth.isAuth,
    gameMode: store.games.gameMode,
})

const connector = connect(mapStateToProps)
type PropsType = ConnectedProps<typeof connector>

export default connector(Header)
