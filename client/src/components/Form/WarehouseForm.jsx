import { Modal, useMantineTheme, NativeSelect, Textarea, Center } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar, IconCirclePlus, IconHash } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';


export const WarehouseForm = () => {
    const schema = yup.object({
        warehouseNumber: yup.number().positive().required(),
        max_capacity: yup.number().positive().required(),
        imageUrl: yup.string().url().required()
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const onSubmit = async (data) => {
        setOpened(false);
        console.log(data)
        try {
            const res = await axios.post('http://localhost:9000/inventory', {
                warehouseNumber: data.warehouseNumber,
                MAX_CAPACITY: data.max_capacity,
                remaining_capacity: data.max_capacity,
                imageURL: data.imageUrl,
                inventory: []
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Modal overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={opened} onClose={() => setOpened(false)} centered>
                <form>
                    <Group>
                        <TextInput
                            withAsterisk
                            label="Warehouse Number:"
                            placeholder="100"
                            hidecontols="true"
                            {...register("warehouseNumber")}
                            error={!!errors.warehouseNumber}
                            size="sm"
                        />
                        <TextInput
                            withAsterisk
                            label="Max Capacity"
                            placeholder="100"
                            hidecontols="true"
                            {...register("max_capacity")}
                            error={!!errors.max_capacity}
                            size="sm"
                        />
                    </Group>

                    <Textarea
                        placeholder="Image URL"
                        label="Image URL"
                        withAsterisk
                        {...register("imageUrl")}
                        error={!!errors.imageUrl}
                    />

                    <Group position="right" mt="md">
                        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Group>
                </form>
            </Modal>
            <Center><Button leftIcon={<IconCirclePlus size={15} />} onClick={() => setOpened(!opened)}> Create</Button></Center>
        </>
    );
}