import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateChatResponse } from "../services/groq";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isThinking) return;

        const userMessage: ChatMessage = { role: "user", content: trimmed };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsThinking(true);

        try {
            const response = await generateChatResponse(trimmed);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I was unable to process your request right now. Please try again in a moment.",
                },
            ]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    return (
        <>
            <button className="ai-chat-button" onClick={openChat} aria-label="Open AI Chat">
                <span className="ai-tooltip">RoamwiseAI</span>
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="ai-chat-title">
                            <span className="ai-icon">✨</span>
                            <span>RoamwiseAI</span>
                        </div>
                        <div className="ai-status">
                            <span className="status-dot"></span>
                            Online
                        </div>
                        <button className="ai-close-button" onClick={closeChat} aria-label="Close chat">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.length === 0 && !isThinking && (
                            <div className="ai-message ai-message-text">
                                <div className="message-content">
                                    Hi! I'm RoamwiseAI, your personal travel assistant. Ask me anything about
                                    destinations, planning, packing, or travel tips.
                                </div>
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`ai-message ${msg.role === "user" ? "user-message" : "ai-message-text"}`}
                            >
                                <div className="message-content">
                                    {msg.role === "user" ? (
                                        msg.content.split("\n").map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                {i < msg.content.split("\n").length - 1 && <br />}
                                            </span>
                                        ))
                                    ) : (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isThinking && (
                            <div className="ai-message ai-message-text">
                                <div className="message-content thinking">
                                    <div className="thinking-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-chat-input-container">
                        <input
                            className="ai-chat-input"
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything about travel..."
                            disabled={isThinking}
                        />
                        <button
                            className="ai-send-button"
                            onClick={sendMessage}
                            disabled={isThinking || !input.trim()}
                            aria-label="Send message"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
