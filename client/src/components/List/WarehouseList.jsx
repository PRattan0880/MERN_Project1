import axios from 'axios';
import { useState, useEffect } from 'react';
import { Warehouse } from './index'
import { Grid, Button, Center } from '@mantine/core';
import { IconCpu, IconCurrencyDollar, IconCirclePlus } from '@tabler/icons';
import { WarehouseForm } from '../Form/WarehouseForm';

export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/inventory')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Grid>
                {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse} />)}
            </Grid>
            <WarehouseForm />
        </>
    );

};  