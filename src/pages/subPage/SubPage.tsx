import React, {useState, useEffect} from "react";
import './SubPage.scss';
import Subscription from "../../models/subscription";
import {useParams} from "react-router-dom";
import getSubInfo from "../../api/sub/getSubInfo";
import PulseLoader from "react-spinners/PulseLoader";
import consts from "../../consts";

interface params {
    id: string
}

function SubPage():JSX.Element {
    const [subInfo, setSubInfo] = useState<Subscription | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams<params>();

    useEffect(() => {
        if (id === undefined) {
            return
        }

        getSubInfo(id)
            .then(data => {
                setSubInfo(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
            })
    }, [id])


    if (isLoading) {
        return (
            <div className={'loadIndicator'}>
                <PulseLoader color={consts.ACCENT_COLOR_HEX} loading={true}/>
            </div>
        )
    }

    if (subInfo !== undefined) {
        return (<div className={'clientContainer'}>
            <div className={'subscriptionInfo'}>
                <div className={'subscriptionName'}>
                    {subInfo.subInfo.subName}
                </div>
                <div className={'subscriptionAdditionalInfo'}>
                    <div className={'subscriptionFrom'}>

                    </div>
                    <div className={'subscriptionTo'}>

                    </div>
                    
                </div>
            </div>
            <div className={'subscriptionClientInfo'}>

            </div>
            <form className={'regVisit'}>
                <button className={'button regVisitButton'}>
                    Зарегистрировать посещение по абонементу
                </button>
            </form>
        </div>)
    }

    return (<div>
        Inner error
    </div>)
}

export default SubPage;
