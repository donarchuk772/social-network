import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import s from './Status.module.sass'
import { changeProfileStatus } from '../../../../../redux/profileReducer'
import { appActions } from '../../../../../redux/appReducer'
import { AppStateType } from '../../../../../redux/ReduxStore'

const StatusForm: FC<PropsType> = ({ status, changeProfileStatus, isOwner, setSnackbarMessage, isAuth }) => {
	const [editMode, setEditMode] = useState(false)
	return (
		<div className={s.status}>
			{isOwner && editMode ? (
				<Formik
					initialValues={{ status: status as string }}
					validateOnBlur
					onSubmit={(values, actions) => {
						setEditMode(false)
						if (!isAuth) {
							setSnackbarMessage('You are in demo mode, it is forbidden to change data', 'error')
							return
						}
						actions.resetForm()
						changeProfileStatus(values.status)
					}}
				>
					{({ values, handleChange, handleSubmit }) => (
						<Form onSubmit={handleSubmit} className={s.form}>
							<Field
								type="text"
								name="status"
								onChange={handleChange}
								autoFocus={true}
								onBlur={() => setTimeout(() => setEditMode(false), 100)}
								value={values.status}
							/>
							{/*@ts-ignore*/}
							<button type="submit">Save</button>
						</Form>
					)}
				</Formik>
			) : (
				<div
					style={{ cursor: isOwner ? 'pointer' : 'default' }}
					onClick={() => {
						setEditMode(true)
					}}
				>
					status: {status}
				</div>
			)}
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	status: store.profile.status,
	isAuth: store.auth.isAuth,
})

const connector = connect(mapStateToProps, {
	changeProfileStatus,
	setSnackbarMessage: appActions.setSnackbarMessage,
})

type DefaultPropsType = ConnectedProps<typeof connector>
type CustomPropsType = {
	isOwner: boolean
}

type PropsType = DefaultPropsType & CustomPropsType

export default connector(StatusForm)
