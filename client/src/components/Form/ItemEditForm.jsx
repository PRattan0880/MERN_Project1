import { Modal, useMantineTheme, NativeSelect, Textarea, Center } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { IconCpu, IconCurrencyDollar, IconCirclePlus } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const ItemEditForm = ({ editOpened, setEditOpened, _id, name, sku, category, price, imageURL, quantity, warehouse_id, remaining_capacity, inventoryList, setInventoryList }) => {

    const schema = yup.object({
        name: yup.string().required('Product name is required'),
        quantity: yup.number().test("is-threshold-valid", "${path} threshold invalid", function (quantity) {
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
    }).required();

    // console.log(MAX_CAPACITY);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const theme = useMantineTheme();
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
        setEditOpened(false);
        console.log(data)
        console.log(quantity)

        try {

            const res = await axios.put(`http://localhost:9000/item/${_id}`, {
                name: data.name,
                sku: data.sku,
                category: data.category,
                price: data.price,
                imageURL: imageURL
            });

            const putRes = await axios.put(`http://localhost:9000/inventory/updateItem/${warehouse_id}`, {
                item: {
                    _id: _id,
                    name: data.name,
                    sku: data.sku,
                    category: data.category,
                    price: data.price,
                    imageURL: imageURL
                },
                quantity: data.quantity,
                addOrMinus: quantity - data.quantity
            });

            console.log(_id)
            await axios.get(`http://localhost:9000/inventory/${warehouse_id}`)
                .then(res => { setInventoryList(res.data.inventory); console.log(res.data) })
                .catch(err => console.error(err));

            console.log(putRes.data)
        } catch (err) {
            console.log(err);
        }
    }

    console.log(remaining_capacity)
    return (

        <>
            <Modal overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={editOpened} onClose={() => setEditOpened(false)} centered>
                <form>
                    <Group>
                        <TextInput
                            withAsterisk
                            label="Item Name"
                            {...register("name")}
                            defaultValue={name}
                            error={!!errors.name}
                            size="sm"
                        />

                        <TextInput
                            defaultValue={sku}
                            withAsterisk
                            label="SKU"
                            placeholder="84894189"
                            // error={!!errors.sku}
                            {...register("sku", { value: sku })}
                            size="sm"
                            disabled

                        />
                    </Group>
                    <Group>
                        <NumberInput

                            withAsterisk
                            label="Quantity"
                            placeholder="1"
                            {...register("quantity")}
                            defaultValue={quantity}
                            error={!!errors.quantity}
                            size="sm"
                        />
                        <NativeSelect
                            label="Choose Component Type"
                            data={options}
                            icon={<IconCpu size={14} />}
                            {...register("category", { value: category })}
                            // error={!!errors.category}
                            size="sm"
                            disabled
                        />
                    </Group>
                    <TextInput
                        defaultValue={price}
                        withAsterisk
                        label="Price"
                        placeholder="100.00"
                        hideControls
                        {...register("price")}
                        error={!!errors.price}
                        size="sm"
                        icon={<IconCurrencyDollar size={14} />}
                    />

                    <Group position="right" mt="md">
                        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Group>
                </form>
            </Modal>
            {/* <button onClick={() => setOpened(!opened)}>Test</button> */}
        </>
    );

}
