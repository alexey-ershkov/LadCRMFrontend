import React from "react";
import './clientCard.scss';
import Client from "../../models/client";
import { Link } from "react-router-dom";

interface IClientCardProps {
    client: Client
}

function ClientCard({client}:IClientCardProps):JSX.Element {

    return (<Link to={`/client/${client._id}`} className={'clientCard'}>
        <div className={'clientNames'}>
            {client.surname} {client.name}  {client.lastName}
        </div>
        <div className={'clientCardInfo'}>
            <div className={'phone'}>
                <p className={'title'}>Телефон: </p> &nbsp; {client.phone}
            </div>
            <div className={'orderNumber'}>
                <p className={'title'}>Номер клиента:</p> &nbsp; {client.uuid}
            </div>
        </div>
    </Link>)
}

export default ClientCard;
