import React, {useState} from "react";
import './loginPage.scss';
import useForm from "../../hooks/useForm";
import Account from "../../models/account";
import Login from "../../api/account/login";
import {Redirect} from "react-router-dom";

export default function LoginPage():JSX.Element {

    const [isRedirect, setRedirect] = useState<boolean>(false);

    const handleLoginCallback = () => {
        Login(loginModel)
            .then((status) => {
                if (status === 200) {
                    setRedirect(true);
                } else {
                    alert('Неверный логин и/или пароль')
                }
            })
            .catch(() => {
                alert('упс... что-то пошло не так')
            })
    }
    const {inputs, handleInputChange, handleSubmit} = useForm(handleLoginCallback);

    if (isRedirect) {
        return <Redirect to={'/'}/>
    }


    const loginModel = inputs as Account

    return (<div className={'addSingleVisitWrapper'}>
        <form id={'addAccount'} className={'form addSingleVisitForm'} onSubmit={handleSubmit}>
            <div className={`inputSection inputSectionAddSingleVisit`}>
                <label htmlFor="login" className={'label'}>
                    Логин
                </label>

                <input type={'text'}
                       id={'login'}
                       name={'login'}
                       className={'input'}
                       placeholder={'Введите логин'}
                       required
                       onChange={handleInputChange}
                />

            </div>
            <div className={`inputSection inputSectionAddSingleVisit`}>
                <label htmlFor="password" className={'label'}>
                    Пароль
                </label>
                <input type={'password'}
                       id={'password'}
                       name={'password'}
                       className={'input'}
                       minLength={5}
                       autoComplete={"on"}
                       placeholder={'Введите пароль'}
                       required
                       onChange={handleInputChange}
                />
            </div>
            <button className={'button addSingleVisitButton'}>
                {"Войти"}
            </button>
        </form>
    </div>)
}
