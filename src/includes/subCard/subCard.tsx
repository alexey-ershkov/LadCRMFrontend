import React from "react";
import './subCard.scss';
import Subscription from "../../models/subscription";

interface ISubCardProps {
    sub: Subscription
}

function SubCard({sub}: ISubCardProps): JSX.Element {

    const dateTo = new Date(sub.dateTo);


    return (<a href={`/subscription/${sub._id}`} className={'subCard'}>
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
    </a>)
}

export default SubCard;
