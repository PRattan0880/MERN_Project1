import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';

export const DeleteItemForm = ({ opened, setOpened }) => {
    const theme = useMantineTheme();
    return (
        <>
            <Modal overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={opened} onClose={() => setOpened(false)} centered>
                <Group>
                    <Button color="red" onClick={() => { setOpened(false) }}>Yes</Button>
                    <Button onClick={() => setOpened(false)}>No</Button>
                </Group>
            </Modal>
        </>
    );
}