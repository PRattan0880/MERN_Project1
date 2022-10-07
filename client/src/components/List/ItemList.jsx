import { Item, WarehouseList } from './index';
import { ItemForm } from '../Form/index'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mantine/core';

export const ItemList = () => {
    const { state } = useLocation();
    const [warehouse, setWarehouseList] = useState([])
    const [inventoryList, setInventoryList] = useState([]);
    //console.log(state);
    // console.log(state.inventory[0].item._id);

    useEffect(() => {
        axios.get(`http://localhost:9000/inventory/${state.warehouse_id}`)
            .then(res => { setInventoryList(res.data.inventory); setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    console.log(warehouse)
    console.log(state.warehouse_id)
    console.log(state)
    return (
        <>

            < Grid gutter="xs">
                {inventoryList.map(inventory => {
                    const props = {
                        item: inventory.item,
                        quantity: inventory.quantity,
                        warehouse_id: state.warehouse_id,
                        remaining_capacity: state.remaining_capacity
                    }

                    return <Item key={inventory.item._id} {...props} />
                })}
                {/* {inventoryList.inventory.map(test => {
                    console.log(test)
                })} */}
                {/* {inventoryList.inventory.map(inventory => {
                    const props = {
                        item: inventory.item,
                        quantity: inventory.quantity
                    }
                    console.log(props)
                    return < Item key={inventory.item._id} {...props} />
                })}; */}
                {/* {state.inventory.map(inventory => {
                    const props = {
                        item: inventory.item,
                        quantity: inventory.quantity
                    }
                    console.log(props)
                    return < Item key={inventory.item._id} {...props} />
                })};*/}
            </Grid >
            <ItemForm warehouse={warehouse} />
        </>

    );
}