import React, {useEffect} from "react";
import './SearchBar.scss';
import '../../../scss/button.scss';

interface SearchBarProps {
    searchDataUpdater: Function
}

function SearchBar({searchDataUpdater}:SearchBarProps): JSX.Element {

    const handleSearchInput = () => {
        const searchInput = document.getElementById('journalSearch') as HTMLInputElement
        searchDataUpdater(searchInput.value);
    }

    const searchInput = document.getElementById('journalSearch') as HTMLInputElement
    useEffect(() => {
        if (searchInput) {
            searchInput.value = ''
        }
    }, [searchInput])

    return (
        <div className={'journalSearchBar'}>
            <input className={'journalSearch'} id={'journalSearch'} placeholder={'Введите имя клиента или название посещения'}
                   onChange={handleSearchInput}/>
        </div>
    )
}

export default SearchBar

