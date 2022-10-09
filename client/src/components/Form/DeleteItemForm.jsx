import { Modal, useMantineTheme, Text } from '@mantine/core';
import { Button, Group } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


/**
 * Component for showing deletion confirmation modal and update the inventory state in 
 * order to rerender the component
 * 
 * @property {boolean}             opened               - Hold bolean value of modal opened
 * @property {React.Dispatch}      setOpened            - useState setter function used to update state of opened
 * @property {string}              _id                  - MongoDB _id for item document 
 * @property {number}              quantity             - Current quantity of given item in inventory
 * @property {React.Dispatch}      setInventoryList     - useState setter function used to update state of inventory list 
 * 
 * @returns {React.Component} Rendered Modal with confirmation to delete and yes/no button to confirm choice.
 */
export const DeleteItemForm = ({ opened, setOpened, _id, quantity, setInventoryList }) => {


    const { state } = useLocation();
    const theme = useMantineTheme();

    /**
     * Use axios for delete and get request using the item's mongoDB _id
     * @param {string} _id MongoDB _id for item document 
     */
    const handleDelete = async (_id) => {
        setOpened(false);
        try {
            await axios.delete(`http://localhost:9000/inventory/${state.warehouse_id}/removeItem/${_id}`, {
                data: {
                    quantity: quantity
                }
            });

            await axios.get(`http://localhost:9000/inventory/${state.warehouse_id}`)
                .then(res => setInventoryList(res.data.inventory))
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