import React, {useEffect, useState} from "react";
import './archivePage.scss';
import Subscription from "../../models/subscription";
import getArchive from "../../api/sub/getArchive";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";
import SubCard from "../../includes/subCard/SubCard";

function ArchivePage():JSX.Element {
    const [archive, setArchive] = useState<Array<Subscription>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getArchive()
            .then(data => {
                setArchive(data);
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

    return (<div className={'archiveContainer'}>
        {archive.map((archiveElem: Subscription) => {
            return <SubCard key={archiveElem._id} sub={archiveElem}/>
        })}
    </div>)
}

export default ArchivePage;