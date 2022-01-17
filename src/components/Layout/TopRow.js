import styles from './TopRow.module.css'

const TopRow = (props) => {
    return(<>
        <div className={styles.container}>
        {props.children}
        </div>
    </>)
}

export default TopRow