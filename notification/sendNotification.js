import * as Notifications from 'expo-notifications';

export async function scheduleLocalNotification(title, body, data, time) {
    
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: { seconds: time },
    });
};