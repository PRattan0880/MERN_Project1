import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsFillTrashFill } from "react-icons/bs";

const Item = ({ item: { name, sku, quantity, category, price, imageURL } }) => {
    return (
        <div className='cards-container'>
            <div className='cards'>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Card.Section >
                        <Image src={imageURL} height={200} alt='' />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={120}>{name}</Text>
                        <Badge color="pink" variant="light">Quantity: {quantity}</Badge>
                    </Group>

                    <Text size="sm" color="dimmed">SKU: {sku}</Text>
                    <Text size="xs" color="dimmed">CATEGORY: {category}</Text>
                    <Text size="xs" color="dimmed">PRICE: ${price}</Text>

                    <div className='cards-button-container'>
                        <div className='cards-button'>
                            <Button variant="light" color="blue" mt="md" radius="md">
                                Edit
                            </Button>
                        </div>
                        <div className='cards-button'>
                            <Button variant="light" color="blue" mt="md" radius="md">
                                <BsFillTrashFill />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

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