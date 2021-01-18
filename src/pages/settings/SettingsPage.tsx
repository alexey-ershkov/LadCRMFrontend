import React from "react";
import './SettingsPage.scss';
import {Link} from "react-router-dom";
import '../../scss/button.scss'

function Settings():JSX.Element {
    return (<div className={'settingsWrapper'}>
        <Link className={'button addSubButton'} to={'/addSub'}>
            Создать новый абонемент
        </Link>
    </div>);
}

export default Settings;
