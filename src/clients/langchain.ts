import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { OPENAI_API_KEY } from "../constants";
import { tools } from "./langchain-tools";

export async function askModel(message: string) {
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo-0125",
    apiKey: OPENAI_API_KEY,
  }).bindTools(tools);

  const systemMessage = "You are a helpful assistant";
  /* 
  interface PlanExecuteState {
    input: string;
    plan: string[];
    pastSteps: [string, string][];
    response?: string;
  }

  // @ts-ignore
  const planExecuteState: StateGraphArgs<PlanExecuteState>["channels"] = {
    input: {
      value: (left?: string, right?: string) => right ?? left ?? "",
    },
    plan: {
      value: (x?: string[], y?: string[]) => y ?? x ?? [],
      default: () => [],
    },
    pastSteps: {
      value: (x: [string, string][], y: [string, string][]) => x.concat(y),
      default: () => [],
    },
    response: {
      value: (x?: string, y?: string) => y ?? x,
      default: () => undefined,
    },
  };
 */
  const agentExecutor = createReactAgent({
    // @ts-ignore
    llm: new ChatOpenAI({ model: "gpt-4o" }),
    tools: tools,
    messageModifier: systemMessage,
  });

  let agentOutput = await agentExecutor.invoke({
    messages: [new HumanMessage(message)],
  });
  console.log(agentOutput);

  return agentOutput.messages[agentOutput.messages.length - 1].content;
}
