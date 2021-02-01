import consts from '../../consts'


export default async function deleteAccount(id:string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/account/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                resolve('ok');
            } else {
                reject(res.statusText)
            }
        })
            .catch(err => {
                reject(err)
            })
    })
}
