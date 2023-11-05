import React, { useState } from 'react';
import '../../styles/chatinterface.css'

// Define an interface for the component props
interface ChatInterfaceProps {
    onClose: () => void; // Function to close the chat
    conversationId:string;
    buyerId:string;
    vendorId:string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose,conversationId,buyerId,vendorId }) => {
    const [message, setMessage] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    

    const sendMessage = async () => {
        try {

        if (message.trim() === '' ) return; // Don't send empty messages
        if (!conversationId){
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
                    {/* Chat Body: Here you can render chat messages */}

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
                </>
            )}
        </div>
    );
};

export default ChatInterface;
