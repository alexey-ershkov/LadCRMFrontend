import consts from '../../consts'

export default async function removeSubVisit(id: string):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/removeVisitFromSub/${id}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
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
