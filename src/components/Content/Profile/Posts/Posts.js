import { connect } from 'react-redux'
import Post from './Post/Post'
import PostForm from './Post/PostForm'
import { appActions } from '../../../../redux/appReducer'

const Posts = ({ posts, profilePhoto, setSnackbarMessage, isAuth }) => {
    return (
        <div>
            <PostForm />
            {posts.map((p) => (
                <Post
                    {...p}
                    key={p.id}
                    isAuth={isAuth}
                    profilePhoto={profilePhoto}
                    setSnackbarMessage={setSnackbarMessage}
                />
            ))}
        </div>
    )
}

const mapStateToProps = (store) => ({
    posts: store.profile.posts,
    profilePhoto: store.profile.data.photos.large,
    isAuth: store.auth.isAuth,
})

export default connect(mapStateToProps, { setSnackbarMessage: appActions.setSnackbarMessage })(
    Posts
)
