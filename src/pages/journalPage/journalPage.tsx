import React, {useEffect, useState} from "react";
import './journalPage.scss';
import Journal from "../../models/journal";
import getJournal from "../../api/journal/getJournal";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import JournalCard from "../../includes/journalCard/journalCard";
import SearchBar from "./searchBar/SearchBar";
import ReactPaginate from 'react-paginate';
import journalSearch from "../../api/journal/journalSearch";
import {Redirect} from "react-router-dom";

interface BackendData {
    pages: number,
    journal: Array<Journal>
}

interface BackendSearchData {
    pages: number,
    found: Array<Journal>
}

function JournalPage(): JSX.Element {

    const [pageCount, setPageCount] = useState<number>(1);
    const [currPage, setCurrPage] = useState<number>(1);
    const [journal, setJournal] = useState<Array<Journal>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<string>('');
    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);

    useEffect(() => {
        if (searchData === '') {
            getJournal(currPage)
                .then((data: BackendData) => {
                    setJournal(data.journal);
                    setPageCount(data.pages);
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsLoading(false);
                    setLoginRedirect(true);
                })
        } else {
            journalSearch(searchData, currPage)
                .then((data: BackendSearchData) => {
                    setJournal(data.found);
                    setPageCount(data.pages);
                    console.log(data.pages, currPage)
                    if (currPage > pageCount) {
                        setCurrPage(1);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsLoading(false);
                    setLoginRedirect(true);
                })
        }
    }, [currPage, searchData, pageCount])

    if (isLoading) {
        return (
            <div className={'loadIndicator'}>
                <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
            </div>
        )
    }
    if (loginRedirect) {
        return <Redirect to={'/login'}/>
    }

    if (journal.length === 0) {
        return (<div className={'journalContainer'}>
            <SearchBar searchDataUpdater={setSearchData}/>
            <div className={'notFoundTitle'}>
                Ничего не найдено
            </div>
        </div>)
    }

    const handlePageClick = (data: { selected: number; }) => {
        setCurrPage(data.selected + 1);
    };

    return (<div className={'journalContainer'}>
        <SearchBar searchDataUpdater={setSearchData}/>
        <div className={'journalCardContainer'}>
            <div className={'innerJournalCardContainer'}>
                {journal.map((journalElem: Journal) => {
                    return <JournalCard key={journalElem._id} elem={journalElem} updater={setJournal}
                                        pageUpdater={setPageCount}/>
                })}
            </div>
        </div>
        <ReactPaginate breakLabel={'...'}
                       breakClassName={'break-me'}
                       pageCount={pageCount}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={5}
                       onPageChange={handlePageClick}
                       containerClassName={'pagination'}
                       activeClassName={'active'}/>
    </div>)
}

export default JournalPage;
