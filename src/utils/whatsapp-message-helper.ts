import axios from "axios";
import { GRAPH_API_TOKEN, NUMBER_ID } from "../constants";
import { Message } from "../interface";

export async function sendText(message: Message, text: string) {
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: message.from,
      type: "text",
      text: {
        body: text,
      },
    },
  });
}

export async function sendReaction(message: Message, reaction: string) {
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: message.from,
      type: "reaction",
      reaction: {
        message_id: message.id,
        emoji: reaction,
      },
    },
  });
}

export async function markAsRead(message: Message) {
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      status: "read",
      message_id: message.id,
    },
  });
}
