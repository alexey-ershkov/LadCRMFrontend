import React, {useState} from "react";
import './AddClientPage.scss';
import '../../scss/button.scss'
import '../../scss/form.scss';
import useForm from "../../hooks/useForm";
import Client from "../../models/client";
import saveClient from "../../api/client/saveClient";
import {Redirect} from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import consts from "../../consts";

const today = new Date().toISOString().split("T")[0];


function AddClientPage(): JSX.Element {
    const handleConfirm = () => {
        setLoading(true)
        const created = document.getElementById('created') as HTMLInputElement;
        addClientModel.created = new Date (created.value);
        let form = document.getElementById('addClientForm') as HTMLFormElement;
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

    return (<div className={'clientFormContainer'}>
        <form id={'addClientForm'} className={'form addClientForm'} onSubmit={handleSubmit}>
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
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'phone'}>
                    {'Телефон'}
                </label>
                <input className={`input addClientInput`}
                       name={'phone'}
                       id={'phone'}
                       type={'phone'}
                       placeholder={'+7 910 777 77 77'}
                       required onChange={handleInputChange}/>
            </div>
            <div className={`inputSection inputSectionAddClient`}>
                <label className={`label addClientLabel`} htmlFor={'orderNumber'}>
                    {'Номер договора'}
                </label>
                <input className={`input addClientInput`}
                       name={'orderNumber'}
                       id={'orderNumber'}
                       type={'number'}
                       placeholder={'1341247'}
                       required onChange={handleInputChange}/>
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
                       defaultValue={today}
                       required onChange={handleInputChange}/>
            </div>
            <button className={'button addClientFormButton'}>Добавить клиента</button>
        </form>
    </div>)
}

export default AddClientPage;
