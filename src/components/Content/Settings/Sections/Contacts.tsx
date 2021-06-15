import { TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import s from './Sections.module.sass'
import * as yup from 'yup'
import Tooltip from '@material-ui/core/Tooltip'
import { changeContacts } from '../../../../redux/profileReducer'
import { appActions } from '../../../../redux/appReducer'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../../../redux/ReduxStore'
import { FC } from 'react'
import { ContactsType } from '../../../../types/types'

const Contacts: FC<PropsType> = ({
	authId,
	isAuth,
	changeContacts,
	contacts,
	isSending,
	setSnackbarMessage,
}) => {
	const contactsKeys = Object.keys(contacts)
	const contactsValidators = {}
	const contactsValues = {}
	contactsKeys.forEach((key) => {
		//@ts-ignore
		contactsValidators[key] = yup.string().url('Must me url')
		//@ts-ignore
		contactsValues[key] = ''
	})
	const validationForm = yup.object().shape(contactsValidators)

	return (
		<Formik
			initialValues={contactsValues}
			onSubmit={(values, actions) => {
				if (!isAuth) {
					setSnackbarMessage('You are in demo mode, it is forbidden to change data', 'error')
					return
				}
				changeContacts(values as ContactsType, authId, actions.resetForm)
			}}
			validationSchema={validationForm}
		>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
				<div>
					<div className={s.title}>Contact info</div>
					<Form onSubmit={handleSubmit} className={s.form}>
						{contactsKeys.map((key) => (
							<div key={key} className={s.item}>
								<div className={s.inputName}>{key}:</div>
								<div className={s.input}>
									<Tooltip
										//@ts-ignore
										title={errors[key] ? errors[key] : ''}
										//@ts-ignore
										open={Boolean(touched[key] && errors[key])}
										placement="top"
										arrow
									>
										<TextField
											variant="outlined"
											size="small"
											name={key}
											onBlur={handleBlur}
											//@ts-ignore
											error={Boolean(touched[key] && errors[key])}
											onChange={handleChange}
											//@ts-ignore
											value={values[key]}
										/>
									</Tooltip>
								</div>
							</div>
						))}
					</Form>
					<div className={s.line}></div>
					<div className={s.save}>
						<button disabled={isSending} type={'submit'}>
							Save
						</button>
					</div>
				</div>
			)}
		</Formik>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	authId: store.auth.data.id,
	isAuth: store.auth.isAuth,
	contacts: store.profile.data.contacts,
	isSending: store.profile.isSending,
})

const connector = connect(mapStateToProps, {
	changeContacts,
	setSnackbarMessage: appActions.setSnackbarMessage,
})
type PropsType = ConnectedProps<typeof connector>

export default connector(Contacts)
