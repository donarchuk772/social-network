import { FC, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Login from './Login'
import { loginUser } from '../../../redux/authReducer'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { loginDataType } from '../../../types/types'

const useStyles = makeStyles((theme) => ({
	lock: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: { textTransform: 'none', margin: '5px 0 0 0' },
	container: {
		marginTop: theme.spacing(8),
		padding: '30px',
		background: '#ffffff',
		borderRadius: '8px',
		border: '2px solid rgb(231,232,236)',
		maxWidth: '400px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		outline: 'none',
	},
	email: {
		margin: '20px 0 5px 0 ',
	},
}))

const LoginContainer: FC<LoginContainerPropsType> = ({ loginUser, open, setOpen }) => {
	const [isSendingData, toggleSendingData] = useState(false)
	const sendData = async (values: loginDataType, resetForm: () => void) => {
		toggleSendingData(true)
		await loginUser(values)
		toggleSendingData(false)
		resetForm()
	}
	const classes = useStyles()
	const validationForm = yup.object().shape({
		email: yup.string().email('Enter a valid email').required('Email is required'),
		password: yup.string().required('Password is required'),
	})
	return (
		<>
			<Login
				classes={classes}
				open={open}
				setOpen={setOpen}
				validationForm={validationForm}
				isSendingData={isSendingData}
				sendData={sendData}
			/>
		</>
	)
}

const connector = connect(null, { loginUser })
type CustomPropsType = {
	open: boolean
	setOpen: (arg0: boolean) => void
}
type LoginContainerPropsType = ConnectedProps<typeof connector> & CustomPropsType

export default connector(LoginContainer)
