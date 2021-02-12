import React, {useState, useEffect, FormEvent} from "react";
import './SubPage.scss';
import Subscription from "../../models/subscription";
import {useParams, Link, Redirect, useHistory} from "react-router-dom";
import getSubInfo from "../../api/sub/getSubInfo";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import saveSubVisit from "../../api/sub/saveSubVisit";
import SubVisit from "../../models/subVisit";
import addToArchive from "../../api/sub/archiveSub";
import addVisitToSub from "../../api/sub/addVisitToSub";
import removeSubVisit from "../../api/sub/removeVisitFromSub";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import deleteSubFromArchive from "../../api/sub/deleteSubFromArchive";

interface params {
    id: string
}

function SubPage(): JSX.Element {
    const [subInfo, setSubInfo] = useState<Subscription | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    const handleDelete = () => {
        const isDelete = window.confirm('Удалить абонемент? Операция необратима')
        if (!isDelete) {
            return
        }

        deleteSubFromArchive(id)
            .then(() => {
                setRedirect(true);
            })
            .catch(err => {
                alert(err);
            })
    }

    const handleAddVisit = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        addVisitToSub(id)
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

    const handleRemoveVisit = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        removeSubVisit(id)
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

    const handleSubVisit = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        let visit: SubVisit = {
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
                        setLoginRedirect(true);
                    })
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }

    const handleArchiveAdd = (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        addToArchive(id)
            .then(() => {
                setIsLoading(false);
                getSubInfo(id)
                    .then(data => {
                        setSubInfo(data);
                    })
                    .catch(err => {
                        setLoginRedirect(true);
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
            .catch(statusCode => {
                setIsLoading(false);
                if (statusCode !== 200) {
                    setLoginRedirect(true);
                }
            })
    }, [id])


    if (isLoading) {
        return (
            <div className={'loadIndicator'}>
                <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
            </div>
        )
    }

    if (loginRedirect) {
        return <Redirect to={'/login'}/>
    }

    if (redirect) {
        return <Redirect to={`/`}/>
    }

    if (subInfo !== undefined) {

        const dateFrom = new Date(subInfo.dateFrom);
        const dateTo = new Date(subInfo.dateTo);
        let lastVisited = new Date();
        if (subInfo.lastVisited) {
            lastVisited = new Date(subInfo.lastVisited);
        }

        return (<div className={'clientContainer'}>
            <div className={'subscription'}>
                <div className={'subscriptionTitle'}>
                    <div>{subInfo.subInfo.subName}</div>
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
                        {subInfo.lastVisited &&
                        <div className={'subscriptionTo clientMainPart'}>
                            <p className={'clientMainTitle'}>Последнее
                                посещение: </p>  {lastVisited.toLocaleDateString()}
                        </div>
                        }
                    </div>
                    <div className={'subscriptionAdditionalInfo '}>
                        <div className={'subscriptionFrom clientInfoPart'}>
                            <p className={'clientTitle'}>Оформлен: &nbsp; </p>  {dateFrom.toLocaleDateString()}
                        </div>
                        <div className={'subscriptionCost clientInfoPart'}>
                            <p className={'clientTitle'}>Стоимость: &nbsp; </p> {subInfo.subInfo.cost} ₽
                        </div>
                        <div className={'subscriptionCost clientInfoPart'}>
                            <p className={'clientTitle'}>Клиент:&nbsp;</p>
                            <Link to={`/client/${subInfo.client._id}`} className={'clientRef'}>
                                {subInfo.client.surname} {subInfo.client.name}
                            </Link>
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

                {subInfo.isArchived &&
                    <FontAwesomeIcon icon={faTimes} className={'deleteSub'} onClick={handleDelete}/>
                }

                {!subInfo.isArchived && !subInfo.isInfinite &&
                <div className={'subscriptionClientInfo'}>
                    <form className={'addAndRemoveButtons'} onSubmit={handleAddVisit}>
                        <button className={'button addAndRemoveButton'}>
                            Добавить занятие
                        </button>
                    </form>
                    <form className={'addAndRemoveButtons'} onSubmit={handleRemoveVisit}>
                        <button className={'button addAndRemoveButton'}>
                            Списать занятие
                        </button>
                    </form>
                </div>
                }

                <form className={'subscriptionClientInfo'} onSubmit={handleArchiveAdd}>
                    <button className={'button regVisitButton'}>
                        {!subInfo.isArchived ? "Архивировать" : "Вернуть из архива"}
                    </button>
                </form>
            </div>
        </div>)
    }

    return (<div className={'notFoundTitle'}>
       Абонемент удален
    </div>)
}

export default SubPage;
