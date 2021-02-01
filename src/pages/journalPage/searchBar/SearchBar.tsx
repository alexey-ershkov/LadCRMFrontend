import React, {useEffect} from "react";
import './SearchBar.scss';
import '../../../scss/button.scss';

interface SearchBarProps {
    searchDataUpdater: Function
}

function SearchBar({searchDataUpdater}:SearchBarProps): JSX.Element {

    const handleSearchInput = () => {
        const searchInput = document.getElementById('search') as HTMLInputElement
        searchDataUpdater(searchInput.value);
    }

    const searchInput = document.getElementById('search') as HTMLInputElement
    useEffect(() => {
        if (searchInput) {
            searchInput.value = ''
        }
    }, [searchInput])

    return (
        <div className={'journalSearchBar'}>
            <input className={'search'} id={'search'} placeholder={'Введите имя клиента или название посещения'}
                   onChange={handleSearchInput}/>
        </div>
    )
}

export default SearchBar

