import consts from '../../consts'


export default async function getSubType(id:string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/getSubType/${id}`, {
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    resolve(data);
                })
                    .catch(err => {
                        alert(err);
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
