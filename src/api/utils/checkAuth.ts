import consts from '../../consts'

export default async function checkAuth(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        fetch(`${consts.BASE_URL}/checkAuth`, {
            mode: 'cors',
            credentials: 'include',
        }).then(res => {
            if (res.ok) {
                resolve(res.status)
            } else {
                reject(res.status)
            }
        })
            .catch(err => {
                reject(err)
            })
    })
}
