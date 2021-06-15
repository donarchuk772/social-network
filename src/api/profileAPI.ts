import { ProfileType, PhotosType } from './../types/types'
import { example, APIResponseType } from './api'

type ProfileWithoutPhotoType = Omit<ProfileType, 'photos'>
export const profileAPI = {
	getProfileData(id: number | string) {
		return example.get(`profile/` + id).then((res) => res.data) as Promise<ProfileType>
	},
	getProfileStatus(id: number | string) {
		return example.get(`profile/status/` + id).then((res) => res.data) as Promise<string>
	},
	changeProfileStatus(status: string) {
		return example.put(`profile/status`, { status }).then((res) => res.data) as Promise<APIResponseType>
	},
	changeProfilePhoto(photoFile: File) {
		const formData = new FormData()
		formData.append('image', photoFile)
		return example
			.put(`profile/photo`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => res.data) as Promise<APIResponseType<PhotosType>>
	},
	changeProfileData(profile: ProfileWithoutPhotoType) {
		return example
			.put<APIResponseType>(`profile`, profile)
			.then((res) => res.data) as Promise<APIResponseType>
	},
}
