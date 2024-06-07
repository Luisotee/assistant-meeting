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

export async function sendList(message: Message) {
  const timeslots = ["8:00-9:00", "10:00-11:00", "12:00-13:00"];
  const sections = timeslots.map((timeslot, index) => {
    return {
      title: `Timeslot ${index + 1}`,
      rows: [
        {
          id: `timeslot_${index + 1}`,
          title: timeslot,
          description: `Timeslot from ${timeslot}`,
        },
      ],
    };
  });

  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: message.from,
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Available Timeslots",
        },
        body: {
          text: "Please select a timeslot",
        },
        footer: {
          text: "Thank you for your selection",
        },
        action: {
          button: "Select Timeslot",
          sections: sections,
        },
      },
    },
  });
}

export async function sendButton(message: Message) {
  const timeslots = ["8:00-9:00", "10:00-11:00", "12:00-13:00"];
  const buttons = timeslots.map((timeslot, index) => {
    return {
      type: "reply",
      reply: {
        id: `timeslot_${index + 1}`,
        title: timeslot,
      },
    };
  });

  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: message.from,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "Os horários disponiveis mais pertos da sua sugestão seria:",
        },
        action: {
          buttons: buttons,
        },
      },
    },
  });
}

export async function sendButton2(message: Message) {
  const timeslots = ["Sim", "Outro horário", "Não"];
  const buttons = timeslots.map((timeslot, index) => {
    return {
      type: "reply",
      reply: {
        id: `timeslot_${index + 1}`,
        title: timeslot,
      },
    };
  });

  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: message.from,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "O João te convidou para uma reunião às 10:00 do dia 10/10. Você aceita?",
        },
        action: {
          buttons: buttons,
        },
      },
    },
  });
}

export async function sendButton3(message: Message) {
  const timeslots = ["Sim", "Não"];
  const buttons = timeslots.map((timeslot, index) => {
    return {
      type: "reply",
      reply: {
        id: `timeslot_${index + 1}`,
        title: timeslot,
      },
    };
  });

  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: message.from,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "Sobre sua reunião com Fulano, Fulano escolheu o horário 10:00-11:00 do dia 10/10. Você aceita?",
        },
        action: {
          buttons: buttons,
        },
      },
    },
  });
}
