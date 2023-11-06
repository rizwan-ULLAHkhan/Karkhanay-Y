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
  const [messages, setMessages] = useState([])
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Triggered when messages update

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/conversations/history/${conversationId}`);
      const data = await res.json();
      setMessages(data); // Update the state with the fetched messages
    };

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);



  const sendMessage = async () => {
    try {

      if (message.trim() === '') return; // Don't send empty messages
      if (!conversationId) {
        alert("try again")
        return
      }
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId, // This should be the state from your component or prop
          sender: buyerId, // This should be the buyer's user ID
          receiver: vendorId, // This should be the vendor's user ID
          message, // The message text from the input field
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Message sent:', result);
        // Here you might want to update the chat UI to show the new message
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

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
