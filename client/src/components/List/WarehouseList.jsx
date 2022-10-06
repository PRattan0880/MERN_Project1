import axios from 'axios';
import { useState, useEffect } from 'react';
import { Warehouse, Item } from './index'
import { useNavigate } from 'react-router-dom'
import { Card, Grid, Image, Text, Badge, Button, Group } from '@mantine/core';

//name, sku, quantity, category, price, imageURL 
// const Warehouse = ({ warehouse: { _id, warehouseNumber, MAX_CAPACITY, remaining_capacity, inventory } }) => {
//     const navigate = useNavigate();

//     const handleClick = (inventory, _id) => {
//         navigate("/inventory", {
//             state: {
//                 MAX_CAPACITY: MAX_CAPACITY,
//                 remaining_capacity: remaining_capacity,
//                 inventory: inventory,
//                 warehouse_id: _id
//             }
//         });
//     }

//     return (
//         <>

//             <div className='image-box'>

//             </div>
//             <div>
//                 <div>{warehouseNumber}</div>
//                 <div>{MAX_CAPACITY}</div>
//                 <div>{remaining_capacity}</div>
//                 <button onClick={() => handleClick(inventory, _id)}>View</button>
//             </div>
//         </>
//     );
// }

export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/inventory')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        // <div className='container'>
        <Grid>
            {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse} />)}
        </Grid>
        // </div>
    );

};  