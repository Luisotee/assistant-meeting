import { prisma } from "../clients/prisma";

export async function getChatFor(chatId: string) {
  return await prisma.wAChat.findFirst({
    where: { id: chatId },
  });
}

export async function createChat(chatId: string) {
  return await prisma.wAChat.create({
    data: { id: chatId },
  });
}

export async function deleteChat(chatId: string) {
  return await prisma.wAChat.delete({
    where: { id: chatId },
  });
}

export async function deleteAllChats() {
  return await prisma.wAChat.deleteMany();
}

export async function getOpenRouterConversationFor(chatId: string) {
  return prisma.openRouterConversation.findFirst({
    where: { waChatId: chatId },
  });
}

export async function getOpenRouterMemoryFor(chatId: string) {
  const conversation = await getOpenRouterConversationFor(chatId);
  return conversation?.memory;
}

export async function updateOpenRouterConversation(
  chatId: string,
  memory: string
) {
  return await prisma.openRouterConversation.update({
    data: {
      waChatId: chatId,
      memory: memory,
    },
    where: {
      waChatId: chatId,
    },
  });
}

export async function createOpenRouterConversation(
  chatId: string,
  memory: string
) {
  return await prisma.openRouterConversation.create({
    data: {
      waChatId: chatId,
      memory: memory,
    },
  });
}
