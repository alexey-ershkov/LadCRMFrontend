import React, {useState, useEffect, FormEvent} from "react";
import './SubPage.scss';
import Subscription from "../../models/subscription";
import {useParams} from "react-router-dom";
import getSubInfo from "../../api/sub/getSubInfo";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import saveSubVisit from "../../api/sub/saveSubVisit";
import SubVisit from "../../models/subVisit";

interface params {
    id: string
}

function SubPage(): JSX.Element {
    const [subInfo, setSubInfo] = useState<Subscription | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);


    const handleSubVisit = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        let visit:SubVisit = {
            subId: id,
            client: subInfo!.client._id,
            visitTime: new Date()
        }
        saveSubVisit(visit)
            .then(() => {
                setIsLoading(false);
                getSubInfo(id)
                    .then(data => {
                        setSubInfo(data);
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }


    const {id} = useParams<params>();

    useEffect(() => {
        if (id === undefined) {
            return
        }

        getSubInfo(id)
            .then(data => {
                setSubInfo(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }, [id])


    if (isLoading) {
        return (
            <div className={'loadIndicator'}>
                <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
            </div>
        )
    }

    if (subInfo !== undefined) {

        const dateFrom = new Date(subInfo.dateFrom);
        const dateTo = new Date(subInfo.dateTo)
        return (<div className={'clientContainer'}>
            <div className={'subscription'}>
                <div className={'subscriptionTitle'}>
                    <h2>Абонемент {subInfo.uuid}</h2>
                </div>
                <div className={'subscriptionInfo'}>
                    <div className={'mainInfo'}>
                        {subInfo.isInfinite ?
                            <div className={'clientMainPart'}>Безлимитный</div>
                            :
                            <div className={'subscriptionVisitsLeft clientMainPart'}>
                                <p className={'clientMainTitle'}>Осталось занятий: </p>{subInfo.visitsLeft}
                            </div>
                        }
                        <div className={'subscriptionTo clientMainPart'}>
                            <p className={'clientMainTitle'}>Действителен до: </p>  {dateTo.toLocaleDateString()}
                        </div>
                    </div>
                    <div className={'subscriptionAdditionalInfo '}>
                        <div className={'clientInfoPart'}>
                            <p className={'clientTitle'}>Название: </p> &nbsp; {subInfo.subInfo.subName}
                        </div>
                        <div className={'subscriptionFrom clientInfoPart'}>
                            <p className={'clientTitle'}>Оформлен: </p> &nbsp; {dateFrom.toLocaleDateString()}
                        </div>
                        <div className={'subscriptionCost clientInfoPart'}>
                            <p className={'clientTitle'}>Стоимость: </p> &nbsp;{subInfo.subInfo.cost}
                        </div>

                        {!subInfo.isInfinite &&
                            <div className={'clientInfoPart'}>
                                <p className={'clientTitle'}>Посещений всего: </p> &nbsp; {subInfo.subInfo.visitsCount}
                            </div>}

                    </div>
                </div>
                {subInfo.isArchived ?
                    <div className={'archivedTitle'}>
                         В архиве
                    </div>
                    :
                    <form className={'regVisit'} onSubmit={handleSubVisit}>
                        <button className={'button regVisitButton'}>
                            Зарегистрировать посещение по абонементу
                        </button>
                    </form>
                }
                <div className={'subscriptionClientInfo'}>
                    <a href={`/client/${subInfo.client._id}`} className={'button clientRef'}>
                        Клиент - {subInfo.client.surname} {subInfo.client.name}
                    </a>
                </div>
            </div>
        </div>)
    }

    return (<div>
        Inner error
    </div>)
}

export default SubPage;
