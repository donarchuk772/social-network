import TextField from '@material-ui/core/TextField'
import { Form, Formik } from 'formik'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { appActions } from '../../../../../redux/appReducer'
import anonUser from '../../../../../assets/img/anonUser.png'
import { profileActions } from '../../../../../redux/profileReducer'

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '28px',
        borderRadius: '50%',
        margin: '0 0 2px 0 ',
    },
    form: {
        margin: '20px 0 0 0 ',
        padding: '15px 25px',
        background: '#ffffff',
        borderRadius: '8px',
        border: '1.5px solid rgb(231,232,236)',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& button': {
            padding: '8px 18px',
            background: 'rgb(81,129,184)',
            border: '0;',
            borderRadius: '4px',
            color: '#ffffff',
            margin: '20px 0 0 0',
            cursor: 'pointer',
            '&:hover': { background: '#5181b8c9' },
        },
    },
}))

const PostForm = ({ addPost, isAuth, setSnackbarMessage, profilePhoto }) => {
    const classes = useStyles()

    return (
        <Formik
            initialValues={{
                post: '',
            }}
            validateOnBlur
            onSubmit={(values, action) => {
                if (!isAuth) {
                    setSnackbarMessage(
                        'You are in demo mode, it is forbidden to change data',
                        'error'
                    )
                    return
                }
                action.resetForm()
                addPost(values.post)
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        className={classes.margin}
                        label={`What's new?`}
                        name={'post'}
                        fullWidth
                        value={values.post}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rowsMax={4}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <img
                                        className={classes.avatar}
                                        alt=''
                                        src={profilePhoto || anonUser}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className={classes.button}>
                        <button type={'submit'} onClick={handleSubmit} className={classes.button}>
                            Post
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const mapStateToProps = (store) => ({
    isAuth: store.auth.isAuth,
    profilePhoto: store.profile.data.photos.large,
})

export default connect(mapStateToProps, {
    setSnackbarMessage: appActions.setSnackbarMessage,
    addPost: profileActions.addPost,
})(PostForm)
