import { apiConnector } from './apiConnector';

// Get Groups
export const getGroups = async () => {
    return new Promise((resolve, reject) => {
        apiConnector.get('/get_groups')
            .then((response) => {                
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

// Get information about a group
export const getGroupById = async (id) => {
    return new Promise((resolve, reject) => {
        apiConnector.get(`/get_group/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

// Get Friends
export const getFriends = async () => {
    return new Promise((resolve, reject) => {
        apiConnector.get('/get_friends')
            .then((response) => {                
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

// Get details about a friend
export const getFriendById = async (id) => {
    return new Promise((resolve, reject) => {
        apiConnector.get(`/get_friend/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

// Get notifications
export const getNotifications = async ()=>{
    return new Promise((resolve, reject) => {
        apiConnector.get(`/get_notifications`)
            .then((res)=>resolve(res.data))
            .catch((err)=>reject);
    })
};

// Get current user
export const getUser = async ()=>{
    return new Promise((resolve, reject) => {
        apiConnector.get(`/get_current_user`)
            .then((res)=>resolve(res.data))
            .catch((err)=>reject(err));
    })
}
