import React, {useEffect, useRef} from "react";
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

    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [])


    return (
        <div className={'journalSearchBar'}>
            <input className={'journalSearch'} id={'journalSearch'}
                   ref={searchInputRef}
                   placeholder={'Введите имя клиента или название посещения'}
                   onChange={handleSearchInput}/>
        </div>
    )
}

export default SearchBar

