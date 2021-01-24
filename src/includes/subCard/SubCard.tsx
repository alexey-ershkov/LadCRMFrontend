import React from "react";
import './SubCard.scss';
import Subscription from "../../models/subscription";

interface ISubCard {
    sub: Subscription
}

function SubCard({sub}: ISubCard): JSX.Element {
    return (<a className={'SubCardContainer'} href={`/subscription/${sub._id}`}>
        <div className={'SubCardElem'}>
            Абонемент номер {sub.uuid}
        </div>
        <div className={'InfoSection'}>
            <div className={'infoSectionElement'}><p className={'title'}>Владелец:</p> &nbsp; {sub.client.surname} {sub.client.name} </div>
            {!sub.isInfinite ?
                <div className={'infoSectionElement'}><p className={'title'}>Посещений осталось:</p> &nbsp; {sub.visitsLeft}</div> :
                <div className={'infoSectionElement'}>Безлимитный</div>}
        </div>
    </a>)
}

export default SubCard;
