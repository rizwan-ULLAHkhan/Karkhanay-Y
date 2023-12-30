'use client'
import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import { io } from "socket.io-client";
import '../../styles/chatinterface.css'
import Image from 'next/image';

// Define an interface for the component props
interface ChatInterfaceProps {
  onClose?: () => void; // Optional prop for closing the chat
  conversationId: string;
  receiverName: string;
  receiverImage: string;
  isMiniChat?: boolean; // Optional prop to indicate mini chat mode
  userId: string
}

interface IMessage {
  _id: string;
  conversationId: string;
  sender: string;
  receiver: string;
  messageText: string;
  createdAt: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, conversationId, receiverName, isMiniChat, userId, receiverImage }) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);


  console.log(receiverImage, "name nam nmna")
  // Establish WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      reconnectionDelayMax: 10000,
      reconnectionAttempts: Infinity
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Join conversation room
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit('join conversation', conversationId);

      socket.on('chat message', (newMessage: IMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      return () => {
        socket.emit('leave conversation', conversationId);
      };
    }
  }, [socket, conversationId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/conversations/history/${conversationId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);  // Assuming setMessages is your state updater function
        setIsLoading(false);

        console.log("check message data please,", data)
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Triggered when messages update







  // Send message through WebSocket
  const sendMessage = () => {
    if (message.trim() === '') return; // Don't send empty messages
    const data = {
      conversationId,
      sender: userId,
      receiver: receiverName,
      message,
    };
    console.log("im here")
    socket.emit('chat message', data);
    setMessage(''); // Clear the input after sending
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  // Determine the styles based on the mini chat state
  const chatContainerClass = isMiniChat ? "chat-interface-container-mini" : "chat-interface-container-full";
  const chatBodyClass = isMiniChat ? "chat-body-mini" : "chat-body-full";
  const chatFooterClass = isMiniChat ? "chat-footer-mini" : "chat-footer-full";
  return (
    <div className={`chat-interface-container ${chatContainerClass} `}>
      {/* Chat Header */}
      <div className="chat-header border-b-2">
        <div className='flex items-center gap-1'>
          <Image className=' rounded-full ' src={receiverImage} alt="Logo" width={42} height={42} />
          <div className=' text-black'> {receiverName}</div>
        </div>
        <div className='flex gap-1'>
          {isMiniChat && (
            <button onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? 'Maximize' : 'Minimize'}
            </button>
          )}
          {onClose && <button onClick={onClose}>Close</button>}
        </div>
      </div>

      {
        isLoading ? (
          // Display loading message only when isLoading is true
          <div className='text-black pl-2 text-lg font-bold'>Loading...</div>
        ) : (
          // Render Chat Body and Footer if not loading and not minimized
          !isMinimized && (
            <>
              {/* Messages */}
              <div className={`chat-body ${chatBodyClass} px-2`} ref={chatBodyRef}>
                {messages.map((msg: IMessage) => (
                  <div key={msg._id} className={`message ${msg.sender === userId ? "buyer" : "vendor"} ${isMiniChat ? "mini" : "full"}`}>
                    <div className="message-header">
                      <strong>{msg.sender === userId ? "You" : receiverName}</strong>
                    </div>
                    <p className="message-content px-2">{msg.messageText}</p>
                    <div className="message-timestamp">
                      {new Date(msg.createdAt).toLocaleTimeString([], { timeStyle: 'short' })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Footer: Input field and send button */}
              <div className={`chat-footer ${chatFooterClass}`}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message"
                  className={isMiniChat ? "input-mini" : "input-full"}
                />
                <button onClick={sendMessage} className={isMiniChat ? "send-button-mini" : "send-button-full"}>
                  Send
                </button>
              </div>
            </>
          )
        )
      }

    </div>
  );
};

export default ChatInterface;
