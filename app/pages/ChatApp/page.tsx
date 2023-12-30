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
  const [receiverImage, setReceiverImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false); // New state to track chat visibility
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

  const handleConversationClick = (conversation: ConversationData) => {
    console.log(conversation._id)
    setCurrentConversationId(conversation._id);
    setReceiverName(userId === conversation.participant1 ? conversation.participant2Name : conversation.participant1Name);
    setReceiverImage(userId === conversation.participant1 ? conversation.participant2Image : conversation.participant1Image);

    if (window.innerWidth <= 800) {
      setIsChatOpen(true);
    }

    // Additional logic for handling WebSocket subscription
  };


  // Function to go back to the conversation list on small screens
  const handleBackToConversations = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="chat-app">
      <div className={`sidebar ${isChatOpen ? 'hidden' : ''}`}>
        <div className=' text-black font-bold pb-2 pl-1 border-b-4'>Conversations</div>
        {isLoading ? (
          <div className=" text-black">Loading conversations...</div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="conversation"
              onClick={() => handleConversationClick(conversation)}
            >
              <img src={userId === conversation.participant1 ? conversation.participant2Image : conversation.participant1Image || '/default-avatar.png'} alt={`${conversation.participant2Name || conversation.participant1Name}'s Avatar`} className="conversation-avatar" />
              <div className="conversation-details">
                <div className="participant-name">
                  {userId === conversation.participant1 ? conversation.participant2Name : conversation.participant1Name}
                </div>
                <div className="message-preview">Last message preview...</div> {/* Replace with actual message preview */}
              </div>
              <div className="timestamp">3d</div> {/* Replace with actual timestamp */}
            </div>
          ))
        )}
      </div>

      <div className={`chat-area ${isChatOpen ? 'active' : ''}`}>
        {currentConversationId && userId && !isLoading ? (
          <>
            {window.innerWidth <= 800 && (
              <button onClick={handleBackToConversations}>Back to Conversations</button>
            )}
            <ChatInterface
              conversationId={currentConversationId}
              receiverName={receiverName}
              receiverImage={receiverImage}
              userId={userId}
            />
          </>
        ) : (
          <div className="select-conversation">Please select a conversation</div>
        )}
      </div>
    </div>
  );

};

export default ChatApp;
