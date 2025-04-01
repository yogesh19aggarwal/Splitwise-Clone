import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';

export const usePushNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(null);

    const notificationListener = useRef();
    const responseListener = useRef();

    // Request for notification permissions
    async function registerForPushNotificationsAsync() {
        // Check if the device is physical
        if (!(await notifee.isAndroid() || await notifee.isIOS())) {
            Alert.alert("Please use a physical device");
            return null;
        }

        // Request permission to show notifications
        const settings = await notifee.requestPermission();
        if (!settings.granted) {
            Alert.alert("Failed to get push token");
            return null;
        }

        // Get the push notification token
        let token;
        try {
            token = await notifee.getFcmToken(); // For FCM token
            console.log("Notifee Push Token:", token);
        } catch (error) {
            console.error("Error getting push token:", error);
        }

        // Set notification channel for Android
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
            vibration: true,
        });

        return token;
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
            } else {
                console.log("No token received.");
            }
        });

        // Notification received listener
        notificationListener.current = notifee.onNotificationEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log("Notification clicked:", detail);
            } else if (type === EventType.DISMISS) {
                console.log("Notification dismissed:", detail);
            } else {
                setNotification(detail);
            }
        });

        // Clean up the listeners on unmount
        return () => {
            if (notificationListener.current) {
                notifee.removeNotificationListener(notificationListener.current);
            }
        };
    }, []);

    return {
        expoPushToken,
        notification
    };
};
