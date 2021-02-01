import React, {useEffect, useState} from "react";
import './ModifySubsAndSingleVisitsPage.scss';
import SubType from "../../models/subType";
import getSubTypes from "../../api/sub/getSubTypes";
import SingleVisitType from "../../models/singleVisitType";
import getSingleVisitTypes from "../../api/singleVisit/getSingleVisitTypes";
import ModifyCard from "./modifyCard/modifyCard";

export default function ModifySubsAndSingleVisitsPage():JSX.Element {

    const [types, setTypes] = useState<Array<SubType & SingleVisitType>>([]);


    useEffect(() => {
        const subs = getSubTypes();
        const visits = getSingleVisitTypes();
        Promise.all([subs, visits])
            .then(promiseArr => {
                setTypes([...promiseArr[0], ...promiseArr[1]])
            })
            .catch(err => {
                alert(err)
            })
    }, [])

    return (<div className={'modifyContainer'}>
        {types.map((value) => {
            return <ModifyCard updater={setTypes} key={value._id} type={value}/>
        })}
    </div>)
}
