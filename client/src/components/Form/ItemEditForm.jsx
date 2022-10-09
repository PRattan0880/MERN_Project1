import { Modal, useMantineTheme, NativeSelect } from '@mantine/core';
import { TextInput, Button, Group, NumberInput } from '@mantine/core';
import { IconCpu, IconCurrencyDollar } from '@tabler/icons';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


/**
 * Component for showing form in modal allowing user to edit item data and update the item state in 
 * order to rerender the component
 * 
 * @property {boolean}             editOpened           - Hold bolean value of modal opened
 * @property {React.Dispatch}      setEditOpened        - useState setter function used to update state of opened
 * @property {string}              _id                  - MongoDB _id for item document 
 * @property {string}              name                 - name of the item document 
 * @property {string}              sku                  - unique sku number of item document
 * @property {string}              category             - Category of item document
 * @property {number}              price                - Current price of given item document
 * @property {string}              imageURL             - holds url for image of each item document
 * @property {number}              quantity             - Current quantity of given item in inventory
 * @property {string}              warehouse_id         - MongoDB _id for warehouse document
 * @property {number}              remaining_capacity   - Current remaining capacity in warehouse document
 * @property {React.Dispatch}      setInventoryList     - useState setter function used to update state of inventory list 
 * 
 * @returns {React.Component} Rendered Modal with fields to update name, price and quantity of item in inventory
 */
export const ItemEditForm = ({ editOpened, setEditOpened, _id, name, sku, category, price, imageURL, quantity, warehouse_id, remaining_capacity, setInventoryList }) => {

    /**
     * Defining a yup schema to be used in order to validate data
     */
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
        price: yup.string().matches(/^\d*[\.{1}\d*]\d*$/),
    }).required();

    /**
    * Define useForm hooks to register input data
    */
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

    /**
     * Use axios for PUT and GET request using the warehouse's and item mongoDB _id
     * @param {Object} Object containing the input data for name, quantity, price, imageURL, and SKU 
     */
    const onSubmit = async (data) => {
        setEditOpened(false);
        try {

            await axios.put(`http://localhost:9000/item/${_id}`, {
                name: data.name,
                sku: data.sku,
                category: data.category,
                price: data.price,
                imageURL: imageURL
            });

            await axios.put(`http://localhost:9000/inventory/updateItem/${warehouse_id}`, {
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

            await axios.get(`http://localhost:9000/inventory/${warehouse_id}`)
                .then(res => setInventoryList(res.data.inventory))
                .catch(err => console.log(err));

        } catch (err) {
            console.log(err);
        }
    }

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
        </>
    );

}
