import { Field, Form, Formik } from 'formik'
import { connect, ConnectedProps } from 'react-redux'
import s from './Messages.module.sass'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import * as yup from 'yup'
import { sendMessage } from '../../../../../redux/messengerReducer'
import { FC } from 'react'

const MessagesForm: FC<PropsType> = ({ userId, sendMessage }) => {
	const validationForm = yup.object().shape({
		message: yup.string().required(''),
	})
	return (
		<Formik
			initialValues={{
				message: '',
			}}
			onSubmit={(values, actions) => {
				sendMessage(userId, values.message)
				actions.resetForm()
			}}
			validationSchema={validationForm}
		>
			{({ values, handleChange, handleSubmit }) => (
				<Form className={s.input} onSubmit={handleSubmit}>
					<Field required name="message" onChange={handleChange} value={values.message} />
					<button className={s.submit} type="submit">
						<SendOutlinedIcon />
					</button>
				</Form>
			)}
		</Formik>
	)
}

const connector = connect(null, {
	sendMessage,
})
type PropsType = ConnectedProps<typeof connector> & { userId: string }

export default connector(MessagesForm)
