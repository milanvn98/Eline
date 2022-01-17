import NewItem from '../Elements/NewItem';
import { useContext } from 'react';
import ReducerContext from '../../context/reducer-context';

const Window = (props) => {
    const reducer_ctx = useContext(ReducerContext)

    return (<>
        <NewItem item={props.newItem} data={props.data} />
        {reducer_ctx.content}
    </>)
}

export default Window