import React, {useEffect, useState} from "react";
import './MainPage.scss'
import SearchBar from "./searchBar/SearchBar";
import ClientCard from "../../includes/clientCard/clientCard";
import getClients from "../../api/client/getClients";
import Client from "../../models/client";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import {Redirect} from "react-router-dom";


function MainPage(): JSX.Element {

    const [clients, setClients] = useState<Array<Client>>([])
    const [isSubs, setIsUuid] = useState<boolean>(false)
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
                <SearchBar isSubsChanger={setIsUuid} clientsUpdater={setClients}/>
                <div className={'loadIndicator'}>
                    <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
                </div>
            </div>
        )
    }

    if (isSubs) {
        if (clients.length === 1) {
            return <Redirect to={`/client/${clients[0]._id}`}/>
        }
    }
    return (
        <div>
            <SearchBar isSubsChanger={setIsUuid} clientsUpdater={setClients}/>
            <div className={'clientsContainer'}>
                {clients.map((value: Client) => {
                    return <ClientCard client={value} key={value._id}/>
                })}
            </div>
        </div>
    )

}

export default MainPage
