import { Card, Grid, Image, Text, Badge, Button, Group } from '@mantine/core';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { DeleteItemForm, ItemEditForm } from '../Form/index.js';
import { useState } from 'react';

/**
 * Component for showing form in modal allowing user to edit item data and update the item state in 
 * order to rerender the component
 * 
 * @property {string}              _id                  - MongoDB _id for item document 
 * @property {string}              name                 - name of the item document 
 * @property {string}              sku                  - unique sku number of item document
 * @property {string}              category             - Category of item document
 * @property {number}              price                - Current price of given item document
 * @property {string}              imageURL             - holds url for image of each item document
 * @property {number}              quantity             - Current quantity of given item in inventory
 * @property {string}              warehouse_id         - MongoDB _id for warehouse document
 * @property {number}              remaining_capacity   - Current remaining capacity in warehouse document
* @property {Array.Objects}        inventoryList        - array of item documents/objects
 * @property {React.Dispatch}      setInventoryList     - useState setter function used to update state of inventory list 
 * 
 * @returns {React.Component} Rendered Modal with fields to update name, price and quantity of item in inventory
 */
export const Item = ({ item: { _id, name, sku, category, price, imageURL }, quantity, warehouse_id, remaining_capacity, inventoryList, setInventoryList }) => {

    const [opened, setOpened] = useState(false);
    const [editOpened, setEditOpened] = useState(false);

    const deleteProps = {
        setOpened: setOpened,
        opened: opened,
        _id: _id,
        quantity: quantity,
        inventoryList: inventoryList,
        setInventoryList: setInventoryList

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
        remaining_capacity: remaining_capacity,
        inventoryList: inventoryList,
        setInventoryList: setInventoryList
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