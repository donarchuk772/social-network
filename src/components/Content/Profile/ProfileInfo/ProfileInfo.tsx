import React, { FC, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import StatusForm from './Status/StatusForm'
import s from './ProfileInfo.module.sass'
import FullInfo from './FullInfo'
import { AppStateType } from '../../../../redux/ReduxStore'

const ProfileInfo: FC<PropsType> = ({ profileData, isOwner }) => {
    const [fullInfoStatus, setFullInfoStatus] = useState(false)
    return (
        <div className={s.info}>
            <div className={s.fullName}>{profileData.fullName}</div>
            <StatusForm isOwner={isOwner} />
            <div className={s.information}>
                <div className={s.criterion}>About me: </div>
                <div className={s.answer}>
                    {profileData.aboutMe ? (
                        <div className={s.blue}>{profileData.aboutMe}</div>
                    ) : (
                        'Information not specified'
                    )}
                </div>
            </div>
            <div className={s.showFulInfo}>
                <button
                    onClick={() => {
                        fullInfoStatus ? setFullInfoStatus(false) : setFullInfoStatus(true)
                    }}
                >
                    {fullInfoStatus ? 'Hide' : 'Show'} full information
                </button>
            </div>
            {fullInfoStatus && <FullInfo isOwner={isOwner} data={profileData} />}
        </div>
    )
}

const mapStateToProps = (store: AppStateType) => ({ profileData: store.profile.data })

const connector = connect(mapStateToProps)
type StatePropsType = ConnectedProps<typeof connector>
type CustomPropsType = {
    isOwner: boolean
}
type PropsType = CustomPropsType & StatePropsType

export default connector(ProfileInfo)
