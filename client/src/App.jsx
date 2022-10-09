import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WarehouseList, ItemList } from "./components/List";

/**
 * @returns Rendered BrowserRouter allowing navigation to different SPA components
 */
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