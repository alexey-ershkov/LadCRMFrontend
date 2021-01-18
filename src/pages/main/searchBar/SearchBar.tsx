import React from "react";
import './SearchBar.scss';
import '../../../scss/button.scss'
import {Link} from "react-router-dom";

function SearchBar():JSX.Element {
    return (
        <div className={'searchBar'}>
            <input className={'search'} placeholder={'Введите номер абонемента или ФИО'}/>
            <Link className={'button addClientButton'} to={'addClient'}>
                Добавить клиента
            </Link>
        </div>
    )
}

export default SearchBar

