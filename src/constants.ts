import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

export const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN as string;
export const GRAPH_API_TOKEN = process.env.GRAPH_API_TOKEN as string;
export const PORT = process.env.PORT as string;
export const NUMBER_ID = process.env.NUMBER_ID as string;
