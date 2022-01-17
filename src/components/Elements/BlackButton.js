import styles from './BlackButton.module.css'

const BlackButton = props => {
    return <button className={`${styles.button} ${props.className}`} ref={props.reference} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
}

export default BlackButton