import { Modal, useMantineTheme, NativeSelect, Textarea, Center } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar, IconCirclePlus } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';



export const ItemForm = ({ warehouse: { _id, MAX_CAPACITY, remaining_capacity, inventory }, inventoryList, setInventoryList }) => {

    const schema = yup.object({
        name: yup.string().required('Product name is required'),
        sku: yup.string().required('Product sku is required'),
        quantity: yup.number().test("is-threshold-valid", "${path} threshold invalid", function (quantity) {
            console.log(quantity)
            // const isInRange = 0;
            if (remaining_capacity - quantity < 0) {
                return this.createError({
                    message: "Not Enough Capacity in Warehouse"
                })
            } else {
                return quantity;
            }
        }),
        // quantity: yup.number().positive().integer().required(),
        price: yup.string().matches(/^\d*[\.{1}\d*]\d*$/),
        category: yup.string().matches(/(GPU|CPU|Motherboard)/).required(),
        imageUrl: yup.string().url().required()
    }).required();

    // console.log(MAX_CAPACITY);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const options = [{
        label: 'GPU',
        value: 'GPU'
    }, {
        label: 'CPU',
        value: 'CPU'
    },
    {
        label: 'Motherboard',
        value: 'Motherboard'
    }
    ];

    const onSubmit = async (data) => {
        setOpened(false);
        console.log(data)

        try {
            const res = await axios.post('http://localhost:9000/item', {
                name: data.name,
                sku: parseInt(data.sku),
                category: data.category,
                price: data.price,
                imageURL: data.imageUrl
            });
            console.log(res.data._id);
            const putRest = await axios.put(`http://localhost:9000/inventory/addItem/${_id}`, {

                item: {
                    _id: res.data._id,
                },
                quantity: data.quantity

            });

            await axios.get(`http://localhost:9000/inventory/${_id}`)
                .then(res => { setInventoryList(res.data.inventory); console.log(res.data) })
                .catch(err => console.error(err));

            console.log(putRest.data);
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
                            label="Item Name"
                            {...register("name")}
                            error={!!errors.name}
                            size="sm"
                        />

                        <TextInput
                            withAsterisk
                            label="SKU"
                            placeholder="84894189"
                            {...register("sku")}
                            error={!!errors.sku}
                            size="sm"
                        />
                    </Group>
                    <Group>
                        <NumberInput
                            withAsterisk
                            label="Quantity"
                            placeholder="1"
                            {...register("quantity")}
                            error={!!errors.quantity}
                            size="sm"
                        />
                        <NativeSelect
                            label="Choose Component Type"
                            {...register('category')}
                            data={options}
                            icon={<IconCpu size={14} />}
                            error={!!errors.category}
                            size="sm"
                        />
                    </Group>
                    <TextInput
                        withAsterisk
                        label="Price"
                        placeholder="100.00"
                        hideControls
                        {...register("price")}
                        error={!!errors.price}
                        size="sm"
                        icon={<IconCurrencyDollar size={14} />}
                    />
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
            <Center><Button leftIcon={<IconCirclePlus size={15} />} onClick={() => setOpened(!opened)}>Create</Button></Center>
        </>
    );

}
