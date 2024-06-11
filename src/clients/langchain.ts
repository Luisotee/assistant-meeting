import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import {
  BufferWindowMemory,
  ChatMessageHistory,
  ConversationSummaryMemory,
} from "langchain/memory";
import { OPENAI_API_KEY } from "../constants";
import { tools } from "./langchain-tools";
import { getOpenRouterConversationFor, getOpenRouterMemoryFor } from "../crud";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";

function parseMessageHistory(
  rawHistory: { [key: string]: string }[]
): (HumanMessage | AIMessage)[] {
  return rawHistory.map((messageObj) => {
    const messageType = Object.keys(messageObj)[0];
    const messageContent = messageObj[messageType];

    if (messageType === "HumanMessage") {
      return new HumanMessage(messageContent);
    } else {
      return new AIMessage(messageContent);
    }
  });
}

async function getMemory(chat: string, memory: BufferWindowMemory) {
  const conversation = await getOpenRouterConversationFor(chat);
  if (conversation) {
    if (memory instanceof ConversationSummaryMemory) {
      let memoryString = await getOpenRouterMemoryFor(chat);
      if (memoryString === undefined) return;
      memory.buffer = memoryString;
    } else {
      let memoryString = await getOpenRouterMemoryFor(chat);
      if (memoryString === undefined) return;

      const pastMessages = parseMessageHistory(JSON.parse(memoryString));
      memory.chatHistory = new ChatMessageHistory(pastMessages);
    }
  } else {
    let memoryString: BaseMessage[] = [];
    memory.chatHistory = new ChatMessageHistory(memoryString);
  }

  return memory;
}

const llm = new ChatOpenAI({
  model: "gpt-4o",
  apiKey: OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant whose job is to set up a meeting between two people. Here are your guidelines:
    - You have access to Luis's calendar and can see when he is available and when he is not.
    - You must always use your calendar tool to check Luis's availability in the requested day.
    - Any event on Luis's calendar is considered confidential and must not be shared with anyone.
    - Any event on Luis's calendar means that Luis is not available for that timeslot.
    - Each meeting will use a time slot of 1 hour. You can set up meetings from 8:00 to 19:00, Monday to Friday (excluding holidays).
    - Meetings can only be scheduled on the hour, e.g., 9am, 10am, etc.
    - If the person asks for a time that is not available, you should suggest 3 alternative times the alternative times should the closest to the requested time.
    - You will be speaking with the person who wants to set up a meeting with Luis.
    - You cannot create events on Luis's calendar. You can only check his availability.
    - Do not answer any questions that are not related to setting up a meeting.
    - The current time is ${new Date().toLocaleString()}`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const memory = new BufferWindowMemory({
  memoryKey: "chat_history",
  inputKey: "input",
  outputKey: "output",
  returnMessages: true,
  k: 10,
});

const agent = createToolCallingAgent({
  // @ts-ignore
  llm,
  tools,
  prompt,
});

export const agentExecutor = new AgentExecutor({
  agent,
  memory,
  tools,
});
