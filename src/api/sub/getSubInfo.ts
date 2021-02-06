import consts from '../../consts'


export default async function getSubInfo(id: string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/sub/${id}`, {
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        resolve(data);
                    })
                    .catch( () => {
                        reject(res.status);
                    })
            } else {
                reject(res.status)
            }
        })
            .catch(err => {
                reject(err)
            })
    })
}
