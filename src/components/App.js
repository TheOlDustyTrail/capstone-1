import { Route, Routes } from "react-router-dom"
import './App.css';
import { Authorized } from "./views/Authorized"
import { NavBar } from "./navbar/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ApplicationView } from "./views/ApplicationViews.js";


export const FinishedGames = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized >
        <>


          <NavBar />
          <ApplicationView />

        </>
      </Authorized>

    } />
  </Routes>
}


