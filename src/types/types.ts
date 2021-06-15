export type NewsType = {
	author: string
	content: string
	description: string
	publishedAt: string
	source: {
		id: string
		name: string
	}
	title: string
	url: string
	urlToImage: string
}
export type UsersType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
	subscriptionIsLoading?: boolean
}
export type ContactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}
export type PhotosType = {
	small: string | null
	large: string | null
}
export type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string
	contacts: ContactsType
	photos: PhotosType
	aboutMe: string | null
}
export type PostsType = {
	id: number
	text: string
	name: string | null
	likeCount: number
	liked: boolean
}
export type PhotoType = {
	lastModified: number
	lastModifiedDate: string
	name: string
	size: number
	type: string
	webkitRelativePath: string
}
export type GameType = {
	id: number
	url: string
	img: string
	name: string
	size: {
		width: string
		height: string
	}
}
export type loginDataType = {
	email: string
	password: string
	rememberMe: boolean
}
export type AuthDataType = {
	email: string
	id: number
	login: string
}
export type MessagesType = {
	addedAt: string
	body: string
	id: string
	recipientId: number
	senderId: number
	senderName: string
	translatedBody: string | null
	viewed: boolean
}

export type DialogsType = {
	hasNewMessages: boolean
	id: number
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: PhotosType
	userName: string
}
export type BasicInfoType = {
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string
	aboutMe: string | null
}
