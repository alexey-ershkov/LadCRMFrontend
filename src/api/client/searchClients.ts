import consts from '../../consts'


export default async function searchClients(value: string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/clients/search/${value}`, {
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        resolve(data);
                    })
                    .catch( err => {
                        reject(`Can't parse response: ${err}`);
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
