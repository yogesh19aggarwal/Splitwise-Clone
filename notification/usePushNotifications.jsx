import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const usePushNotifications = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState(null);
    const [notification, setNotification] = useState(null);

    const notificationListener = useRef();
    const responseListener = useRef();

    async function registerForPushNotificationsAsync() {
        let token;

        if (!Device.isDevice) {
            Alert.alert("Please use a physical device");
            return null;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalState = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalState = status;
        }

        if (finalState !== "granted") {
            Alert.alert("Failed to get push token");
            return null;
        }
        //ea02ba3f-b93e-4e46-8662-91b45cc5ff9d
        // 9p6blAE5cZ2dQe41TNSPeX

        try {
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId: "ea02ba3f-b93e-4e46-8662-91b45cc5ff9d",
                })
            ).data;
            console.log("Expo Push Token:", token);
        } catch (error) {
            console.error("Error getting push token:", error);
        }

        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
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
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification clicked:", response);
        });
    
        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    return {
        expoPushToken,
        notification
    };
};
