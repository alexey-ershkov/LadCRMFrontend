import Client from "../../models/client";
import consts from '../../consts'


export default async function modifyClient(client: Client):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/modifyClient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(client)
        }).then(res => {
            if (res.ok) {
                resolve(res.statusText)
            } else {
                reject(res.statusText)
            }
        })
            .catch(err => {
                reject(err)
            })
    })
}
