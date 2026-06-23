import DashBoard from "@/Pages/DashBoard"
import Home from "@/Pages/Home"
import Login from "@/Pages/Login"
import Register from "@/Pages/Register"

import { Route, Routes } from "react-router-dom"
import ProtectedRouter from "./ProtectedRoute"

const AppRouter=()=>{
    return (
        <Routes>
             <Route 
        path='/login'
        element={
            <Login/>
        }
        />
        <Route
        path='/'
        element={
            <Home/>
        }
        />
        <Route
        path="/register"
        element={
            <Register/>
        }/>
        <Route
        path="/dashboard"
        element={
            <ProtectedRouter>
                <DashBoard/>
            </ProtectedRouter>
        }/>
        </Routes>
    )
}
export default AppRouter