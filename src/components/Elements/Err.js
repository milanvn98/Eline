import styles from './Err.module.css'
import { useContext } from 'react';
import ErrorContext from '../../context/error-context';



const Err = (props) => {

    const err_ctx = useContext(ErrorContext)

    let classes = `${styles['error-box']} ${styles['away']}`

    if(err_ctx.error){
        classes = styles['error-box'] 
    } 

    return(<>
        <div className={`${styles['error-container']} ${!err_ctx.error && styles['away']}`}>
            <div className={classes}>
                <p>{err_ctx['error']}</p>
            </div>
        </div>
    </>)
}

export default Err