
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const client = require('twilio')(accountSid, authToken);

var name = "Persons_Name";
var longitude = 37.3487599;
var latitude = 121.938682;
var location = `http://www.google.com/maps/place/${latitude},${longitude}`;
var message = `${name} NEEDS EMERGENCY ASSISTANCE, LOCATION AT ${location}, you are receiving this message because ${name} has signed up for SafeAlerts and has listed you as their emergency contact.`;
console.log(message);

client.messages
      .create({body: message, from: '+19016572426', to: '+16692048917'})
      .then(message => console.log(message.sid));