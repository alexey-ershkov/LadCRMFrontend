import React, {useEffect, useRef} from "react";
import './SearchBar.scss';
import '../../../scss/button.scss'
import {Link} from "react-router-dom";
import getClients from "../../../api/client/getClients";
import searchClients from "../../../api/client/searchClients";
import searchClientsByUuid from "../../../api/client/searchByUuid";

interface SearchBarProps {
    clientsUpdater: Function,
    isSubsChanger: Function
}

function SearchBar({clientsUpdater,  isSubsChanger}: SearchBarProps): JSX.Element {

    const searchInputRef = useRef<HTMLInputElement>(null);

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
            searchClientsByUuid(searchInput.value)
                .then(data => {
                    isSubsChanger(true);
                    clientsUpdater(data);
                })
                .catch(err => {
                    alert(err);
                })
        }
    }

    useEffect(() => {
        if (searchInput) {
            searchInput.value = ''
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }
    }, [searchInput])

    return (
        <div className={'searchBar'}>
            <input className={'search'} id={'search'}
                   ref={searchInputRef}
                   placeholder={'Введите номер абонемента или ФИО'}
                   onChange={handleSearchInput}/>
            <Link className={'button addClientButton'} to={'addClient'}>
                Добавить клиента
            </Link>
        </div>
    )
}

export default SearchBar

