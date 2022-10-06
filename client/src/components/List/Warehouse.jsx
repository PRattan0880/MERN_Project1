import { useNavigate } from 'react-router-dom'
import { Card, Grid, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsEyeFill, BsFillPencilFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { DeleteItemForm } from '../Form/DeleteItemForm';
import { useState } from 'react';
import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';

export const Warehouse = ({ warehouse: { _id, warehouseNumber, MAX_CAPACITY, remaining_capacity, inventory } }) => {
    const navigate = useNavigate();
    const handleClick = (inventory, _id) => {
        navigate("/inventory", {
            state: {
                MAX_CAPACITY: MAX_CAPACITY,
                remaining_capacity: remaining_capacity,
                inventory: inventory,
                warehouse_id: _id
            }
        });
    }

    return (
        <Grid.Col span={8}>
            <Card shadow="sm" p="lg" radius="md" withBorder className='cards-card'>
                <Card.Section >
                    <Image src="" height={200} alt='' />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={120}>{warehouseNumber}</Text>
                    {/* <Badge color="pink" variant="light">Quantity: {quantity}</Badge> */}
                </Group>

                <Text size="sm" color="dimmed">Max Capacity: {MAX_CAPACITY}</Text>
                <Text size="xs" color="dimmed">Remaining Capacity: {remaining_capacity}</Text>

                <div className='cards-button-container'>
                    <div className='cards-button'>
                        <Button onClick={() => handleClick(inventory, _id)} variant="light" color="blue" mt="md" radius="md">
                            <BsEyeFill />
                        </Button>
                    </div>
                </div>
            </Card>
        </Grid.Col>

    )
}