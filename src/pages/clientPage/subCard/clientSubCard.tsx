import React from "react";
import './subCard.scss';
import Subscription from "../../../models/subscription";
import { Link } from "react-router-dom";

interface ISubCardProps {
    sub: Subscription
}

function ClientSubCard({sub}: ISubCardProps): JSX.Element {

    const dateTo = new Date(sub.dateTo);


    return (<Link className={'subCard'} to={`/subscription/${sub._id}`} >
        <div className={'subName'}>
            {sub.subInfo.subName}
        </div>
        <div className={'subInfo'}>
            {sub.isInfinite ?
                <div className={'visitsLeft'}>
                    Безлимитный
                </div>
                : <div className={'visitsLeft'}>
                    Осталось занятий: {sub.visitsLeft}
                </div>}
            <div className={'dateTo'}>
                Действителен до: {dateTo.toLocaleDateString()}
            </div>
        </div>
    </Link>)
}

export default ClientSubCard;
