import React from "react";
import './SubCard.scss';
import Subscription from "../../models/subscription";
import {Link} from "react-router-dom";

interface ISubCard {
    sub: Subscription
}

function SubCard({sub}: ISubCard): JSX.Element {
    return (<Link className={'SubCardContainer'} to={`/subscription/${sub._id}`}>
        <div className={'SubCardElem'}>
            Абонемент {sub.subInfo.subName}, {sub.subInfo.visitsCount} - {sub.subInfo.cost}₽
            ({sub.subInfo.daysCount} дней)
        </div>
        <div className={'InfoSection'}>
            <div className={'infoSectionElement'}><p
                className={'title'}>Владелец:</p> &nbsp; {sub.client.surname} {sub.client.name} </div>
            {!sub.isInfinite ?
                <div className={'infoSectionElement'}><p className={'title'}>Посещений
                    осталось:</p> &nbsp; {sub.visitsLeft}</div> :
                <div className={'infoSectionElement'}>Безлимитный</div>}
        </div>
    </Link>)
}

export default SubCard;
