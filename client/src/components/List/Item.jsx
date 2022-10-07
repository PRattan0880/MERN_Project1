import { Card, Grid, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { DeleteItemForm, ItemEditForm } from '../Form/index.js';
import { useState } from 'react';
import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';

export const Item = ({ item: { _id, name, sku, category, price, imageURL }, quantity, warehouse_id, remaining_capacity }) => {

    const [opened, setOpened] = useState(false);
    const [editOpened, setEditOpened] = useState(false);
    const theme = useMantineTheme();

    const deleteProps = {
        setOpened: setOpened,
        opened: opened,
        _id: _id,
        quantity: quantity,

    }
    const editProps = {
        setEditOpened: setEditOpened,
        editOpened: editOpened,
        _id: _id,
        name: name,
        sku: sku,
        category: category,
        price: price,
        quantity: quantity,
        warehouse_id: warehouse_id,
        remaining_capacity: remaining_capacity
    }

    console.log(remaining_capacity)
    return (
        <Grid.Col span={3}>
            <Card shadow="sm" p="lg" radius="md" withBorder className='cards-card'>
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
                        <Button onClick={() => setEditOpened(true)} variant="light" color="blue" mt="md" radius="md">
                            <BsFillPencilFill />
                        </Button>
                    </div>
                    <div className='cards-button'>
                        <Button onClick={() => setOpened(true)} variant="light" color="red" mt="md" radius="md">
                            <BsFillTrashFill />

                        </Button>
                    </div>
                </div>
            </Card>
            <ItemEditForm {...editProps} />
            <DeleteItemForm {...deleteProps} />
        </Grid.Col>
    );
}
// 