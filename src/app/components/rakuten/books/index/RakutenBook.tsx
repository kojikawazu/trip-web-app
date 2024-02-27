import React from 'react';
import { RakutenBookType } from '@/app/types/types';
import { truncateString } from '@/app/utils/stringUtils';
import Image from 'next/image';

interface RakutenBookProps {
    book: RakutenBookType;
};

/**
 * 楽天ブックコンポーネント
 * @param param0 
 * @returns 
 */
const RakutenBook = ({ book }: RakutenBookProps) => {
    const trimedTitle = truncateString(book.title, 8);
    const trimedItemCaption = truncateString(book.itemCaption, 30);
    const imgW = 200;
    const imgH = 200;
    //console.log(book);

    return (
        <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
                <Image
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src={book.largeImageUrl}
                    width={imgW}
                    height={imgH}
                    layout="responsive" />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{trimedTitle}</h2>
            <p className="text-base leading-relaxed mt-2">{trimedItemCaption}</p>
            <a className="text-indigo-500 inline-flex items-center mt-3">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    );
};

export default RakutenBook;