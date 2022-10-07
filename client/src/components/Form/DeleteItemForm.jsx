import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';

export const DeleteItemForm = ({ opened, setOpened, _id }) => {


    const { state } = useLocation();
    const theme = useMantineTheme();

    const handleDelete = async (_id) => {
        setOpened(false);
        try {
            const putRest = await axios.delete(`http://localhost:9000/inventory/${state.warehouse_id}/removeItem/${_id}`);
        } catch (err) {

        }

    }

    return (
        <>
            <Modal overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={opened} onClose={() => setOpened(false)} centered>
                <Group>
                    <Button color="red" onClick={() => { handleDelete(_id) }}>Yes</Button>
                    <Button onClick={() => setOpened(false)}>No</Button>
                </Group>
            </Modal>
        </>
    );
}