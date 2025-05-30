'use client';
import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sideBar';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState({});

  const endpoint = (user.faculty_position === "Principal") ? "principal_chat" : "chat";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user data:", storedUser);
    setUser(JSON.parse(storedUser));

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, id: user.faculty_id }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const { answer, sources } = await response.json();

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: answer,
          sources
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          error: error
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen w-full flex flex-row bg-gray-100">
        <Sidebar />
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-xl mt-10">
                Ask about yourself, {user.faculty_position == "Principal" ? "Principal" : "Faculty"}...
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[70%] shadow-md ${msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : msg.error
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-700 text-white'
                    }`}
                >
                  {msg.content}
                  {msg.sources && (
                    <div className="mt-1 text-sm text-gray-300">
                      Sources: {msg.sources.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-2 rounded-full shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}