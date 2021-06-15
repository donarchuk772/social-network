import { FC } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NavLink } from 'react-router-dom'
import anonUser from '../../../../assets/img/anonUser.png'
import { AppStateType } from '../../../../redux/ReduxStore'
import s from './Navbar.module.sass'

const Navbar: FC<PropsType> = ({ photos }) => {
	return (
		<div>
			<div className={s.navbar}>
				<NavLink to="/profile" className={s.title}>
					<div className={s.avatar}>
						<img alt="" src={photos.large || anonUser} />
					</div>
					<div className={s.description}>
						<div className={s.fullName}>Ivan</div>
						<div className={s.link}>Go to profile</div>
					</div>
				</NavLink>
				<div className={s.items}>
					<NavLink className={s.item} to="/settings/basicInfo" activeClassName={s.active}>
						Basic info
					</NavLink>
					<NavLink className={s.item} to="/settings/contacts" activeClassName={s.active}>
						Contact info
					</NavLink>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	photos: store.profile.data.photos,
})

const connector = connect(mapStateToProps)
type PropsType = ConnectedProps<typeof connector>

export default connector(Navbar)
