import { apiConnector } from './apiConnector';

export const addGroup = (group) =>{
    return new Promise((resolve, reject) => {
        apiConnector.post('/create_group', group)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};