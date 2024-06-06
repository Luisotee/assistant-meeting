import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

export const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN as string;
export const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN as string;
export const PORT = process.env.PORT as string;
export const NUMBER_ID = process.env.NUMBER_ID as string;
export const ENABLE_GOOGLE_CALENDAR = process.env
  .ENABLE_GOOGLE_CALENDAR as string;
export const GOOGLE_CALENDAR_CLIENT_EMAIL = process.env
  .GOOGLE_CALENDAR_CLIENT_EMAIL as string;
export const GOOGLE_CALENDAR_PRIVATE_KEY = process.env
  .GOOGLE_CALENDAR_PRIVATE_KEY as string;
export const GOOGLE_CALENDAR_CALENDAR_ID = process.env
  .GOOGLE_CALENDAR_CALENDAR_ID as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
