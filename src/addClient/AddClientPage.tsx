import React from "react";
import './AddClientPage.scss';
import '../scss/button.scss'
import '../scss/form.scss'
import createFormInput from "../utils/createFormInput";

const inputClassName = 'addClientInput'
const labelClassName = 'addClientLabel'
const sectionClassName = 'inputSectionAddClient'

function AddClientPage(): JSX.Element {
    return (<div className={'clientFormContainer'}>
        <form className={'form addClientForm'}>
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName}, 'name', 'text', 'Имя', 'Введите имя')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'surname', 'text', 'Фамилия', 'Введите фамилию')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'lastName', 'text', 'Отчество', 'Введите отчество')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'dateOfBirth', 'date', 'Дата рождения')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'phone', 'phone', 'Телефон', '+7 910 777 77 77')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'order', 'number', 'Номер договора', '1341247')}
            {createFormInput({inputClassName,
                labelClassName,
                sectionClassName},'created', 'date',
                'Дата оформления договора', '', true)}

            <button className={'button addClientFormButton'}>Добавить клиента</button>
        </form>
    </div>)
}

export default AddClientPage;
