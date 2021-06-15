import Navbar from './Navbar/Navbar'
import s from './Settings.module.sass'
import BasicInfo from './Sections/BasicInfo'
import { Route } from 'react-router'
import Contacts from './Sections/Contacts'

const Settings = () => {
    return (
        <div className={s.settings}>
            <div className={s.content}>
                <Route path='/settings/basicInfo' render={() => <BasicInfo />} />
                <Route path='/settings/contacts' render={() => <Contacts />} />
            </div>
            <Navbar />
        </div>
    )
}

export default Settings
