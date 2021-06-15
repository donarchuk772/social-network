import React, { FC, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import User from './User/User'
import s from './Users.module.sass'
import { getUsers, follow, unfollow } from '../../../redux/usersReducer'
import Paginator from '../../common/Paginator/Paginator'
import Preloader from '../../common/Preloader/Preloader'
import Search from './Search/Search'
import { appActions } from '../../../redux/appReducer'
import { AppStateType } from '../../../redux/ReduxStore'

const Users: FC<PropsType> = ({
    users,
    getUsers,
    follow,
    unfollow,
    isLoading,
    isAuth,
    setSnackbarMessage,
    totalUsersCount,
}) => {
    const [checkboxState, setCheckboxState] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isFirstRequest, setFirstRequest] = useState(true)

    useEffect(() => {
        getUsers(1, '', false)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (users.length > 0) {
            setFirstRequest(false)
        }
    }, [users])
    if (isFirstRequest) {
        return <Preloader />
    }

    const handleChange = (event: () => void, values: number) => {
        setCurrentPage(values)
        getUsers(values, searchQuery, checkboxState)
    }
    return (
        <div className={s.users}>
            <Search
                setSearchQuery={setSearchQuery}
                setCurrentPage={setCurrentPage}
                setCheckboxState={setCheckboxState}
                checkboxState={checkboxState}
                getUsers={getUsers}
                isLoading={isLoading}
            />
            {users.map((u) => (
                <User
                    {...u}
                    key={u.id}
                    follow={follow}
                    unfollow={unfollow}
                    isAuth={isAuth}
                    setSnackbarMessage={setSnackbarMessage}
                />
            ))}
            <div className={s.paginator}>
                <Paginator
                    portion={5}
                    handleChange={handleChange}
                    currentPage={currentPage}
                    isLoading={isLoading}
                    totalCount={totalUsersCount}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({
    isAuth: store.auth.isAuth,
    users: store.users.users,
    totalUsersCount: store.users.totalUsersCount,
    isLoading: store.users.isLoading,
})

const connector = connect(mapStateToProps, {
    follow,
    getUsers,
    unfollow,
    setSnackbarMessage: appActions.setSnackbarMessage,
})
type PropsType = ConnectedProps<typeof connector>

export default connector(Users)
