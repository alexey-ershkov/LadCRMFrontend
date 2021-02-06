import React from "react";
import './journalCard.scss';
import Journal from "../../models/journal";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import deleteVisit from "../../api/journal/deleteVisit";
import getJournal from "../../api/journal/getJournal";

interface CardProps {
    elem: Journal,
    updater: Function,
    pageUpdater: Function
}

interface BackendData {
    pages: number,
    journal: Array<Journal>
}

interface InnerCardProps {
    personId: string,
    subId?: string
    name: string,
    visitInfo: string,
    parsedDateAndTime: string,
    visitId: string,
    updater: Function,
    pageUpdater: Function
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

function InnerCard({updater,pageUpdater, visitId, name, visitInfo, parsedDateAndTime, personId, subId}: InnerCardProps): JSX.Element {

    const handleDelete = () => {
        const deleteVisitConf = window.confirm('Удалить посещение?');

        if (!deleteVisitConf) {
            return
        }

        deleteVisit(visitId)
            .then(() => {
                getJournal(1)
                    .then((data: BackendData) => {
                        updater(data.journal);
                        pageUpdater(data.pages);
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch(err => {
                alert(err);
            })
    }

    return (<div className={'cardContainer'}>
        <Link className={'journalCardClient'} to={`/client/${personId}`}>{name}</Link>
        {subId ? <Link className={'journalCardInfo'} to={`/subscription/${subId!}`}>{visitInfo}</Link> :
            <div className={'journalCardInfo'}>{visitInfo}</div>}
        <div className={'journalCardDate'}>{parsedDateAndTime}</div>
        <div className={'deleteVisit'}>
            <FontAwesomeIcon icon={faTimes} onClick={handleDelete}/>
        </div>
    </div>)
}

function JournalCard({elem, updater, pageUpdater}: CardProps): JSX.Element {
    if (elem.isSub) {
        return <InnerCard
            pageUpdater={pageUpdater}
            updater={updater}
            visitId={elem._id}
            personId={elem.subInfo!.client._id}
            subId={elem.subInfo!._id}
            name={`${elem.subInfo!.client.surname} ${elem.subInfo!.client.name}`}
            visitInfo={`Абонемент ${elem.subInfo!.subInfo.subName}, ${elem.subInfo!.subInfo.visitsCount}`}
            parsedDateAndTime={parseDate(elem.visitTime)}/>
    } else {
        return <InnerCard
            pageUpdater={pageUpdater}
            updater={updater}
            visitId={elem._id}
            personId={elem.client!._id}
            name={`${elem.client!.surname} ${elem.client!.name}`}
            visitInfo={`Разовое посещение ${elem.visitInfo!.visitName} Стоимость ${elem.visitInfo!.cost} ₽`}
            parsedDateAndTime={parseDate(elem.visitTime)}/>
    }
}

export default JournalCard;
