const axios = require('axios');

export async function sendPushNotification(token, title, body, data = {}) {
  const message = {
    to: token,
    sound: 'default',
    title,
    body,
    data,
  };

  console.log("MEssage ::: ", message)

  const res = await axios.post('https://exp.host/--/api/v2/push/send', message, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
  });

  console.log("MESSAGE PUSH ", res)
}
