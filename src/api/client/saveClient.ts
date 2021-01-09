import Client from "../../models/client";
import consts from '../../consts'

export default async function saveClient(client: Client) {
    console.log(client)
    fetch(`${consts.BASE_URL}/addClient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(client)
    }).then(res => {
        if (res.ok) {
            window.location.href = '/'
        }
    })
        .catch(err => {
            alert(err)
        })
}
