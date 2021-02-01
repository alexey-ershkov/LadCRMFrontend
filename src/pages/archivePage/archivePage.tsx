import React, {useEffect, useState} from "react";
import './archivePage.scss';
import Subscription from "../../models/subscription";
import getArchive from "../../api/sub/getArchive";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import SubCard from "../../includes/subCard/SubCard";
import {Redirect} from "react-router-dom";
import ReactPaginate from "react-paginate";

interface BackendData {
    pages: number,
    archived: Array<Subscription>
}

function ArchivePage(): JSX.Element {
    const [pageCount, setPageCount] = useState<number>(1);
    const [currPage, setCurrPage] = useState<number>(1);
    const [archive, setArchive] = useState<Array<Subscription>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loginRedirect, setLoginRedirect] = useState<boolean>(false);

    useEffect(() => {
        getArchive(currPage)
            .then((data: BackendData) => {
                setArchive(data.archived);
                setPageCount(data.pages);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                setLoginRedirect(true);
            })
    }, [currPage])

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

    const handlePageClick = (data: { selected: number; }) => {
        setCurrPage(data.selected + 1);
    };

    return (<div className={'archiveContainer'}>
        <div className={'archiveCardContainer'}>
            <div className={'innerArchiveCardContainer'}>
                {archive.map((archiveElem: Subscription) => {
                    return <SubCard key={archiveElem._id} sub={archiveElem}/>
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

export default ArchivePage;
