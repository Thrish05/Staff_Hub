'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const user = localStorage.getItem('user');
    useEffect(() =>
    {
        if(user) router.push('/dash');
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/checkCreds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            router.push('/dash');
        } else {
            alert(data.message || 'Invalid credentials');
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-100 to-white flex justify-center items-center">
            {user == null && (<div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-8">
                <form className="w-full space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-semibold text-center text-gray-800">Log In</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                placeholder="you@example.com"
                                value = {email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                                placeholder="••••••••"
                                value = {password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-500 active:scale-95 hover:scale-105"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>)
            }
        </div>
    );
}