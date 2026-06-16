import Home from "@/Pages/Home"
import Login from "@/Pages/Login"
import Register from "@/Pages/Register"

import { Route, Routes } from "react-router-dom"

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
        </Routes>
    )
}
export default AppRouter