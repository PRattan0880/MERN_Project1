import { Modal, useMantineTheme, Text } from '@mantine/core';
import { Button, Group } from '@mantine/core';
import axios from 'axios';

/**
 * Component for showing deletion confirmation modal and update the warehouse state in 
 * order to rerender the component
 * 
 * @property {boolean}             opened               - Hold bolean value of modal opened
 * @property {React.Dispatch}      setOpened            - useState setter function used to update state of opened
 * @property {string}              warehouse_id         - MongoDB _id for warehouse document 
 * @property {React.Dispatch}      setWarehouseList     - useState setter function used to update state of inventory list 
 * 
 * @returns {React.Component} Rendered Modal with confirmation to delete and yes/no button to confirm choice.
 */
export const DeleteWarehouseForm = ({ opened, setOpened, warehouse_id, setWarehouseList }) => {
    const theme = useMantineTheme();

    /**
     * Use axios for delete and get request using the warehouse's mongoDB _id
     * @param {string} warehouse_id     MongoDB _id for warehouse document 
     */
    const handleDelete = async (warehouse_id) => {
        setOpened(false);
        try {
            await axios.delete(`http://localhost:9000/inventory/${warehouse_id}`);
            await axios.get('http://localhost:9000/inventory')
                .then(res => setWarehouseList(res.data))
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