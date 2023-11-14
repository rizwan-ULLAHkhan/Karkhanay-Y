import { useState, useEffect } from 'react';
import React, { useRef } from 'react';
import '../../styles/chatinterface.css'

// Define an interface for the component props
interface ChatInterfaceProps {
  onClose: () => void; // Function to close the chat
  conversationId: string;
  buyerId: string;
  vendorId: string;
}

interface IMessage {
  _id: string;
  conversationId: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, conversationId, buyerId, vendorId }) => {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Triggered when messages update

  // Establish WebSocket connection
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  



    // Send message through WebSocket
    const sendMessage = () => {
      if (message.trim() && socket) {
        const messageData = {
          conversationId,
          sender: buyerId,
          receiver: vendorId,
          message,
        };
        socket.send(JSON.stringify(messageData));
        setMessage(''); // Clear the input after sending
      }
    };

  // Determine the height based on the minimized state
  const containerHeight = isMinimized ? '53px' : '400px';
  return (
    <div className="chat-interface-container " style={{ height: containerHeight }}>
      {/* Chat Header */}
      <div className="chat-header">
        <button onClick={() => setIsMinimized(!isMinimized)}>
          {isMinimized ? 'Maximize' : 'Minimize'}
        </button>
        <button onClick={onClose}>Close</button>
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
