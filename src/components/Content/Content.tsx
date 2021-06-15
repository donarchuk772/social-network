import { Redirect, Route, Switch } from 'react-router'
import Profile from './Profile/Profile'
import Users from './Users/Users'
import Games from './Games/Games'
import Game from './Games/Game/Game'
import Messenger from './Messenger/Messenger'
import Settings from './Settings/Settings'
import Messages from './Messenger/Dialog/Messages/Messages'
import News from './News/News'

const Content = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                <Route exact path='/social-network/' render={() => <Redirect to={'/profile'} />} />
                <Route path='/profile/:userId?' render={() => <Profile />} />
                <Route exact path='/messenger' render={() => <Messenger />} />
                <Route exact path='/messenger/:messageId' render={() => <Messages />} />
                <Route path='/users' render={() => <Users />} />
                <Route path='/settings' render={() => <Settings />} />
                <Route path='/news' render={() => <News />} />
                <Route exact path='/games' render={() => <Games />} />
                <Route path='/games/:gameId' render={() => <Game />} />
            </Switch>
        </div>
    )
}

export default Content
