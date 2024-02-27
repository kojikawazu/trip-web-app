'use client';

import { RakutenBookType } from '@/app/types/types';
import React from 'react';

interface RakutenBookDetailPageProps {
    book: RakutenBookType;
};

const RakutenBookDetailPage = ({ book }: RakutenBookDetailPageProps) => {
    console.log(book);

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                    <div>
                        <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                            <img
                                src={book.largeImageUrl}
                                loading="lazy"
                                alt="Photo by Martin Sanchez"
                                className="h-full w-full object-cover object-center" />
                        </div>
                    </div>

                    <div className="md:pt-8">
                        <p className="text-center font-bold text-indigo-500 md:text-left">
                            {book.author}
                        </p>
                        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">
                            <a href={book.itemUrl}>{book.title}</a>
                        </h1>

                        <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                            {book.itemCaption}
                        </p>

                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    className={`flex-shrink-0 size-5 ${index < book.reviewAverage
                                        ? "text-yellow-400 dark:text-yellow-600"
                                        : "text-gray-300 dark:text-gray-600"
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RakutenBookDetailPage;