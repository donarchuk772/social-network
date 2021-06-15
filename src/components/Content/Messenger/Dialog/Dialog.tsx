import { NavLink } from 'react-router-dom'
import s from './Dialog.module.sass'
import anonUser from '../../../../assets/img/anonUser.png'
import { DialogsType } from '../../../../types/types'
import { FC } from 'react'

const Dialog: FC<PropsType> = ({ id, photos, isAuth, userName, setSnackbarMessage }) => {
    const handleClick = () => {
        setSnackbarMessage(
            'You are in demo mode, to enter your page please sign in',
            'warning',
            10000
        )
    }
    return (
        <NavLink
            onClick={() => !isAuth && handleClick()}
            to={isAuth ? `/messenger/${id}` : '/messenger'}
            className={s.dialog}
        >
            <img className={s.avatar} alt='' src={photos?.large || anonUser} />
            <div className={s.name}>{userName}</div>
        </NavLink>
    )
}

type DefaultPropsType = {
    isAuth: boolean
    setSnackbarMessage: (arg0: string, arg1: string, arg2: number) => void
}

type PropsType = DialogsType & DefaultPropsType

export default Dialog
