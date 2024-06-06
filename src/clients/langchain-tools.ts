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

export const tools = [googleCalendarCreateTool, googleCalendarViewTool];
