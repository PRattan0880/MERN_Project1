import { Item, WarehouseList } from './index';
import { ItemForm } from '../Form/index'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mantine/core';

/**
 * Component for showing list of cards containg item data with image, name, sku, price, quantity and 2 buttons to edit and delete item
 * 
 * @returns Rendered Grid component showing list of cards containg item data with image, name, sku, price, quantity and 2 buttons to edit and delete item
 */
export const ItemList = () => {
    const { state } = useLocation();
    const [warehouse, setWarehouseList] = useState([])
    const [inventoryList, setInventoryList] = useState([]);

    /**
     * useEffect will run when the component mounts and use axios to fetch data from endpoint
     */
    useEffect(() => {
        axios.get(`http://localhost:9000/inventory/${state.warehouse_id}`)
            .then(res => { setInventoryList(res.data.inventory); setWarehouseList(res.data) })
            .catch(err => console.error(err));
    }, []);

    const warehouseProps = {
        warehouse: warehouse,
        inventoryList: inventoryList,
        setInventoryList: setInventoryList
    }

    console.log(inventoryList)
    return (
        <>
            <Grid gutter="xs">
                {inventoryList.map(inventory => {
                    const props = {
                        item: inventory.item,
                        quantity: inventory.quantity,
                        warehouse_id: state.warehouse_id,
                        remaining_capacity: state.remaining_capacity,
                        inventoryList: inventoryList,
                        setInventoryList: setInventoryList
                    }

                    return <Item key={inventory.item._id} {...props} />
                })}
            </Grid >
            <ItemForm {...warehouseProps} />
        </>

    );
}