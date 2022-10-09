import axios from 'axios';
import { useState, useEffect } from 'react';
import { Warehouse } from './index'
import { Grid } from '@mantine/core';
import { WarehouseForm } from '../Form/WarehouseForm';

/**
 * @returns Rendered Grid component showing list of cards containg item data with image, Warehouse Number, Max Capacity and remaining capacity
 */
export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);

    /**
     * useEffect will run when the component mounts and use axios to fetch data from endpoint
     */
    useEffect(() => {
        axios.get('http://localhost:9000/inventory')
            .then(res => setWarehouseList(res.data))
            .catch(err => console.error(err));
    }, []);


    const props = {
        warehouseList: warehouseList,
        setWarehouseList: setWarehouseList
    };

    return (
        <>
            <Grid>
                {warehouseList.map(warehouse => {
                    const warehouseProps = {
                        warehouse: warehouse,
                        warehouseList: warehouseList,
                        setWarehouseList: setWarehouseList
                    }
                    return <Warehouse key={warehouse._id} {...warehouseProps} />
                }
                )}
            </Grid>
            <WarehouseForm {...props} />
        </>
    );

};  