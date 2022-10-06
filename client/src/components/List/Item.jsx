import { Card, Grid, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { DeleteItemForm } from '../Form/DeleteItemForm';
import { useState } from 'react';
import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';

const handleEdit = () => {

}



export const Item = ({ item: { _id, name, sku, quantity, category, price, imageURL } }) => {
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();

    const props = {
        setOpened: setOpened,
        opened: opened
    }
    const handleDelete = (_id) => {
        console.log(_id);
        setOpened(true);

    }

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
                        <Button onClick={() => handleEdit()} variant="light" color="blue" mt="md" radius="md">
                            <BsFillPencilFill />
                        </Button>
                    </div>
                    <div className='cards-button'>
                        <Button onClick={() => handleDelete(_id, opened, setOpened, theme)} variant="light" color="blue" mt="md" radius="md">
                            <BsFillTrashFill />

                        </Button>
                    </div>
                </div>
            </Card>
            <DeleteItemForm {...props} />
        </Grid.Col>
    );
}
// 