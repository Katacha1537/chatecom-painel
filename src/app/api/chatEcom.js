import axios from 'axios';

const chatEcom = axios.create({
    baseURL: 'https://postgrest.chatecom.io/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBMDY5QTZBRjgwOTRFMjlGREI5Q0Q0QURDRjg0NDAyRiIsIm5hbWUiOiJwYWNrdHlwZWJvdCIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6InBvc3RncmVzIn0.wxpdyb6N7bv8UN6raOsGsCkz-CvqY4ztp84vXtdoEz4'
    }
});

export default chatEcom;
