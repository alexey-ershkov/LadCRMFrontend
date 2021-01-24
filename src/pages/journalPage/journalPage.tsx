import React, {useEffect, useState} from "react";
import './journalPage.scss';
import Journal from "../../models/journal";
import getJournal from "../../api/journal/getJournal";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import JournalCard from "../../includes/journalCard/journalCard";

function JournalPage():JSX.Element {

    const[journal, setJournal] = useState<Array<Journal>>([])
    const[isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getJournal()
            .then(data => {
                setJournal(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }, [])

    if (isLoading) {
        return (
            <div className={'loadIndicator'}>
                <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
            </div>
        )
    }

    return (<div className={'journalContainer'}>
        {journal.map((journalElem:Journal) => {
            return <JournalCard key={journalElem._id} elem={journalElem}/>
        })}
    </div>)
}

export default JournalPage;
