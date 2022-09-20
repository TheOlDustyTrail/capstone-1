
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { FinishedGames } from "./components/App"
import 'bootstrap/dist/css/bootstrap.min.css';
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <FinishedGames />
  </BrowserRouter>
)

