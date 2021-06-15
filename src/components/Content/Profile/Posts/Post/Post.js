import anonUser from '../../../../../assets/img/anonUser.png'
import s from './Post.module.sass'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'

const Post = ({ name, text, likeCount, profilePhoto, isAuth, setSnackbarMessage }) => {
    const handleClick = () => {
        setSnackbarMessage('You are in demo mode, it is forbidden to change data', 'error')
    }
    return (
        <div className={s.post}>
            <div className={s.userData}>
                <div className={s.avatar}>
                    <img alt='' src={profilePhoto || anonUser} />
                </div>
                <div className={s.name}>{name}</div>
            </div>
            <div className={s.value}>{text}</div>
            <div
                onClick={() => {
                    !isAuth && handleClick()
                }}
                className={s.like}
            >
                <FavoriteBorderOutlinedIcon />
                {likeCount}
            </div>
        </div>
    )
}

export default Post
