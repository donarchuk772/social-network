import { FC, SyntheticEvent, useEffect, useState } from 'react'
import SnackbarItem, { SnackbarCloseReason } from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { connect, ConnectedProps } from 'react-redux'
import { appActions } from '../../../redux/appReducer'
import { AppStateType } from '../../../redux/ReduxStore'

const Alert: FC<any> = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Snackbar2: FC<PropsType> = ({ setSnackbarMessage, snackbarMessage, duration }) => {
	const [open, setOpen] = useState(false)
	useEffect(() => {
		snackbarMessage.text && setOpen(true)
	}, [snackbarMessage.text, snackbarMessage.type])
	const handleClose = (event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<div>
			<SnackbarItem
				open={open}
				onClose={handleClose}
				autoHideDuration={duration}
				onExited={() => setSnackbarMessage(null, null)}
			>
				<Alert onClose={handleClose} severity={snackbarMessage.type}>
					{snackbarMessage.text}
				</Alert>
			</SnackbarItem>
		</div>
	)
}

const mapStateToProps = (store: AppStateType) => ({
	snackbarMessage: store.app.snackbarMessage,
	duration: store.app.snackbarMessage.duration,
})
const connector = connect(mapStateToProps, { setSnackbarMessage: appActions.setSnackbarMessage })
type PropsType = ConnectedProps<typeof connector>

export default connector(Snackbar2)
