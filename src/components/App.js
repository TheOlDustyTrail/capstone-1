import { Route, Routes } from "react-router-dom"
import './App.css';
import { Authorized } from "./views/Authorized"
import { NavBar } from "./navbar/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ApplicationView } from "./views/ApplicationViews.js";
import { useEffect, useState } from "react";


export const FinishedGames = () => {
  const localGameStationUser = localStorage.getItem("gameStation_user")
  const gameStationUserObject = JSON.parse(localGameStationUser)
  const [user, updateUser] = useState({})
  const [SignedIn, setSignedIn] = useState(false)
  let logged = { id: 1, }
  if (gameStationUserObject) {
    logged = gameStationUserObject
  }
  useEffect(
    () => {

      fetch(`http://localhost:8088/users/${logged.id}`)
        .then(response => response.json())
        .then((data) => {
          updateUser(data)
        })
    },
    [gameStationUserObject]
  )

  return <article className={`bodyBackground${user.background}`}> <Routes>
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
    {

      <div className="wave">
        <div className={`wave--one${user.background}`}></div>
        <div className={`wave--two${user.background}`}></div>
        <div className={`wave--three${user.background}`}></div>
      </div>

    }
  </article>
}


