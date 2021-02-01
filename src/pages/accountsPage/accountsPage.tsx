import React, {useEffect, useState} from "react";
import './accountsPage.scss';
import getAccounts from "../../api/account/getAccounts";
import Account from "../../models/account";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import deleteAccount from "../../api/account/deleteAccount";

export default function AccountsPage():JSX.Element {
    const [accounts, setAccounts] = useState<Array<Account>>([]);

    useEffect(() => {
        getAccounts()
            .then(data => {
                setAccounts(data);
            })
            .catch(err => {
                alert(err);
            })
    }, [])

    const handleDelete = (event: React.MouseEvent) => {
        const del = window.confirm('Удалить аккаунт?');
        if (!del) {
            return
        }
        const target = event.target as HTMLDivElement
        deleteAccount(target.id)
            .then(() => {
                getAccounts()
                    .then(data => {
                        setAccounts(data);
                    })
                    .catch(err => {
                        alert(err);
                    })
            })
            .catch(err => {
                alert(err);
            })
    }

    return (<div className={'modifyContainer'}>
        {accounts.map(account => {
            return (
                <div className={'modifyCardContainer'} key={account._id}>
                    <div className={'cardName'}>
                        {account.login}
                    </div>
                    <div className={'modifyLinks'}>
                        <Link to={`/addAccount?modify=${account._id}`} className={'modifyLink'}><FontAwesomeIcon icon={faEdit}/></Link>
                        <div onClick={handleDelete} id={account._id} className={'modifyLink'}>
                            <FontAwesomeIcon className={'modifyIcon'} icon={faTrashAlt}/>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>)
}
