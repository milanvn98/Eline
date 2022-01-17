import useHttp from '../../hooks/useHttp';
import styles from './Send.module.css'


const Send = (props) => {
  const request = props.request;
  const client = props.client
  const {isLoading, sendRequest} = useHttp()

  const sendHandler = () => {

    request && sendRequest({
      url:'resend-request',
      method: 'POST',
      body: request
    }, response => {
      
    })
    
    client && sendRequest({
      url:'employer-request',
      method: 'POST',
      body: client
    }, response => {
      
    })
  };

  return (
    <>
      <td onClick={sendHandler} className={styles.tool}>
        {isLoading ?  <i className="fa fa-spinner fa-spin fa-fw"></i> : <i className={`far fa-paper-plane ${styles.plane}`}></i>}
        <div className={styles.tooltip} onClick={sendHandler}>
          <p>Send Employee Request Form</p>
        </div>
      </td>
    </>
  );
};

export default Send;
