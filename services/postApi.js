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

export const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        apiConnector.put(`/update_user/${id}`, user)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const addExpense = (expense) =>{
    return new Promise((resolve, reject) => {
        apiConnector.put(`/create_expense/`, expense)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}