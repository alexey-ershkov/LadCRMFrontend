import React, {ChangeEvent, useEffect, useState} from "react";
import './ModifyClientInfoPage.scss';
import checkClientUuid from "../../api/client/checkUuid";
import useForm from "../../hooks/useForm";
import Client from "../../models/client";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import {Redirect, Link, useParams} from "react-router-dom";
import getClientById from "../../api/client/getClientById";
import modifyClient from "../../api/client/modifyClient";


interface params {
    modifyId: string
}

export default function ModifyClientInfoPage(): JSX.Element {
    const today = new Date().toISOString().split("T")[0];

    const [clientInfo, setClientInfo] = useState<Client | undefined>(undefined);
    const [isClientUuidExists, setIsClientUuidExists] = useState<boolean>(false);
    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);

    let {modifyId} = useParams<params>();


    useEffect(() => {
        if (modifyId) {
            getClientById(modifyId)
                .then(data => {
                    setLoading(false);
                    setClientInfo(data);
                })
                .catch(err => {
                    setLoading(false);
                    setLoginRedirect(true);
                })
        }
    }, [modifyId])

    const handleClientUuid = (event: ChangeEvent) => {
        handleInputChange(event);
        const target = event.target as HTMLInputElement;
        if (clientInfo && target.value === clientInfo.uuidStr) {
            return;
        }
        if (target.value !== '') {
            checkClientUuid(target.value)
                .then(data => {
                    setIsClientUuidExists(data.exists);
                })
                .catch(err => {
                    setLoginRedirect(true);
                });
        }
    }


    const handleConfirm = () => {
        if (isClientUuidExists) {
            alert('Введите уникальный номер для клиента');
            return;
        }
        setLoading(true);

        if (!clientInfo) {
            return;
        }

        if (!modifyClientModel._id) {
            modifyClientModel._id = clientInfo._id;
        }
        if (!modifyClientModel.name) {
            modifyClientModel.name = clientInfo.name;
        }
        if (!modifyClientModel.surname) {
            modifyClientModel.surname = clientInfo.surname;
        }
        if (!modifyClientModel.lastName) {
            modifyClientModel.lastName = clientInfo.lastName;
        }
        if (!modifyClientModel.dateOfBirth) {
            modifyClientModel.dateOfBirth = clientInfo.dateOfBirth;
        }
        if (!modifyClientModel.phone) {
            modifyClientModel.phone = clientInfo.phone;
        }
        if (!modifyClientModel.uuid) {
            modifyClientModel.uuid = clientInfo.uuid;
        }
        if (!modifyClientModel.orderNumber) {
            modifyClientModel.orderNumber = clientInfo.orderNumber;
        }

        modifyClientModel.uuidStr = String(modifyClientModel.uuid);

        let form = document.getElementById('addClientForm') as HTMLFormElement;
        modifyClient(modifyClientModel)
            .then(() => {
                setLoading(false)
                setRedirect(true)
                form.reset();
            })
            .catch(err => {
                setLoading(false)
                alert(err)
            })
    }

    let dateOfBirth: string = '';

    if (clientInfo) {
        dateOfBirth = new Date(clientInfo.dateOfBirth).toISOString().substr(0, 10);
    }

    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false)
    let {inputs, handleSubmit, handleInputChange} = useForm(handleConfirm)
    let modifyClientModel = inputs as Client

    if (loading) {
        return (<div className={'loadIndicator'}>
            <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
        </div>)
    }

    if (redirect) {
        if (clientInfo) {
            return (<Redirect to={`/client/${clientInfo._id}`}/>)
        } else {
            return (<Redirect to={'/'}/>)
        }
    }

    if (loginRedirect) {
        return <Redirect to={'/login'}/>
    }

    let labelClientClass = isClientUuidExists ? 'label-alert' : 'label';
    let inputClientClass = isClientUuidExists ? 'input-alert' : 'input';

    return (<div className={'clientFormContainer'}>
        <form id={'addClientForm'} className={`modifyClientForm form`} onSubmit={handleSubmit}>
            {clientInfo && clientInfo.isChild &&
            <div className={'childContainer'}>
                <p className={'childTitle'}>Профиль ребенка</p>
                <Link className={'button parentModifyButton'} to={`/modifyClient/${clientInfo?.parentId}`}>Изменить данные родителя</Link>
            </div>
            }
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'surname'}>
                    {'Фамилия'}
                </label>
                <input className={`input addClientInput`}
                       name={'surname'}
                       id={'surname'}
                       type={'text'}
                       defaultValue={clientInfo ? clientInfo.surname : ''}
                       placeholder={'Введите фамилию'}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'name'}>
                    {'Имя'}
                </label>
                <input className={`input addClientInput`}
                       name={'name'}
                       id={'name'}
                       type={'text'}
                       defaultValue={clientInfo ? clientInfo.name : ''}
                       placeholder={'Введите имя'}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'lastName'}>
                    {'Отчество'}
                </label>
                <input className={`input addClientInput`}
                       name={'lastName'}
                       id={'lastName'}
                       type={'text'}
                       defaultValue={clientInfo ? clientInfo.lastName : ''}
                       placeholder={'Введите отчество'}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'dateOfBirth'}>
                    {'Дата рождения'}
                </label>
                <input className={`input addClientInput`}
                       name={'dateOfBirth'}
                       id={'dateOfBirth'}
                       type={'date'}
                       defaultValue={dateOfBirth && dateOfBirth}
                       max={today}
                       required onChange={handleInputChange}/>
            </div>

            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'phone'}>
                    {'Телефон'}
                </label>
                <input className={`input addClientInput`}
                       name={'phone'}
                       id={'phone'}
                       type={'phone'}
                       defaultValue={clientInfo ? clientInfo.phone : ''}
                       placeholder={'+7 910 777 77 77'}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`${labelClientClass} addClientLabel`} htmlFor={'uuid'}>
                    {!isClientUuidExists ? 'Номер клиента' : 'Такой номер уже существует'}
                </label>
                <input className={`${inputClientClass} addClientInput`}
                       name={'uuid'}
                       id={'uuid'}
                       type={'number'}
                       defaultValue={clientInfo ? clientInfo.uuid : ''}
                       placeholder={'1234567'}
                       required onChange={handleClientUuid}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'orderNumber'}>
                    {'Номер договора'}
                </label>
                <input className={`input addClientInput`}
                       name={'orderNumber'}
                       id={'orderNumber'}
                       type={'text'}
                       defaultValue={clientInfo ? clientInfo.orderNumber : ''}
                       placeholder={'1341247'}
                       required onChange={handleInputChange}/>
            </div>
            <button className={'button addClientFormButton'}>Изменть данные клиента</button>
        </form>
    </div>)
}



