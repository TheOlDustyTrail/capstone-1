import { Outlet, Route, Routes } from "react-router-dom"
import { CreateGame } from "../admin/CreateGame"
import { GameEdits } from "../admin/GameEdits"
import { GameContainer } from "../games/GameContainer"








export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Game Station</h1>



                    <Outlet />
                </>
            }>
                <Route path="games" element={<GameContainer />} />
                <Route path="games/:gameId/edit" element={<GameEdits />} />
                <Route path="createGame" element={<CreateGame />} />

            </Route>

        </Routes>
    )
}