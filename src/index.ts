import express from "express";
import { PORT, WEBHOOK_VERIFY_TOKEN } from "./constants";
import {
  markAsRead,
  sendReaction,
  sendText,
} from "./utils/whatsapp-message-helper";
import { askModel } from "./clients/langchain";
import { Message } from "./interface";

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const message: Message =
    req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    try {
      await markAsRead(message);
      await sendReaction(message, "🔁");

      const response = await askModel(message.text.body);
      console.log("Response:", response);

      await sendText(message, response);
    } catch (error) {
      await markAsRead(message);
      await sendReaction(message, "⚠️");
      console.error("Error processing message:", error);
    }
  }

  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
  Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
