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

    let {id} = useParams<params>();

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
                {typedClient.surname} {typedClient.name} {typedClient.lastName}
            </div>
            <div className={'clientContacts'}>
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
                    <p className={'clientSubTitle'}>В системе с:  &nbsp; </p>  {dateOfOrder.toLocaleDateString()}
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
                    {/*<PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>*/}
                </div> :
                <div>

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
                    <form className={'selectForm'} >
                        <select className={'selectInput'} required name="subName" id="subName">
                            <option selected disabled>
                                Выберите тип абонемента
                            </option>
                            {subTypes.map((value:SubType) => {
                                return (<option value={value._id}>
                                    {value.subName} - {value.cost} ₽
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
                    <form  className={'selectForm'}>
                        <select className={'selectInput'} required name="subName" id="singleVisitName">
                            <option selected disabled>
                                Выберите тип абонемента
                            </option>
                            {singleVisitTypes.map((value:SingleVisitType) => {
                                return (<option value={value._id}>
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

