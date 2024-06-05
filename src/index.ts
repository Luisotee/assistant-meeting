import twilio from "twilio";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "./constants";

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: "This is a message that I want to send over WhatsApp with Twilio!",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+15005550006",
  })
  .then((message: any) => console.log(message.sid));
