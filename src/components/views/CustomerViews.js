import { Outlet, Route, Routes } from "react-router-dom"
import { MyGames } from "../customer/MyGames"
import { Profile } from "../customer/MyProfile"
import { GameContainer } from "../games/GameContainer"
import './Views.css';




export const CustomerViews = () => {
    return (
        <Routes>

            <Route path="/" element={
                <>
                    <h1>Game Station</h1>


                    <link href="http://fonts.cdnfonts.com/css/mark-squad" rel="stylesheet" />
                    <style>
                        @import url('http://fonts.cdnfonts.com/css/mark-squad');
                    </style>


                    <Outlet />
                </>
            }>
                <Route path="games" element={<GameContainer />} />
                <Route path="myGames" element={<MyGames />} />
                <Route path="profile" element={<Profile />} />
            </Route>

        </Routes>
    )
}