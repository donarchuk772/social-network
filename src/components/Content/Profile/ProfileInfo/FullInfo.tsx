import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ProfileType } from '../../../../types/types'
import s from './ProfileInfo.module.sass'

const FullInfo: FC<PropsType> = ({ data, isOwner }) => {
	const contacts = Object.keys(data.contacts)
	return (
		<div className={s.fullInfo}>
			<div className={s.title}>
				<div className={s.name}>Job</div>
				<div className={s.line}></div>
				{isOwner && (
					<NavLink to="/settings/basicInfo" className={s.edit}>
						edit
					</NavLink>
				)}
			</div>
			<div className={s.information}>
				<div className={s.criterion}>Looking for work: </div>
				<div className={s.answer}>
					<div className={s.blue}>{data.lookingForAJob ? 'yes' : 'no'}</div>
				</div>
			</div>
			<div className={s.information}>
				<div className={s.criterion}>Professional skills: </div>
				<div className={s.answer}>
					{data.lookingForAJobDescription ? (
						<div className={s.blue}>{data.lookingForAJobDescription}</div>
					) : (
						'Information not specified'
					)}
				</div>
			</div>
			<div className={s.title}>
				<div className={s.name}>Contacts</div>
				<div className={s.line}></div>
				{isOwner && (
					<NavLink to="/settings/contacts" className={s.edit}>
						edit
					</NavLink>
				)}
			</div>
			{contacts.map((key) => (
				<div key={key} className={s.information}>
					<div className={s.criterion}>{key}: </div>
					<div className={s.answer}>
						{/*@ts-ignore*/}
						{data.contacts[key] ? (
							/*@ts-ignore*/
							<a target="_blank" href={data.contacts[key]} className={s.blue} rel="noopener noreferrer">
								{/*@ts-ignore*/}
								{data.contacts[key]}
							</a>
						) : (
							'Information not specified'
						)}
					</div>
				</div>
			))}
		</div>
	)
}

type PropsType = {
	data: ProfileType
	isOwner: boolean
}

export default FullInfo
