const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  const accountSid = 'AC8031b0a1f16f82cfa6a1b831b2ff8006'
  const authToken = '32632c64179959ba5e6cff9f9107a9ff';
  const client = require('twilio')(accountSid, authToken);

  var name = "DISHA PATEL";
  var longitude = 37.3487599;
  var latitude = 121.938682;
  var location = `http://www.google.com/maps/place/${latitude},${longitude}`;
  var message = `${name} NEEDS EMERGENCY ASSISTANCE, LOCATION AT ${location}, you are receiving this message because ${name} has signed up for SafeDrive and has listed you as their emergency contact.`;
  console.log(message);

  client.messages
        .create({body: message, from: '+19016572426', to: '+16692048917'})
        .then(message => console.log(message.sid));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})