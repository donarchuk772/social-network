import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import { connect, ConnectedProps } from 'react-redux'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { appActions } from '../../../../redux/appReducer'
import { changeProfilePhoto } from '../../../../redux/profileReducer'
import s from './Avatar.module.sass'
import anonUser from '../../../../assets/img/anonUser.png'
import { AppStateType } from '../../../../redux/ReduxStore'
import { ChangeEvent, FC } from 'react'

const Avatar: FC<PropsType> = ({ photo, changeProfilePhoto, isAuth, setSnackbarMessage, match, history }) => {
	const isOwner = !match.params.userId
	const sendPhoto = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isAuth) {
			setSnackbarMessage('You are in demo mode, it is forbidden to change data', 'error')
			return
		}
		const target = e.target as HTMLInputElement
		const files = target.files
		files?.length && changeProfilePhoto(files[0])
	}
	const handleClick = () => {
		if (!isAuth) {
			setSnackbarMessage('You are in demo mode, to enter your page please sign in', 'warning', 7500)
			return
		}
		history.push(`/messenger/${match.params.userId}`)
	}
	return (
		<div>
			<div className={s.container}>
				<div className={s.avatar}>
					{isOwner && (
						<div className={s.tools}>
							<PublishOutlinedIcon style={{ fontSize: 22 }} />
							Upload photo
							<div className={s.input}>
								<input onChange={(e) => sendPhoto(e)} type={'file'} />
							</div>
						</div>
					)}
					<img alt="" src={photo || anonUser} />
				</div>
				{isOwner && (
					<div className={s.edit}>
						<NavLink to="/settings/basicInfo">
							<button>Edit</button>
						</NavLink>
					</div>
				)}
				{!isOwner && (
					<div className={s.message}>
						<button onClick={handleClick}>Write message</button>
					</div>
				)}
			</div>
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	photo: store.profile.data.photos.large,
	isAuth: store.auth.isAuth,
})

const connector = connect(mapStateToProps, {
	changeProfilePhoto,
	setSnackbarMessage: appActions.setSnackbarMessage,
})

type StatePropsType = ConnectedProps<typeof connector>

type PropsType = StatePropsType & RouteComponentProps<{ userId: string }>

export default withRouter(connector(Avatar))
