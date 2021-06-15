import s from './Navbar.module.sass'
import { NavLink } from 'react-router-dom'
import WebIcon from '@material-ui/icons/WebOutlined'
import PeopleIcon from '@material-ui/icons/PeopleOutline'
import AccountIcon from '@material-ui/icons/AccountCircleOutlined'
import ForumIcon from '@material-ui/icons/ForumOutlined'
import SportsIcon from '@material-ui/icons/SportsEsportsOutlined'

const Navbar = () => {
    return (
        <nav>
            <NavLink to='/profile' className={s.item} activeClassName={s.activeLink}>
                <AccountIcon /> Profile
            </NavLink>

            <NavLink to='/messenger' className={s.item} activeClassName={s.activeLink}>
                <ForumIcon /> Messenger
            </NavLink>

            <NavLink to='/users' className={s.item} activeClassName={s.activeLink}>
                <PeopleIcon /> Users
            </NavLink>

            <NavLink to='/news' className={s.item} activeClassName={s.activeLink}>
                <WebIcon /> News
            </NavLink>

            <NavLink to='/games' className={s.item} activeClassName={s.activeLink}>
                <SportsIcon /> Games
            </NavLink>
        </nav>
    )
}

export default Navbar
