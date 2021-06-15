import { Checkbox, TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import Tooltip from '@material-ui/core/Tooltip'
import * as yup from 'yup'
import s from './Sections.module.sass'
import { connect, ConnectedProps } from 'react-redux'
import { appActions } from '../../../../redux/appReducer'
import { changeBasicInfo } from '../../../../redux/profileReducer'
import { AppStateType } from '../../../../redux/ReduxStore'
import { FC } from 'react'

const BasicInfo: FC<PropsType> = ({
    changeBasicInfo,
    isAuth,
    authId,
    setSnackbarMessage,
    isSending,
}) => {
    const validationForm = yup.object().shape({
        fullName: yup.string().required('Nickname is required'),
        aboutMe: yup.string().required('About me is required'),
        lookingForAJobDescription: yup.string().required('Professional skills is required'),
    })
    return (
        <Formik
            initialValues={{
                fullName: '',
                aboutMe: '',
                lookingForAJobDescription: '',
                lookingForAJob: false,
            }}
            onSubmit={(values, actions) => {
                if (!isAuth) {
                    setSnackbarMessage(
                        'You are in demo mode, it is forbidden to change data',
                        'error'
                    )
                    return
                }
                changeBasicInfo(values, authId, actions.resetForm)
            }}
            validationSchema={validationForm}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <div>
                    <div className={s.title}>Basic info</div>
                    <Form onSubmit={handleSubmit} className={s.form}>
                        <div className={s.item}>
                            <div className={s.inputName}>Nickname:</div>
                            <div className={s.input}>
                                <Tooltip
                                    title={errors.fullName ? errors.fullName : ''}
                                    open={Boolean(touched.fullName && errors.fullName)}
                                    placement='top'
                                    arrow
                                >
                                    <TextField
                                        error={Boolean(touched.fullName && errors.fullName)}
                                        variant='outlined'
                                        size='small'
                                        name='fullName'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.fullName}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.inputName}>About me:</div>
                            <div className={s.input}>
                                <Tooltip
                                    title={errors.aboutMe ? errors.aboutMe : ''}
                                    open={Boolean(touched.aboutMe && errors.aboutMe)}
                                    placement='top'
                                    arrow
                                >
                                    <TextField
                                        error={Boolean(touched.aboutMe && errors.aboutMe)}
                                        variant='outlined'
                                        size='small'
                                        name='aboutMe'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.aboutMe}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.inputName}>Professional skills:</div>
                            <div className={s.input}>
                                <Tooltip
                                    open={Boolean(
                                        touched.lookingForAJobDescription &&
                                            errors.lookingForAJobDescription
                                    )}
                                    title={
                                        errors.lookingForAJobDescription
                                            ? errors.lookingForAJobDescription
                                            : ''
                                    }
                                    placement='top'
                                    arrow
                                >
                                    <TextField
                                        error={Boolean(
                                            touched.lookingForAJobDescription &&
                                                errors.lookingForAJobDescription
                                        )}
                                        variant='outlined'
                                        onBlur={handleBlur}
                                        size='small'
                                        name='lookingForAJobDescription'
                                        onChange={handleChange}
                                        value={values.lookingForAJobDescription}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.inputName}>Looking for work:</div>
                            <div>
                                <Checkbox
                                    size='small'
                                    color='primary'
                                    name='lookingForAJob'
                                    onChange={handleChange}
                                    checked={values.lookingForAJob}
                                />
                            </div>
                        </div>
                        <div className={s.line}></div>
                        <div className={s.save}>
                            {/* @ts-ignore */}
                            <button type='submit' disabled={isSending} onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    authId: store.auth.data.id,
    isAuth: store.auth.isAuth,
    isSending: store.profile.isSending,
})

const connector = connect(mapStateToProps, {
    setSnackbarMessage: appActions.setSnackbarMessage,
    changeBasicInfo,
})
type PropsType = ConnectedProps<typeof connector>

export default connector(BasicInfo)
