import s from './Message.module.sass'
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded'
import { PhotosType } from '../../../../../../types/types'
import { FC } from 'react'

const Message: FC<PropsType> = ({
	userPhoto,
	deleteMessage,
	body,
	userId,
	senderId,
	photos,
	userName,
	fullName,
	id,
}) => {
	return (
		<div className={s.message}>
			{/*@ts-ignore*/}
			<img className={s.avatar} alt="" src={senderId === userId ? photos.large : userPhoto} />

			<div className={s.flex}>
				<div>
					{/*@ts-ignore*/}
					<div className={s.name}>{senderId === userId ? fullName : userName}</div>
					<div className={s.value}>{body}</div>
				</div>
				<div onClick={() => deleteMessage(id)} className={s.delete}>
					<DeleteIcon />
				</div>
			</div>
		</div>
	)
}

type PropsType = {
	userPhoto: string | null
	deleteMessage: (arg0: string) => void
	body: string
	userId: number
	senderId: number
	photos: PhotosType
	userName: string
	fullName: string
	id: string
}

export default Message
