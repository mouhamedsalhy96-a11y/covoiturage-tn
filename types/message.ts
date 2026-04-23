
export type Conversation = {
  id: string;
  name: string;
  tripRoute: string;
  lastMessage: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: string;
  text: string;
};
