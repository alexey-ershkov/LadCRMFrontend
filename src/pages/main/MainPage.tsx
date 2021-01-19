import React, {useEffect, useState} from "react";
import './MainPage.scss'
import SearchBar from "./searchBar/SearchBar";
import ClientCard from "../../includes/clientCard/clientCard";
import getClients from "../../api/client/getClients";
import Client from "../../models/client";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";


function MainPage(): JSX.Element {

    const [clients, setClients] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getClients().then(
            data => {
                setClients(data)
                setLoading(false);
            }
        )
    }, [])

    if (isLoading) {
        return (
            <div>
                <SearchBar/>
                <div className={'loadIndicator'}>
                    <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <SearchBar/>
            <div className={'clientsContainer'}>
                {clients.map((value:Client) => {
                    return <ClientCard client={value} key={value._id}/>
                })}
            </div>
        </div>
    )
}

export default MainPage
