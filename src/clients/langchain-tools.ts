import {
  GoogleCalendarCreateTool,
  GoogleCalendarViewTool,
} from "@langchain/community/tools/google_calendar";
import { OpenAI } from "@langchain/openai";
import {
  GOOGLE_CALENDAR_CALENDAR_ID,
  GOOGLE_CALENDAR_CLIENT_EMAIL,
  GOOGLE_CALENDAR_PRIVATE_KEY,
  OPENAI_API_KEY,
} from "../constants";
import { DynamicStructuredTool, DynamicTool } from "@langchain/core/tools";
import { z } from "zod";
import { sendText } from "../utils/whatsapp-message-helper";

const googleCalendarModel = new OpenAI({
  temperature: 0,
  openAIApiKey: OPENAI_API_KEY,
});

const googleCalendarParams = {
  credentials: {
    clientEmail: GOOGLE_CALENDAR_CLIENT_EMAIL,
    privateKey: GOOGLE_CALENDAR_PRIVATE_KEY,
    calendarId: GOOGLE_CALENDAR_CALENDAR_ID,
  },
  scopes: [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ],
  model: googleCalendarModel,
};

const googleCalendarCreateTool = new GoogleCalendarCreateTool(
  googleCalendarParams
);
const googleCalendarViewTool = new GoogleCalendarViewTool(googleCalendarParams);

const sendMessageOtherNumberTool = new DynamicStructuredTool({
  name: "send-message-other-number",
  description: `
  - This tool allows you to send a message to a phone number other than the one you are currently chatting with. 
  - If you want to send a message to the current chat, you don't need to use this tool.
  - You only need to use this tool if Luis wants you to send a message to a different phone number.
    `,
  schema: z.object({
    phoneNumber: z
      .string()
      .describe(
        "The phone number to send the message to. Format is the same as in api.whatsapp.com/send?phone="
      ),
    message: z.string().describe("The message to send to the phone number."),
  }),
  func: async ({ phoneNumber, message }): Promise<string> => {
    // Send message to phone number
    await sendText(phoneNumber, message);
    return (
      "You successfully sent a message to the phone number: " + phoneNumber
    );
  },
});

export const tools = [
  googleCalendarCreateTool,
  googleCalendarViewTool,
  sendMessageOtherNumberTool,
];
