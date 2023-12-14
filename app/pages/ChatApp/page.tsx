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
  participant1Name: string;
  participant1Image: string;
  participant2Name: string;
  participant2Image: string;
}

const ChatApp = () => {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession(); // Using NextAuth for session handling
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchConversations = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/conversations/chatApp/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch conversations');
          }
          const data: ConversationData[] = await response.json();
          console.log(data, "into you")
          setConversations(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        }
      }
    };

    fetchConversations();
  }, [userId]);

  const handleConversationClick = (conversationId: string, participant1: string, participant2Name: string,participant1Name: string) => {
    console.log(conversationId)
    setCurrentConversationId(conversationId);
    setReceiverName(userId === participant1 ? participant2Name : participant1Name);
    
    // Additional logic for handling WebSocket subscription
  };

  return (
    <div className="chat-app">
      <div className="sidebar pl-6">
        {isLoading ? (
          <div>Loading conversations...</div>
        ) : (
          conversations.map((conversation) => {
            // Log the values for debugging
            console.log(`userId: ${userId}, participant1: ${conversation.participant1}`);
            console.log(`participant2Image: ${conversation.participant2Image}`);
            console.log(conversation);
            

            return (
              <div key={conversation._id}
                onClick={() => handleConversationClick(conversation._id, conversation.participant1, conversation.participant2Name,conversation.participant1Name)}>
                {conversation.participant2Image && userId === conversation.participant1 ? (
                  <>
                    {console.log("Rendered participant 2")}
                    {conversation.participant2Name}
                    <img src={conversation.participant2Image} alt={`${conversation.participant2Name}'s Avatar`} />
                  </>
                ) : (
                  <>
                    {console.log("Rendered participant 1")}
                    {conversation.participant1Name}
                    <img src={conversation.participant1Image} alt={`${conversation.participant1Name}'s Avatar`} />
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="chat-area">
        {currentConversationId && userId ? (
          <ChatInterface
            conversationId={currentConversationId}
            receiverName={receiverName}
            userId={userId}
          />
        ) : (
          <div>Please select a conversation</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
