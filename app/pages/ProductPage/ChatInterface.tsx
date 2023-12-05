import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import { io } from "socket.io-client";
import '../../styles/chatinterface.css'

// Define an interface for the component props
interface ChatInterfaceProps {
  onClose?: () => void; // Optional prop for closing the chat
  conversationId: string;
  buyerId: string;
  vendorId: string;
  isMiniChat?: boolean; // Optional prop to indicate mini chat mode
}

interface IMessage {
  _id: string;
  conversationId: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, conversationId, buyerId, vendorId,isMiniChat }) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>(null);



  // Establish WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
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
        const response = await fetch(`/api/conversations/history/${conversationId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);  // Assuming setMessages is your state updater function
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
      sender: buyerId,
      receiver: vendorId,
      message,
    };
    console.log("im here")
    socket.emit('chat message', data);
    setMessage(''); // Clear the input after sending
  };

  // Determine the height based on the minimized state
  const containerHeight = isMinimized ? '53px' : '400px';
  return (
    <div className="chat-interface-container " style={{ height: containerHeight }}>
      {/* Chat Header */}
      <div className="chat-header">
        {isMinimized && <button onClick={() => setIsMinimized(!isMinimized)}>Maximize</button>}
        {onClose && <button onClick={onClose}>Close</button>}
      </div>

      {/* Conditionally render Chat Body and Footer based on isMinimized state */}
      {!isMinimized && (
        <>


          {/* Chat Footer: Input field and send button */}
          <div className="chat-footer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg: IMessage) => (
              <div key={msg._id} className={`message ${msg.sender === buyerId ? "buyer" : "vendor"}`}>
                <div className="message-header">
                  <strong>{msg.sender === buyerId ? "You" : "Vendor"}</strong>
                </div>
                <p className="message-content">{msg.message}</p>
                <div className="message-timestamp">
                  {/* Format the date to a human-readable format */}
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
