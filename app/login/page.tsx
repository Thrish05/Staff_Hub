"use client"
import { TypewriterEffectSmoothDemo } from "../writer";
export default function Login()
{
    return(             
        <div className="relative flex flex-col justify-between bg-black p-0">
            <div className="h-full w-full flex flex-row justify-center items-center">
                <div className="text-center ">
                    <TypewriterEffectSmoothDemo
                    sentence="Where education meets automation"
                    class_size="h-[40rem]"
                    />
                </div>
                    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md h-auto">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                    </h2>
                    <form className="mt-8 space-y-6 " action="/api/login" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px ">
                        <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                            placeholder="Email address"
                        />
                        </div>
                        <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                        </div>
                    </div>
                    <div className="pt-[0px]">
                        <p>Forgot your password?</p>
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Sign In
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}