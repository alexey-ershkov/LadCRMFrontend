import consts from '../../consts'


export default async function deleteType(id:string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/deleteType/${id}`, {
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
