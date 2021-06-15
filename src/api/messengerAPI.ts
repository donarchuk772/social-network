import { GetItemsType, APIResponseType, example } from './api'
import { MessagesType, DialogsType } from './../types/types'

export const messengerAPI = {
	getDialogs() {
		return example.get(`dialogs`).then((res) => res.data) as Promise<Array<DialogsType>>
	},
	getMessages(id: string) {
		return example.get(`dialogs/${id}/messages`).then((res) => res.data) as Promise<
			GetItemsType<MessagesType>
		>
	},
	deleteMessage(id: string) {
		return example.delete(`dialogs/messages/${id}`).then((res) => res.data) as Promise<APIResponseType>
	},
	sendMessage(id: string, message: string) {
		return example.post(`dialogs/${id}/messages`, { body: message }).then((res) => res.data) as Promise<
			APIResponseType<MessagesType>
		>
	},
}
