'use client'
import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import '../ChatApp/chatapp.css';
import ChatInterface from '../../pages/ProductPage/ChatInterface';

interface ConversationData {
  _id: string; // Assumed to be the conversation's ID
  participant1: string; // Assumed to be the participant's ID
  participant2: string;
  participant2Name: string;
  participant2Image: string;
}

const ChatApp = () => {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [buyerId, setBuyerId] = useState<string >('');
  const [vendorId, setVendorId] = useState<string>('');
  const { data: session } = useSession(); // Using NextAuth for session handling
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchConversations = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/conversations/chatApp/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch conversations');
          }
          const data: ConversationData[] = await response.json();
          console.log(data)
          setConversations(data);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };

    fetchConversations();
  }, [userId]);

  const handleConversationClick = (conversationId: string, participant1:string, participant2:string  ) => {
    console.log(conversationId)
    setCurrentConversationId(conversationId);
    setBuyerId(participant1)
    setVendorId(participant2)
    // Additional logic for handling WebSocket subscription
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        {conversations.map((conversation) => (
          <div key={conversation.id} onClick={() => handleConversationClick(conversation._id, conversation.participant1,conversation.participant2)}>
            {conversation.participant2Name}
            <img src={conversation.participant2Image} alt={`${conversation.participant2Name}'s Avatar`} />
          </div>
        ))}
      </div>
      <div className="chat-area">
        {currentConversationId ? (
          <ChatInterface
            conversationId={currentConversationId}
            buyerId={buyerId}
            vendorId={vendorId}
          />
        ) : (
          <div>Please select a conversation</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
