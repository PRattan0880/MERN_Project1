import axios from 'axios';
import { useState, useEffect } from 'react';
import { Item } from './Item'
const handleInventory = () => {
    console.log("Redirect to Warehous Inventory");
}

const Warehouse = ({ warehouse: { warehouseNumber, MAX_CAPACITY, remaining_capacity, items } }) => {
    return (
        <>

            <div className='image-box'>

            </div>
            <div>
                <div>{warehouseNumber}</div>
                <div>{MAX_CAPACITY}</div>
                <div>{remaining_capacity}</div>
                {items.map(item => <Item key={item._id} item={item} />)}
            </div>
        </>
    );
}

export const WarehouseList = () => {

    const [warehouseList, setWarehouseList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/inventory')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='container'>
            {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse} />)}
        </div>
    );

};  