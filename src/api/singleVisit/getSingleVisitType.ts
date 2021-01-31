import consts from '../../consts'


export default async function getSingleVisitType(id:string):Promise<any> {
    return new Promise<any>((resolve,reject) => {
        fetch(`${consts.BASE_URL}/getSingleVisitType/${id}`).then(res => {
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
