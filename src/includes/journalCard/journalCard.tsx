import React from "react";
import './journalCard.scss';
import Journal from "../../models/journal";
import { Link } from "react-router-dom";

interface CardProps {
    elem: Journal
}

interface InnerCardProps {
    personId: string,
    subId?: string
    name: string,
    visitInfo: string,
    parsedDateAndTime: string
}

function parseDate(dateString: string): string {
    const date = new Date(dateString);

    let day = date.getDate() + "";
    let month = (date.getMonth() + 1) + "";
    let year = date.getFullYear() + "";
    let hour = date.getHours() + "";
    let minutes = date.getMinutes() + "";


    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);

    function checkZero(data: string): string {
        if (data.length === 1) {
            data = "0" + data;
        }
        return data;
    }

    return `${day}.${month}.${year} в ${hour}:${minutes}`;
}

function InnerCard({name, visitInfo, parsedDateAndTime, personId, subId}: InnerCardProps): JSX.Element {
    return (<div className={'cardContainer'}>
        <Link className={'journalCardClient'} to={`/client/${personId}`}>{name}</Link>
        {subId ? <Link className={'journalCardInfo'} to={`/subscription/${subId!}`}>{visitInfo}</Link> :
            <div className={'journalCardInfo'}>{visitInfo}</div>}
        <div className={'journalCardDate'}>{parsedDateAndTime}</div>
    </div>)
}

function JournalCard({elem}: CardProps): JSX.Element {
    if (elem.isSub) {
        return <InnerCard
            personId={elem.subInfo!.client._id}
            subId={elem.subInfo!._id}
            name={`${elem.subInfo!.client.surname} ${elem.subInfo!.client.name}`}
            visitInfo={`Абонемент ${elem.subInfo!.subInfo.subName}, ${elem.subInfo!.subInfo.visitsCount}`}
            parsedDateAndTime={parseDate(elem.visitTime)}/>
    } else {
        return <InnerCard
            personId={elem.client!._id}
            name={`${elem.client!.surname} ${elem.client!.name}`}
            visitInfo={`Разовое посещение ${elem.visitInfo!.visitName} Стоимость ${elem.visitInfo!.cost} ₽`}
            parsedDateAndTime={parseDate(elem.visitTime)}/>
    }
}

export default JournalCard;
