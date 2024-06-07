import axios from 'axios';

const chatEcom = axios.create({
    baseURL: 'https://postgrest.chatecom.io/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_POSTGRES}`
    }
});

export default chatEcom;
