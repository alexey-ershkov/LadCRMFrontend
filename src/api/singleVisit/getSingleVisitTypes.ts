import consts from '../../consts'


export default async function getSingleVisitTypes():Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/singleVisitTypes`).then(res => {
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