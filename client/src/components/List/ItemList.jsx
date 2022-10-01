import { Item } from './index';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mantine/core';

export const ItemList = () => {
    const { state } = useLocation();
    console.log(state);
    return (
        <Grid gutter="xs">
            {/*<div className='cards-container'>*/}{state.items.map(item => <Item key={item._id} item={item} />)}{/*</div>*/}
        </Grid >

    );
}