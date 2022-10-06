import { Item } from './index';
import { ItemForm } from '../Form/index'
import { useLocation } from 'react-router-dom';
import { Grid } from '@mantine/core';

export const ItemList = () => {
    const { state } = useLocation();
    console.log(state);
    console.log(state.inventory[0].item._id);
    return (
        <>
            <Grid gutter="xs">
                {/*<div className='cards-container'>*/}{state.inventory.map(inventory => <Item key={inventory.item._id} item={inventory.item} />)}{/*</div>*/}
            </Grid >
            <ItemForm warehouse={state} />
        </>

    );
}