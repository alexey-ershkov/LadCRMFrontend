import React, {useEffect} from "react";
import './SearchBar.scss';
import '../../../scss/button.scss'
import {Link} from "react-router-dom";
import getClients from "../../../api/client/getClients";
import searchSubs from "../../../api/sub/searchSubs";
import searchClients from "../../../api/client/searchClients";

interface SearchBarProps {
    clientsUpdater: Function,
    subsUpdater: Function,
    isSubsChanger: Function
}

function SearchBar({clientsUpdater, subsUpdater, isSubsChanger}: SearchBarProps): JSX.Element {


    const searchInput = document.getElementById('search') as HTMLInputElement
    const handleSearchInput = () => {
        if (searchInput.value === '') {
            getClients()
                .then(data => {
                    isSubsChanger(false);
                    clientsUpdater(data);
                })
                .catch(err => {
                    alert(err);
                })
            return
        }

        if (isNaN(Number(searchInput.value))) {
            searchClients(searchInput.value)
                .then(data => {
                    isSubsChanger(false);
                    clientsUpdater(data);
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            searchSubs(searchInput.value)
                .then(data => {
                    isSubsChanger(true);
                    subsUpdater(data);
                })
                .catch(err => {
                    alert(err);
                })
        }
    }

    useEffect(() => {
        if (searchInput) {
            searchInput.value = ''
        }
    }, [searchInput])

    return (
        <div className={'searchBar'}>
            <input className={'search'} id={'search'} placeholder={'Введите номер абонемента или ФИО'}
                   onChange={handleSearchInput}/>
            <Link className={'button addClientButton'} to={'addClient'}>
                Добавить клиента
            </Link>
        </div>
    )
}

export default SearchBar

