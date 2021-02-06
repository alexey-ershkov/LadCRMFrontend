import React, {ChangeEvent, useEffect, useState} from "react";
import './AddClientPage.scss';
import '../../scss/button.scss'
import '../../scss/form.scss';
import useForm from "../../hooks/useForm";
import Client from "../../models/client";
import saveClient from "../../api/client/saveClient";
import {Redirect, useHistory} from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import consts from "../../consts";
import checkClientUuid from "../../api/client/checkUuid";
import getClientById from "../../api/client/getClientById";
import addChild from "../../api/client/addChild";
import checkAuth from "../../api/utils/checkAuth";

const today = new Date().toISOString().split("T")[0];


function AddClientPage(): JSX.Element {
    const [isChild, setIsChild] = useState<boolean>(false)
    const [isClientUuidExists, setIsClientUuidExists] = useState<boolean>(false);
    const [isParentUuidExists, setIsParentUuidExists] = useState<boolean>(false);
    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);
    const [parentInfo, setParentInfo] = useState<Client | undefined>(undefined);
    const [parentRedirect, setParentRedirect] = useState<string|undefined>(undefined);


    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    let parentId = params.get('addChildTo');

    useEffect(() => {
        if (parentId) {
            getClientById(parentId)
                .then(data => {
                    setParentInfo(data);
                    setIsChild(true);
                })
                .catch(() => {
                    setLoginRedirect(true);
                })
        }
    }, [parentId])

    useEffect(() => {
        checkAuth()
            .catch(() => {
                setLoginRedirect(true);
            })
    }, [])


    const handleCheck = () => {
        setIsChild(!isChild);
    }
    const handleClientUuid = (event: ChangeEvent) => {
        handleInputChange(event);
        const target = event.target as HTMLInputElement;
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

    const handleParentUuid = (event: ChangeEvent) => {
        handleInputChange(event);
        const target = event.target as HTMLInputElement;
        if (target.value !== '') {
            checkClientUuid(target.value)
                .then(data => {
                    setIsParentUuidExists(data.exists);
                })
                .catch(err => {
                    setLoginRedirect(true);
                });
        }
    }

    const handleConfirm = () => {
        if (isParentUuidExists || isClientUuidExists) {
            alert('Введите уникальный номер для клиента');
            return;
        }
        setLoading(true);

        const created = document.getElementById('created') as HTMLInputElement;
        addClientModel.created = new Date(created.value);
        addClientModel.isChild = isChild;
        addClientModel.uuidStr = String(addClientModel.uuid);
        let form = document.getElementById('addClientForm') as HTMLFormElement;

        if (parentInfo) {
            if (!addClientModel.phone) {
                addClientModel.phone = parentInfo.phone;
            }
            if (!addClientModel.orderNumber) {
                addClientModel.orderNumber = parentInfo.orderNumber;
            }
            addClientModel.parentId = parentId!;
            addChild(addClientModel)
                .then(id => {
                    setParentRedirect(id);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    alert(err);
                })
        } else {

            if (addClientModel.isChild) {
                addClientModel.parentUuidStr = String(addClientModel.parentUuid);
            }

            saveClient(addClientModel)
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
    }

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    let {inputs, handleSubmit, handleInputChange} = useForm(handleConfirm)
    let addClientModel = inputs as Client

    if (loading) {
        return (<div className={'loadIndicator'}>
            <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
        </div>)
    }

    if (redirect) {
        return (<Redirect to={'/'}/>)
    }

    if (loginRedirect) {
        return <Redirect to={'/login'}/>
    }

    if (parentRedirect) {
        return <Redirect to={`/client/${parentRedirect}`}/>
    }

    let formStatus = !isChild ? 'addClientForm' : 'addClientWithChildForm';

    let labelClientClass = isClientUuidExists ? 'label-alert' : 'label';
    let inputClientClass = isClientUuidExists ? 'input-alert' : 'input';
    let labelParentClass = isParentUuidExists && !parentInfo ? 'label-alert' : 'label';
    let inputParentClass = isParentUuidExists && !parentInfo ? 'input-alert' : 'input';

    let parentDateOfBirth = new Date();
    let createdDate = new Date();
    if (parentInfo) {
        parentDateOfBirth = new Date(parentInfo.dateOfBirth);
        createdDate = new Date(parentInfo.created);
    }

    return (<div className={'clientFormContainer'}>
        <form id={'addClientForm'} className={`${formStatus} form`} onSubmit={handleSubmit}>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'surname'}>
                    {'Фамилия'}
                </label>
                <input className={`input addClientInput`}
                       name={'surname'}
                       id={'surname'}
                       type={'text'}
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
                       max={today}
                       required onChange={handleInputChange}/>
            </div>
            <div className={'inputSectionCheckBox'}>
                <input type="checkbox"
                       name={'isChild'}
                       id={'isChild'}
                       checked={isChild}
                       onChange={handleCheck}
                />
                <label htmlFor="subName" className={'checkBoxLabel'}>
                    Ребенок
                </label>
            </div>
            {isChild &&
            <div>
                <div className={`inputSection inputSectionAddClient`}>
                    <label className={`label addClientLabel`} htmlFor={'surname'}>
                        {'Фамилия родителя'}
                    </label>
                    <input className={`input addClientInput`}
                           name={'parentSurname'}
                           id={'parentSurname'}
                           type={'text'}
                           defaultValue={parentInfo ? parentInfo.surname : ''}
                           placeholder={'Введите фамилию'}
                           required onChange={handleInputChange}/>
                </div>
                <div className={`inputSection inputSectionAddClient`}>
                    <label className={`label addClientLabel`} htmlFor={'name'}>
                        {'Имя родителя'}
                    </label>
                    <input className={`input addClientInput`}
                           name={'parentName'}
                           id={'parentName'}
                           type={'text'}
                           defaultValue={parentInfo ? parentInfo.name : ''}
                           placeholder={'Введите имя'}
                           required onChange={handleInputChange}/>
                </div>
                <div className={`inputSection inputSectionAddClient`}>
                    <label className={`label addClientLabel`} htmlFor={'lastName'}>
                        {'Отчество родителя'}
                    </label>
                    <input className={`input addClientInput`}
                           name={'parentLastName'}
                           id={'parentLastName'}
                           type={'text'}
                           defaultValue={parentInfo ? parentInfo.lastName : ''}
                           placeholder={'Введите отчество'}
                           required onChange={handleInputChange}/>
                </div>
                <div className={`inputSection inputSectionAddClient`}>
                    <label className={`label addClientLabel`} htmlFor={'dateOfBirth'}>
                        {'Дата рождения родителя'}
                    </label>
                    <input className={`input addClientInput`}
                           name={'parentDateOfBirth'}
                           id={'parentDateOfBirth'}
                           defaultValue={parentInfo ? parentDateOfBirth.toISOString().substr(0, 10) : ''}
                           type={'date'}
                           max={today}
                           required onChange={handleInputChange}/>
                </div>
                <div className={`inputSection inputSectionAddClient`}>
                    <label className={`${labelParentClass} addClientLabel`} htmlFor={'parentUuid'}>
                        {isParentUuidExists && !parentInfo ? 'Такой номер уже существует' : 'Номер родителя'}
                    </label>
                    <input className={`${inputParentClass} addClientInput`}
                           name={'parentUuid'}
                           id={'parentUuid'}
                           defaultValue={parentInfo ? parentInfo.uuid : ''}
                           type={'number'}
                           placeholder={'1234567'}
                           required onChange={handleParentUuid}/>
                </div>
            </div>
            }

            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'phone'}>
                    {'Телефон'}
                </label>
                <input className={`input addClientInput`}
                       name={'phone'}
                       id={'phone'}
                       type={'phone'}
                       placeholder={'+7 910 777 77 77'}
                       defaultValue={parentInfo ? parentInfo.phone : ''}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'orderNumber'}>
                    {'Номер договора'}
                </label>
                <input className={`input addClientInput`}
                       name={'orderNumber'}
                       id={'orderNumber'}
                       type={'text'}
                       placeholder={'1341247'}
                       defaultValue={parentInfo ? parentInfo.orderNumber : ''}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`${labelClientClass} addClientLabel`} htmlFor={'uuid'}>
                    {!isClientUuidExists ? !isChild ? 'Номер клиента' : 'Номер ребенка' : 'Такой номер уже существует'}
                </label>
                <input className={`${inputClientClass} addClientInput`}
                       name={'uuid'}
                       id={'uuid'}
                       type={'number'}
                       placeholder={'1234567'}
                       required onChange={handleClientUuid}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'created'}>
                    {'Дата оформления договора'}
                </label>
                <input className={`input addClientInput`}
                       name={'created'}
                       id={'created'}
                       type={'date'}
                       max={today}
                       defaultValue={parentInfo ? createdDate.toISOString().substr(0, 10) : today}
                       required onChange={handleInputChange}/>
            </div>
            <button className={'button addClientFormButton'}>Добавить клиента</button>
        </form>
    </div>)
}

export default AddClientPage;
