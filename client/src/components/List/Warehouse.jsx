import { useNavigate } from 'react-router-dom'
import { Card, Grid, Image, Text, Button, Group, Progress } from '@mantine/core';
import { BsEyeFill } from "react-icons/bs";
import { DeleteWarehouseForm } from '../Form/index.js';
import { useState } from 'react';
import { BsFillTrashFill } from "react-icons/bs";


/**
 * Component for showing item data in card format with image, name, sku, price, quantity and 2 buttons to edit and delete item
 * 
 * @property {string}              warehouse._id                  - MongoDB _id for warehouse document 
 * @property {number}              warehouse.MAX_CAPACITY         - Max capacity that a warehouse can hold in warehouse document
 * @property {number}              warehouse.remaining_capacity   - Current remaining capacity in warehouse document
 * @property {Array.Objects}       inventory                      - array of item documents/objects
 * @property {string}              warehouse.imageURL             - holds url for image of each item document
 * @property {Array.Objects}       warehouseList                  - array of warehouse documents/objects
 * @property {React.Dispatch}      setWarehouseList               - useState setter function used to update state of warehouse list 
 * 
 * @returns {React.Component} Rendered card with item info of image, name, sku, price, quantity and 2 buttons to edit and delete item
 */
export const Warehouse = ({ warehouse: { _id, warehouseNumber, MAX_CAPACITY, remaining_capacity, inventory, imageURL }, warehouseList, setWarehouseList }) => {
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();

    /**
     * Use navigate hook to navigate to inventory page with state
     * @param {string} _id     MongoDB _id for warehouse document 
     */
    const handleClick = (_id) => {
        navigate("/inventory", {
            state: {
                warehouse_id: _id,
                remaining_capacity: remaining_capacity
            }
        });
    }

    const props = {
        setOpened: setOpened,
        opened: opened,
        warehouse_id: _id,
        warehouseList: warehouseList,
        setWarehouseList: setWarehouseList
    }

    return (
        <>
            <Grid.Col span={4}>
                <Card shadow="sm" p="lg" radius="md" withBorder className='cards-card'>
                    <Card.Section >
                        <Image src={imageURL} height={200} alt='' />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={120}>{warehouseNumber}</Text>
                    </Group>

                    <Text size="sm" color="dimmed">Max Capacity: {MAX_CAPACITY}</Text>
                    <Text size="xs" color="dimmed">Remaining Capacity: {remaining_capacity}</Text>
                    <Progress value={(remaining_capacity / MAX_CAPACITY) * 100.00} size="lg" radius="md" color="red" />

                    <div className='cards-button-container'>
                        <div className='cards-button'>
                            <Button onClick={() => handleClick(_id)} variant="light" color="blue" mt="md" radius="md">
                                <BsEyeFill />
                            </Button>
                        </div>
                        <div className='cards-button'>
                            <Button onClick={() => setOpened(true)} variant="light" color="red" mt="md" radius="md">
                                <BsFillTrashFill />

                            </Button>
                        </div>
                    </div>
                </Card>
            </Grid.Col>
            <DeleteWarehouseForm {...props} />
        </>

    )
}