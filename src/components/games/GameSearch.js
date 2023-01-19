import { InputGroup } from "react-bootstrap"
import Form from 'react-bootstrap/Form';

export const GameSearch = ({ setterFunction }) => {


    //     <input
    //         onChange={
    //             (changeEvent) => {
    //                 setterFunction(changeEvent.target.value)
    //             }
    //         }

    //         type="text" placeholder="Enter search terms" />
    // )

    return (

        <lable className="searchBar">
            <InputGroup className="mb-3" onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }>
                <InputGroup.Text>Search By Game Title</InputGroup.Text>
                <Form.Control aria-label="Game Title" />

            </InputGroup>

        </lable>

    )

}