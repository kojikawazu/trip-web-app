'use client';

import React, { useState } from 'react';

interface FormErrors {
    name?: string;
    email?: string;
    messages?: string;
}

/**
 * メールフォームページ
 * @returns JSX
 */
const MailForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [messages, setMessages] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = () => {
        const errors: FormErrors = {};
        if (!name) errors.name = "名前を入力してください。";
        if (!email) {
            errors.email = "メールアドレスを入力してください。";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "有効なメールアドレスを入力してください。";
        }
        if (!messages) errors.messages = "メッセージを入力してください。";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleMailSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    messages: messages,
                }),
            });

            const responseData = await response.json();
            if (responseData.messages) {
                //console.log(responseData.messages);

                setSubmitMessage("メールが正常に送信されました。");
                setName("");
                setEmail("");
                setMessages("");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            {submitMessage && (
                <div className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30" role="alert">
                    <div className="flex justify-center">
                        <div className="flex-shrink-0">
                            <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                            </span>
                        </div>
                        <div className="ms-3">
                            <h3 className="text-gray-800 font-semibold dark:text-white">
                                {submitMessage}
                            </h3>
                        </div>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleMailSend}
                className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">問い合わせ</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">以下の項目を入力してください。</p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.name && <p className="text-red-500 text-xs italic my-2">{errors.name}</p>}
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.email && <p className="text-red-500 text-xs italic my-2">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={messages}
                                    onChange={(e) => setMessages(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                                </textarea>
                                {errors.messages && <p className="text-red-500 text-xs italic my-2">{errors.messages}</p>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                送信
                            </button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            <span className="inline-flex">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-4 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-4 text-gray-500">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                    </svg>
                                </a>
                                <a className="ml-4 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default MailForm;