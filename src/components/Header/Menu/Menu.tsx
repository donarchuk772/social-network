import { connect, ConnectedProps } from 'react-redux'
import ArrowIcon from '@material-ui/icons/KeyboardArrowDownOutlined'
import anonUser from '../../../assets/img/anonUser.png'
import { logoutUser } from '../../../redux/authReducer'
import { NavLink } from 'react-router-dom'
import s from './Menu.module.sass'
import { AppStateType } from '../../../redux/ReduxStore'
import { FC } from 'react'

const Menu: FC<PropsType> = ({ ownerPhoto, ownerName, logoutUser }) => {
    return (
        <div className={s.authorize}>
            <div className={s.fullName}>{ownerName}</div>
            <img className={s.avatar} src={ownerPhoto || anonUser} alt='' />
            <ArrowIcon fontSize='small' />
            <div className={s.pop}>
                <NavLink to='/settings/basicInfo' className={s.item}>
                    Settings
                </NavLink>
                <div
                    onClick={() => {
                        logoutUser()
                    }}
                    className={s.item}
                >
                    Sign out
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    ownerPhoto: store.auth.profile.photos.large,
    ownerName: store.auth.profile.fullName,
})

const connector = connect(mapStateToProps, { logoutUser })
type PropsType = ConnectedProps<typeof connector>

export default connector(Menu)
