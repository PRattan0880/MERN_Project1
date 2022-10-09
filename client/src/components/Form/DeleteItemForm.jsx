import { Modal, useMantineTheme, NativeSelect, Textarea, Text } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';

export const DeleteItemForm = ({ opened, setOpened, _id, quantity, inventoryList, setInventoryList }) => {


    const { state } = useLocation();
    const theme = useMantineTheme();
    const handleDelete = async (_id) => {
        setOpened(false);
        try {
            const putRest = await axios.delete(`http://localhost:9000/inventory/${state.warehouse_id}/removeItem/${_id}`, {
                data: {
                    quantity: quantity
                }
            });

            await axios.get(`http://localhost:9000/inventory/${state.warehouse_id}`)
                .then(res => { setInventoryList(res.data.inventory); console.log(res.data) })
                .catch(err => console.error(err));

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <Modal overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={opened} onClose={() => setOpened(false)} centered>
                <Group align="center" position="center">
                    <Text size="sm">
                        Are you sure you want to delete this item? This action is permanent.
                    </Text>
                    <Button color="red" onClick={() => { handleDelete(_id) }}>Yes</Button>
                    <Button onClick={() => setOpened(false)}>No</Button>
                </Group>
            </Modal>
        </>
    );
}