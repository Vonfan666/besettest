import { postRequest } from './requests';

export  const login = (params) => {
    return postRequest('/users/register/', params)
}