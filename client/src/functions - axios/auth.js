//axios
import axios from 'axios';


//send data to backend
export const loginUser = async(authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/login-user`,
        {}, { // nothing in req.body we send the token in the headers
        headers: {
            authToken,
        }
        })
};

//send data to backend
export const createOrUpdateUser = async(data, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,
        data, { // nothing in req.body we send the token in the headers
        headers: {
            authToken,
        }
        })
};

export const currentUser = async(authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`,
        {}, { // nothing in req.body we send the token in the headers
        headers: {
            authToken,
        }
        })
};

