import Client from "../../models/client";
import consts from '../../consts'


export default async function addChild(client: Client):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/addChild`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        }).then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                reject(res.statusText)
            }
        })
            .catch(err => {
                reject(err)
            })
    })
}
