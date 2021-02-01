import React, {useEffect, useState} from "react";
import './addAccountPage.scss';
import {Redirect, useHistory} from "react-router-dom";
import useForm from "../../hooks/useForm";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import saveAccount from "../../api/account/saveAcoount";
import getAccountById from "../../api/account/getAccountById";
import Account from "../../models/account";

export default function AddAccountPage():JSX.Element {
    const [loading, setLoading] = useState(false)
    let history = useHistory()
    let params = new URLSearchParams(history.location.search)
    let modifyId = params.get('modify');


    const [loginInfo, setLoginInfo] = useState<Account|undefined>(undefined);

    useEffect(() => {
        if (modifyId) {
            setLoading(true);
            getAccountById(modifyId)
                .then(data => {
                    setLoginInfo(data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    alert(err);
                })
        }
    }, [modifyId])





    const [redirect, setRedirect] = useState(false)


    const handleCallback = () => {
        let form = document.getElementById('addAccount') as HTMLFormElement;

        if (!loginModel.login && loginInfo) {
            loginModel.login = loginInfo.login;
        }
        if (!loginModel.password && loginInfo) {
            loginModel.password = loginInfo.password;
        }
        if (!loginModel._id && loginInfo) {
            loginModel._id = loginInfo._id;
        }

        saveAccount(loginModel)
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

    let {inputs, handleSubmit, handleInputChange} = useForm(handleCallback)
    let loginModel = inputs as Account


    if (loading) {
        return (<div className={'loadIndicator'}>
            <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
        </div>)
    }

    if (redirect) {
        return (<Redirect to={'/accounts'}/>)
    }

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
                       defaultValue={loginInfo ? loginInfo.login : ''}
                       onChange={handleInputChange}
                />

            </div>
            <div className={`inputSection inputSectionAddSingleVisit`}>
                <label htmlFor="password" className={'label'}>
                    Пароль
                </label>
                <input type={'text'}
                       id={'password'}
                       name={'password'}
                       className={'input'}
                       minLength={5}
                       placeholder={'Введите пароль'}
                       required
                       defaultValue={loginInfo ? loginInfo.password : ''}
                       onChange={handleInputChange}
                />
            </div>
            <button className={'button addSingleVisitButton'}>
                {modifyId ? "Обновить аккаунт" : "Создать аккаунт"}
            </button>
        </form>
    </div>)
}
