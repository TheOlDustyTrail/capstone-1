import { useState } from "react"
import { Games } from "./Games"
import { GameSearch } from "./GameSearch"

export const GameContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <GameSearch setterFunction={setSearchTerms} />
        <Games searchTermState={searchTerms} />
    </>
}