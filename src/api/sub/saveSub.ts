import consts from '../../consts'
import SubType from "../../models/subType";


export default async function saveSub(sub: SubType):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/addSub`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(sub)
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
