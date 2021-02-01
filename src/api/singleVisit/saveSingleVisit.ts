import consts from '../../consts'
import SingleVisit from "../../models/singleVisit";


export default async function saveSingleVisit(visit: SingleVisit):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/saveSingleVisit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(visit)
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
