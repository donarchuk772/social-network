import { FC, useEffect } from 'react'
import s from './Messenger.module.sass'
import Dialog from './Dialog/Dialog'
import { connect, ConnectedProps } from 'react-redux'
import { getDialogs } from '../../../redux/messengerReducer'
import Preloader from '../../common/Preloader/Preloader'
import { appActions } from '../../../redux/appReducer'
import { AppStateType } from '../../../redux/ReduxStore'

const Messenger: FC<PropsType> = ({
    getDialogs,
    messages,
    isLoading,
    isAuth,
    setSnackbarMessage,
}) => {
    useEffect(() => {
        isAuth && getDialogs()
        // eslint-disable-next-line
    }, [])
    if (isLoading) {
        return <Preloader />
    }
    return (
        <div className={s.messenger}>
            {messages.map((m) => (
                <Dialog
                    {...m}
                    key={m.id}
                    isAuth={isAuth}
                    setSnackbarMessage={setSnackbarMessage}
                    photos={m.photos}
                />
            ))}
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    messages: store.messenger.messages,
    isLoading: store.messenger.isLoading,
    isAuth: store.auth.isAuth,
})

const connector = connect(mapStateToProps, {
    getDialogs,
    setSnackbarMessage: appActions.setSnackbarMessage,
})
type PropsType = ConnectedProps<typeof connector>

export default connector(Messenger)
