import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
