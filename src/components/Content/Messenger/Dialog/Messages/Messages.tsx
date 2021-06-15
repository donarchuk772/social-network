import { FC, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { getMessages, deleteMessage, getUserProfile } from '../../../../../redux/messengerReducer'
import Message from './Message/Message'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import s from './Messages.module.sass'
import Preloader from '../../../../common/Preloader/Preloader'
import { NavLink } from 'react-router-dom'
import MessagesForm from './MessagesForm'
import anonUser from '../../../../../assets/img/anonUser.png'
import { AppStateType } from '../../../../../redux/ReduxStore'

const Messages: FC<PropsType> = ({
	match,
	messages,
	getMessages,
	interlocutor,
	deleteMessage,
	isLoading,
	getUserProfile,
	authProfile,
}) => {
	const messageId = match.params.messageId
	useEffect(() => {
		if (messageId) {
			getMessages(messageId)
			getUserProfile(messageId)
		}
		// eslint-disable-next-line
	}, [])
	if (isLoading) {
		return <Preloader />
	}
	return (
		<div className={s.container}>
			<div className={s.header}>
				<NavLink className={s.back} to="/messenger">
					<ArrowBackIosIcon />
					Back
				</NavLink>
				<div className={s.name}>{interlocutor.fullName}</div>
				<div className={s.avatar}>
					<img alt="" src={interlocutor.photos?.large || anonUser} />
				</div>
			</div>
			<div className={s.dialog}>
				{messages.map((m) => (
					<Message
						userPhoto={interlocutor.photos.large}
						userName={interlocutor.fullName}
						deleteMessage={deleteMessage}
						key={m.id}
						userId={authProfile.userId}
						body={m.body}
						senderId={m.senderId}
						photos={authProfile.photos}
						fullName={authProfile.fullName}
						id={m.id}
					/>
				))}
			</div>
			<MessagesForm userId={messageId} />
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	messages: store.messenger.currentMessages,
	isLoading: store.messenger.isLoading,
	interlocutor: store.messenger.currentInterlocutor,
	authProfile: store.auth.profile,
})

const connector = connect(mapStateToProps, { getMessages, deleteMessage, getUserProfile })
type PropsType = ConnectedProps<typeof connector> & RouteComponentProps<{ messageId: string }>

export default withRouter(connector(Messages))
