const consts =  {
    BASE_URL: "https://lad-crm.herokuapp.com",
    ACCENT_COLOR_HEX: '#0085d0'
}

if (process.env.REACT_APP_BACKEND_URL) {
    consts.BASE_URL = process.env.REACT_APP_BACKEND_URL
}


export default consts
