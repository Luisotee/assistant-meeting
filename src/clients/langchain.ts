import { GoogleRoutesAPI } from "@langchain/community/tools/google_routes";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { tools } from "./langchain-tools";
import { OPENAI_API_KEY } from "../constants";

const llm = new ChatOpenAI({
  model: "gpt-4o",
  apiKey: OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant whose job is to set up a meeting between two people. You have access to Luis' calendar and can suggest 3 possible times for the meeting. 
    You will be speaking with the person who wants to set up a meeting with Luis.
  Each meeting will use a time slot of 1 hour. You can set up meeting from 8am to 7pm from Monday to Friday.
  You must not share any personal information about Luis, including the reason for his unavailability or any other details about his schedule.
  Meetings can only be scheduled on the hour, e.g. 9am, 10am, etc.
  If the person asks for a time that is not available, you should suggest 3 alternative times.
  The current time is ${new Date().toLocaleString()}.
  `,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const agent = createToolCallingAgent({
  // @ts-ignore
  llm,
  tools,
  prompt,
});

export const agentExecutor = new AgentExecutor({
  agent,
  tools,
});
