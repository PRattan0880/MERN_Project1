import { Modal, useMantineTheme, NativeSelect, Textarea } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { IconCpu } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';

const schema = yup.object({
    name: yup.string().required('Product name is required'),
    sku: yup.string().required('Product sku is required'),
    quantity: yup.number().positive().integer().required(),
    price: yup.string().matches(/^\d*[\.{1}\d*]\d*$/),
    // price: yup.number().test("Max Digits", "", value => (value + "").match(/^\d*\.{1}\d*$/)),
    // price: yup.number().positive().required(),
    category: yup.string().matches(/(GPU|CPU)/).required(),
    imageUrl: yup.string().url().required()
}).required();

export const ItemForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // const [selectedOption, setSelectedOption] = useState("");
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const options = [{
        label: 'GPU',
        value: 'GPU'
    }, {
        label: 'CPU',
        value: 'CPU'
    },
    ];

    // const options = [
    //     <option > Please Select Category</option>,
    //     <option>CPU</option>,
    //     <option>GPU</option>
    // ];

    const onSubmit = async (data) => {
        setOpened(false);
        console.log(props.warehouse)

        try {
            const res = await axios.post('http://localhost:9000/item', {
                name: data.name,
                sku: parseInt(data.sku),
                // quantity: data.quantity,
                category: data.category,
                price: data.price,
                imageURL: data.imageUrl
            });
            console.log(res.data.quantity);
            console.log(props.warehouse_id);
            const putRest = await axios.put(`http://localhost:9000/inventory/addItem/${props.warehouse.warehouse_id}`, {
                items: [{
                    _id: res.data._id,
                    quantity: 10    // WILL FIX IT
                }]
            });

            console.log(putRest.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = () => {

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
                        // placeholder="84894189"
                        />
                        {/* <span>{errors.name?.message}</span> */}
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

                        {/* <div className='custom-select'>
                            <label className='label-font' htmlFor='category-select'>Category</label>
                            <span className="mantine-u5apz8 mantine-InputWrapper-required mantine-TextInput-required" aria-hidden="true"> *</span>
                            <select id='category-select' {...register('category')}  >
                                {options}
                                {!!errors.category}
                            </select>
                        </div> */}

                        <NativeSelect
                            label="Choose Component Type"
                            {...register('category')}
                            // onChange={e => console.log(e.currentTarget.value)}
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
            <button onClick={() => setOpened(!opened)}>Test</button>
        </>
    );

}
