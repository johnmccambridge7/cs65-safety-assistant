import * as admin from 'firebase-admin';

// internal function used to message device
const sendMessageToDevice = (registrationToken, payload, options) => {
    return admin.messaging().sendToDevice(registrationToken, payload, options);
}

// external function used to send notification
// user specifies device token, notification title and body
const sendPushNotification = (registrationToken, title, body) => {
    const payload = {
        notification: {
            title,
            body,
        },
    };
    
    // set the message as high priority and have it expire after 24 hours.
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };
    
    sendMessageToDevice(registrationToken, payload, options);
}

// example message being sent to test phone
const sendTestMessage = () => {
    const registrationToken = "ccW-ENPvaV0:APA91bGyXUAZmyh804XNnpcm5PQmVonRIRP6Kf98jZissP0n734JXatQUx3S72JOXEXha1N-FqKVPsgiTZaFiy6jFr-xkusZXrYaPpF2Wo9yKBAgnrc5sQx5SE_zyEBmHHpjQ9whmulm";

    const payload = {
        notification: {
            title: 'Test Notification',
            body: 'This is a test message from the server.',
        },
    };
    
    // set the message as high priority and have it expire after 24 hours.
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };
    
    sendMessageToDevice(registrationToken, payload, options);
}

export {
    sendPushNotification,
    sendTestMessage,
}