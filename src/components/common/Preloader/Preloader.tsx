import s from './Preloader.module.sass'
const Preloader = () => {
    return (
        <div className={s.loading}>
            <div className={s.squareXS}></div>
            <div className={s.squareXL}></div>
        </div>
    )
}

export default Preloader