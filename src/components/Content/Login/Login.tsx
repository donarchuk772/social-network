import React, { FC, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LockIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Form, Formik } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { loginDataType } from '../../../types/types'

const Login: FC<PropsType> = ({ open, setOpen, classes, validationForm, isSendingData, sendData }) => {
	const [showPassword, toggleShowPassword] = useState(false)
	return (
		<Modal
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 250,
			}}
			open={open}
			onClose={() => setOpen(false)}
		>
			<Fade timeout={500} in={open}>
				<Container className={classes.container} component="main">
					<Avatar className={classes.lock}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Formik
						initialValues={{
							email: '',
							password: '',
							rememberMe: false,
						}}
						onSubmit={(values, actions) => {
							sendData(values, actions.resetForm)
						}}
						validationSchema={validationForm}
					>
						{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
							<Form onSubmit={handleSubmit}>
								<TextField
									className={classes.email}
									fullWidth
									name="email"
									label="Email"
									type="email"
									variant="outlined"
									autoComplete="on"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email ? errors.email : ' '}
								/>
								<FormControl fullWidth variant="outlined">
									<InputLabel
										error={Boolean(touched.password && errors.password)}
										htmlFor="outlined-adornment-password"
									>
										Password
									</InputLabel>
									<OutlinedInput
										type={showPassword ? 'text' : 'password'}
										name="password"
										error={Boolean(touched.password && errors.password)}
										autoComplete="current-password"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										endAdornment={
											<InputAdornment position="end">
												<IconButton onClick={() => toggleShowPassword(!showPassword)} edge="end">
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
										labelWidth={70}
									/>
									<FormHelperText error={Boolean(touched.password && errors.password)}>
										{touched.password && errors.password ? errors.password : ' '}
									</FormHelperText>
								</FormControl>

								<FormControlLabel
									control={
										<Checkbox
											name="rememberMe"
											checked={values.rememberMe}
											onChange={handleChange}
											color="primary"
										/>
									}
									label="Remember me"
								/>
								<Button
									disabled={isSendingData}
									className={classes.submit}
									fullWidth
									type="submit"
									variant="contained"
									color="primary"
								>
									Sign in
								</Button>
							</Form>
						)}
					</Formik>
				</Container>
			</Fade>
		</Modal>
	)
}

type PropsType = {
	open: boolean
	setOpen: (arg0: boolean) => void
	classes: any
	validationForm: any
	isSendingData: boolean
	sendData: (values: loginDataType, arg2: () => void) => void
}

export default Login
