import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsFillTrashFill } from "react-icons/bs";


export const Item = ({ item: { name, sku, quantity, category, price, imageURL } }) => {
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
