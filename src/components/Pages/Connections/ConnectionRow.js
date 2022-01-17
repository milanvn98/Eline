import '../Row.module.css'
import { useContext } from 'react';
import ReducerContext from '../../../context/reducer-context';
import DataContext from '../../../context/data-context';
import Disconnect from '../../Elements/Disconnect'

const ConnectionRow = (props) => {
    const connection = props.td
    const reducer_ctx = useContext(ReducerContext)
    const data_ctx = useContext(DataContext)

    const getInfoHandler = () => {
        const data = data_ctx['connections']['data'].find(con => con['id'] === connection['id'])
        reducer_ctx.dispatch({type: 'CONNECTION_INFO', data: data})
    }

    return(<>
        <tr onClick={getInfoHandler}>
            <td><strong>{connection['_id']}</strong></td>
            <td>{connection['tenantName']}</td>
            <Disconnect item={connection} />
        </tr>
    </>)
}

export default ConnectionRow