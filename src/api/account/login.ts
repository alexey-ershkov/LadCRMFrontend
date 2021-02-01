import consts from '../../consts'
import Account from "../../models/account";


export default async function Login(account: Account):Promise<number> {
    return new Promise<number>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(account)
        }).then(res => {
            resolve(res.status);
        })
            .catch(() => {
                reject(500);
            })
    })
}
