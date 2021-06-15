import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './User.module.sass'
import anonUser from '../../../../assets/img/anonUser.png'
import { UsersType } from '../../../../types/types'

const User: FC<PropsType> = ({
	isAuth,
	id,
	name,
	photos,
	followed,
	status,
	follow,
	unfollow,
	subscriptionIsLoading,
	setSnackbarMessage,
}) => {
	return (
		<div className={s.user}>
			<NavLink to={`/profile/${id}`}>
				<img className={s.avatar} alt="" src={photos?.large || anonUser} />
			</NavLink>
			<div className={s.value}>
				<div className={s.name}>{name}</div>
				<div className={s.status}>status: {status}</div>
				<button
					className={s.subscribeBtn}
					disabled={subscriptionIsLoading}
					onClick={() => {
						isAuth
							? followed
								? unfollow(id)
								: follow(id)
							: setSnackbarMessage('You are in demo mode, it is forbidden to change data', 'error')
					}}
				>
					{followed ? 'Unfollow' : 'Follow'}
				</button>
			</div>
		</div>
	)
}

type DefaultPropsType = {
	key: number
	follow: (arg0: number) => void
	unfollow: (arg0: number) => void
	isAuth: boolean
	setSnackbarMessage: (arg0: string, arg1: string, arg3?: number) => void
}

type PropsType = DefaultPropsType & UsersType

export default User
