import consts from '../../consts'

export default async function ping(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        fetch(`${consts.BASE_URL}/ping`, {
            mode: 'cors',
            credentials: 'include',
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
