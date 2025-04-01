import { useCallback } from 'react';
import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';

const useNotification = () => {

    const requestPermission = useCallback(async () => {
        await notifee.requestPermission();
    }, []);

    const displayNotification = useCallback(async (title, body, url = null) => {
        await requestPermission();

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH
        });

        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                    launchActivity: 'default',
                },
            },
            data: { url },
        });

    }, []);

    const scheduleNotification = useCallback(async (title, body, delayInSeconds, url = null) => {
        await requestPermission();

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'default',
            // importance: AndroidImportance.HIGH,
        });

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: Date.now() + delayInSeconds * 1000,
        };

        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher',
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                    },
                },
                data: { url },
            },
            trigger
        );
    }, []);

    return { displayNotification, scheduleNotification };
};

export default useNotification;
