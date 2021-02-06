import React, {useEffect, useState} from "react";
import './SettingsPage.scss';
import {Link, Redirect} from "react-router-dom";
import '../../scss/button.scss'
import checkAuth from "../../api/utils/checkAuth";

function Settings():JSX.Element {

    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);


    useEffect(() => {
        checkAuth()
            .catch(() => {
                setLoginRedirect(true);
            })
    }, [])

    if (loginRedirect) {
        return <Redirect to={'/login'}/>
    }

    return (<div className={'settingsWrapper'}>
        <Link className={'button addButton'} to={'/addSubType'}>
            Создать новый абонемент
        </Link>
        <Link className={'button addButton'} to={'/addSingleVisitType'}>
            Создать новый тип посещения
        </Link>
        <Link className={'button addButton'} to={'/addAccount'}>
            Создать новый аккаунт
        </Link>
        <Link className={'button addButton'} to={'/subsAndSingleVisits'}>
            Абонементы и типы посещений
        </Link>
        <Link className={'button addButton'} to={'/accounts'}>
            Аккаунты
        </Link>
    </div>);
}

export default Settings;
