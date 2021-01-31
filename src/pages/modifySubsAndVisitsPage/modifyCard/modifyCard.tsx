import React from "react";
import './modifyCard.scss';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";
import SubType from "../../../models/subType";
import SingleVisitType from "../../../models/singleVisitType";
import deleteType from "../../../api/singleVisit/deleteType";
import getSubTypes from "../../../api/sub/getSubTypes";
import getSingleVisitTypes from "../../../api/singleVisit/getSingleVisitTypes";

interface ModifyCardProps {
    type: SubType & SingleVisitType,
    updater: Function
}

export default function ModifyCard({type, updater}: ModifyCardProps): JSX.Element {
    const handleDelete = (event: React.MouseEvent) => {
        const del = window.confirm('Удалить тип посещения?');
        if (!del) {
            return
        }
        const target = event.target as HTMLDivElement
        deleteType(target.id)
            .then(() => {
                const subs = getSubTypes();
                const visits = getSingleVisitTypes();
                Promise.all([subs, visits])
                    .then(promiseArr => {
                        updater([...promiseArr[0], ...promiseArr[1]])
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch(err => {
                alert(err);
            })
    }

    return (<div className={'modifyCardContainer'}>
        <div className={'cardName'}>
            {type.subName ?
                `Абонемент: ${type.subName}, ${type.isInfinite ?
                    'Безлимитный'
                    : `${type.visitsCount} посещений`} - ${type.cost} ₽ (${type.daysCount} дней)`
                : `Разовое посещение: ${type.visitName} - ${type.cost} ₽`}
        </div>
        <div className={'modifyLinks'}>
            {type.subName ?
                <Link to={`/addSubType?modify=${type._id}`} className={'modifyLink'}><FontAwesomeIcon icon={faEdit}/></Link>
                :  <Link to={`/addSingleVisitType?modify=${type._id}`} className={'modifyLink'}><FontAwesomeIcon icon={faEdit}/></Link>
            }
            <div onClick={handleDelete} id={type._id} className={'modifyLink'}>
                <FontAwesomeIcon className={'modifyIcon'} icon={faTrashAlt}/>
            </div>
        </div>
    </div>)
}
