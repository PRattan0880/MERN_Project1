import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Item, WarehouseList, ItemList } from "./components/List";
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WarehouseList />} />
                <Route path="/inventory" element={<ItemList />} />

            </Routes>

        </BrowserRouter>
    );
};