import React from "react";
import './AddClientPage.scss';
import '../scss/button.scss'
import '../scss/form.scss';
import useForm from "../customHooks/useForm";
import Client from "../models/client";
import saveClient from "../api/client/saveClient";


const today = new Date().toISOString().split("T")[0];


function AddClientPage(): JSX.Element {

    const handleConfirm = () => {
        saveClient(addUserModel)
    }

    let {inputs, handleSubmit, handleInputChange} = useForm(handleConfirm)
    let addUserModel = inputs as Client

    return (<div className={'clientFormContainer'}>
        <form className={'form addClientForm'} onSubmit={handleSubmit}>

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
