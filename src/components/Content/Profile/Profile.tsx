import React, { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import s from './Profile.module.sass'
import { getProfileData, getProfileStatus, profileActions } from '../../../redux/profileReducer'
import { RouteComponentProps, withRouter } from 'react-router'
import Posts from './Posts/Posts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../../common/Preloader/Preloader'
import Avatar from './Avatar/Avatar'
import { AppStateType } from '../../../redux/ReduxStore'

const Profile: FC<PropsType> = ({
	authId,
	getProfileData,
	match,
	isLoading,
	setProfileData,
	authProfile,
	getProfileStatus,
	isAuth,
}) => {
	const urlUserId = match.params.userId
	useEffect(() => {
		let userId = urlUserId
		!userId && (userId = String(authId))
		!Number(userId) && (userId = '16182')
		if (!urlUserId && isAuth) {
			getProfileStatus(userId)
			setProfileData(authProfile)
			return
		}

		getProfileData(userId, isAuth)
		// eslint-disable-next-line
	}, [urlUserId])
	if (isLoading) {
		return <Preloader />
	}

	return (
		<div className={s.profile}>
			<div className={s.data}>
				<Avatar />
				<ProfileInfo isOwner={!urlUserId} />
			</div>
			{!urlUserId && <Posts />}
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	authId: store.auth.data.id,
	authProfile: store.auth.profile,
	isLoading: store.profile.isLoading,
	profileID: store.profile.data.userId,
	isAuth: store.auth.isAuth,
})

const connector = connect(mapStateToProps, {
	getProfileData,
	setProfileData: profileActions.setProfileData,
	getProfileStatus,
})

type StatePropsType = ConnectedProps<typeof connector>

type PropsType = StatePropsType & RouteComponentProps<{ userId: string }>

export default withRouter(connector(Profile))
