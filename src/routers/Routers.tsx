import { Route, Routes } from "react-router"
import { HomePage } from "../pages";

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
    )
}

export default Routers;