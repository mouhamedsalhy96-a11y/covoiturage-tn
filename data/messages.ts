
import { ChatMessage, Conversation } from "@/types/message";

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Ahmed",
    tripRoute: "Manchester → Liverpool",
    lastMessage: "Hello, is the pickup point near the station?",
  },
  {
    id: "c2",
    name: "Sara",
    tripRoute: "London → Birmingham",
    lastMessage: "I have booked 2 seats. Thank you!",
  },
  {
    id: "c3",
    name: "Omar",
    tripRoute: "Leeds → Sheffield",
    lastMessage: "Can I bring one small suitcase?",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    conversationId: "c1",
    sender: "Ahmed",
    text: "Hello, is the pickup point near the station?",
  },
  {
    id: "m2",
    conversationId: "c1",
    sender: "You",
    text: "Yes, pickup is outside the main station entrance.",
  },
  {
    id: "m3",
    conversationId: "c2",
    sender: "Sara",
    text: "I have booked 2 seats. Thank you!",
  },
  {
    id: "m4",
    conversationId: "c3",
    sender: "Omar",
    text: "Can I bring one small suitcase?",
  },
];

export function getConversationById(id: string) {
  return conversations.find((conversation) => conversation.id === id);
}

export function getMessagesByConversationId(conversationId: string) {
  return chatMessages.filter(
    (message) => message.conversationId === conversationId
  );
}
``
