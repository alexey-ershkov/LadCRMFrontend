import React, {useEffect, useState} from "react";
import './ClientPage.scss';
import {useParams} from 'react-router-dom'
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import getClientById from "../../api/client/getClientById";
import Client from "../../models/client";
import getSubTypes from "../../api/sub/getSubTypes";
import getSingleVisitTypes from "../../api/singleVisit/getSingleVisitTypes";
import SubType from "../../models/subType";
import SingleVisitType from "../../models/singleVisitType";
import useForm from "../../hooks/useForm";
import SingleVisit from "../../models/singleVisit";
import saveSingleVisit from "../../api/singleVisit/saveSingleVisit";
import SubscriptionSell from "../../models/subscriptionSell";
import sellSub from "../../api/sub/sellSub";
import getUserSubs from "../../api/sub/getUserSubs";
import Subscription from "../../models/subscription";
import ClientSubCard from "./subCard/clientSubCard";

interface params {
    id: string
}

function ClientPage(): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubTypesLoading, setSubTypesLoading] = useState(true);
    const [isSingleVisitTypesLoading, setSingleVisitTypesLoading] = useState(true);
    const [isClientSubsLoading, setIsClientSubsLoading] = useState(true);

    const [client, setClient] = useState({});
    const [subTypes, setSubTypes] = useState([]);
    const [singleVisitTypes, setSingleVisitTypes] = useState([]);
    const [clientSubs, setClientSubs] = useState<Array<Subscription>>([]);


    let {id} = useParams<params>();

    const handleSingleVisitOrder = () => {
        setIsLoading(true);
        let visit: SingleVisit = inputs as SingleVisit
        visit.user = id
        visit.visitTime = new Date();
        saveSingleVisit(visit)
            .then(() => {
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }
    const {inputs, handleInputChange, handleSubmit} = useForm(handleSingleVisitOrder)

    const handleSellSub = () => {
        setIsLoading(true);
        let sellSubInfo: SubscriptionSell = inputSellSub.inputs as SubscriptionSell
        sellSubInfo.user = id;
        setIsClientSubsLoading(true);

        sellSub(sellSubInfo)
            .then(() => {
                getUserSubs(id)
                    .then(data => {
                        setClientSubs(data);
                        setIsClientSubsLoading(false);
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setIsClientSubsLoading(false);
                        setIsLoading(false)
                        alert(err);
                    })
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }
    const inputSellSub = useForm(handleSellSub)

    useEffect(() => {
        if (id === undefined) {
            return;
        }
        if (!isLoading) {
            return;
        }
        getClientById(id)
            .then(data => {
                setClient(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }, [id, client, isLoading])

    useEffect(() => {
        getSubTypes()
            .then(data => {
                setSubTypes(data);
                setSubTypesLoading(false);
            })
            .catch(err => {
                setSubTypesLoading(false);
                alert(err);
            })
    }, [isLoading])

    useEffect(() => {
        getSingleVisitTypes()
            .then(data => {
                setSingleVisitTypes(data);
                setSingleVisitTypesLoading(false);
            })
            .catch(err => {
                setSingleVisitTypesLoading(false);
                alert(err);
            })
    }, [isLoading])

    useEffect(() => {
        if (id === undefined) {
            return
        }
        getUserSubs(id)
            .then(data => {
                setClientSubs(data);
                setIsClientSubsLoading(false);
            })
            .catch(err => {
                setIsClientSubsLoading(false);
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

    const typedClient = client as Client
    let dateOfBirth = new Date(typedClient.dateOfBirth)
    let dateOfOrder = new Date(typedClient.created)



    return (<div className={'clientContainer'}>
        <div className={'clientInfo'}>
            <div className={'clientName'}>
                <div>{typedClient.surname} {typedClient.name} {typedClient.lastName}</div>
                {typedClient.isChild &&
                    <a className={'clientRef'} href={`/client/${typedClient.parentId!}`}>Ссылка на родителя</a>
                }
            </div>
            <div className={'clientContacts'}>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}> Номер клиента: &nbsp; </p>  {typedClient.uuid}
                </div>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}> Телефон: &nbsp; </p>  {typedClient.phone}
                </div>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}>Дата рождения: &nbsp; </p>  {dateOfBirth.toLocaleDateString()}
                </div>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}>Номер договора: &nbsp; </p>  {typedClient.orderNumber}
                </div>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}>В клубе с:  &nbsp; </p>  {dateOfOrder.toLocaleDateString()}
                </div>
                <div className={'clientContactInfo'}>
                    <p className={'clientSubTitle'}>Статус:  &nbsp; </p>  {typedClient.isChild?'Ребенок':'Взрослый'}
                </div>
            </div>
            <div className={'mobileArrow'}>
                ↓
            </div>
        </div>

        <hr/>

        <div className={'clientSubs'}>
            {isClientSubsLoading ?
                <div className={'subTypesLoader'}>
                    <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
                </div> :
                clientSubs.length !== 0 ?
                    <div className={'clientSubsContainer'}>
                        {clientSubs.map((sub) => {
                            return <ClientSubCard key={sub._id} sub={sub}/>
                        })}
                    </div> :
                    <div className={'NoSubsTitle'}>
                        Абонементов нет
                    </div>
            }
        </div>


        <hr/>

        <div className={'clientSell'}>

            {isSubTypesLoading ?
                <div className={'subTypesLoader'}>
                    <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
                </div> :
                <div className={'sellSub sellSelect'}>
                    <h2 className={'sellTitle'}>Продажа абонемента</h2>
                    <form className={'selectForm'} onSubmit={inputSellSub.handleSubmit}>
                        <select defaultValue={''} className={'selectInput'} required name="subType" id="subType"
                                onChange={inputSellSub.handleInputChange}>
                            <option value={''} disabled>
                                Выберите тип абонемента
                            </option>
                            {subTypes.map((value: SubType) => {
                                return (<option key={value._id} value={value._id}>
                                    {value.subName}, {value.visitsCount} - {value.cost} ₽
                                </option>)
                            })}
                        </select>
                        <button className={'button sellButton'} type={'submit'}>
                            Оформить абонемент
                        </button>
                    </form>
                </div>
            }

            {isSingleVisitTypesLoading ?
                <div className={'subTypesLoader'}>
                    <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
                </div> :
                <div className={'sellSingleVisit sellSelect'}>
                    <h2 className={'sellTitle'}>Разовое посещение</h2>
                    <form className={'selectForm'} onSubmit={handleSubmit}>
                        <select defaultValue={''} className={'selectInput'} required name="visitType" id="visitType"
                                onChange={handleInputChange}>
                            <option value={''} disabled>
                                Выберите тип посещения
                            </option>
                            {singleVisitTypes.map((value: SingleVisitType) => {
                                return (<option key={value._id} value={value._id}>
                                    {value.visitName} - {value.cost} ₽
                                </option>)
                            })}
                        </select>
                        <button className={'button sellButton'} type={'submit'}>
                            Оформить посещение
                        </button>
                    </form>
                </div>
            }
        </div>
    </div>)
}

export default ClientPage;

