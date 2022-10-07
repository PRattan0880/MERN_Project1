import { useNavigate } from 'react-router-dom'
import { Card, Grid, Image, Text, Badge, Button, Group, Progress } from '@mantine/core';
import { BsEyeFill, BsFillPencilFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { DeleteWarehouseForm } from '../Form/index.js';
import { useState } from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';

export const Warehouse = ({ warehouse: { _id, warehouseNumber, MAX_CAPACITY, remaining_capacity, inventory, imageURL } }) => {
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();
    const handleClick = (inventory, _id) => {
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
        warehouse_id: _id
    }

    console.log(props)
    return (
        <>
            <Grid.Col span={4}>
                <Card shadow="sm" p="lg" radius="md" withBorder className='cards-card'>
                    <Card.Section >
                        <Image src={imageURL} height={200} alt='' />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={120}>{warehouseNumber}</Text>
                        {/* <Badge color="pink" variant="light">Quantity: {quantity}</Badge> */}
                    </Group>

                    <Text size="sm" color="dimmed">Max Capacity: {MAX_CAPACITY}</Text>
                    <Text size="xs" color="dimmed">Remaining Capacity: {remaining_capacity}</Text>
                    <Progress value={(remaining_capacity / MAX_CAPACITY) * 100.00} size="lg" radius="md" color="red" />

                    <div className='cards-button-container'>
                        <div className='cards-button'>
                            <Button onClick={() => handleClick(inventory, _id)} variant="light" color="blue" mt="md" radius="md">
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