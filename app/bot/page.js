'use client';
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import { useState, useRef, useEffect } from "react";

export default function Profile() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;
        setMessages([...messages, { text: message, sender: "user" }]);
        setMessage("");
    };

    return (
        <>
            <Header />
            <div className="h-screen w-full flex flex-row bg-gray-100">
                <Sidebar />
                <div className="flex-1 relative flex flex-col overflow-hidden">
                    {/* Chat message area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 text-xl mt-10">Start chatting...</div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`rounded-2xl px-4 py-2 max-w-[70%] text-white shadow-md ${msg.sender === "user" ? "bg-purple-600" : "bg-gray-700"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={chatRef} />
                    </div>

                    {/* Input box */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-2 rounded-full shadow-md transition-all"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
