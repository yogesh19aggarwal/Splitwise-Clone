import { apiConnector } from "./apiConnector";

export const deleteGroup=async (id) =>{
    return new Promise((resolve, reject) => {
        apiConnector.post(`/delete_group/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const removeFriend = async (id) =>{
    return new Promise((resolve, reject) => {
        apiConnector.post(`/delete_friend/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};