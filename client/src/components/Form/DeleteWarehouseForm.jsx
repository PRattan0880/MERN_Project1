import { Modal, useMantineTheme, NativeSelect, Textarea, Center, Text } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Form from 'react-bootstrap/Form';

export const DeleteWarehouseForm = ({ opened, setOpened, warehouse_id, warehouseList, setWarehouseList }) => {


    const { state } = useLocation();
    const theme = useMantineTheme();

    console.log()

    const handleDelete = async (warehouse_id) => {
        setOpened(false);
        try {
            await axios.delete(`http://localhost:9000/inventory/${warehouse_id}`);
            await axios.get('http://localhost:9000/inventory')
                .then(res => { setWarehouseList(res.data); console.log(res.data) })
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

                    <Button color="red" onClick={() => { handleDelete(warehouse_id) }}>Yes</Button>
                    <Button onClick={() => setOpened(false)}>No</Button>
                </Group>
            </Modal>
        </>
    );
}