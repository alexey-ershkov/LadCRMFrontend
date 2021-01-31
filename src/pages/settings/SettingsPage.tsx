import React from "react";
import './SettingsPage.scss';
import {Link} from "react-router-dom";
import '../../scss/button.scss'

function Settings():JSX.Element {
    return (<div className={'settingsWrapper'}>
        <Link className={'button addButton'} to={'/addSubType'}>
            Создать новый абонемент
        </Link>
        <Link className={'button addButton'} to={'/addSingleVisitType'}>
            Создать новый тип посещения
        </Link>
        <Link className={'button addButton'} to={'/modifySubsAndSingleVisits'}>
            Изменить абонементы и типы посещений
        </Link>
    </div>);
}

export default Settings;
