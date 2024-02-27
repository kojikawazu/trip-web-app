'use client';

import React, { useState } from 'react';
import { RakutenBookResponseType } from '@/app/types/types';
import RakutenBook from '@/app/components/rakuten/books/index/RakutenBook';

interface RakutenBooksPageProps {
    bookArr: RakutenBookResponseType;
};

/**
 * 楽天ブックスページコンポーネント
 * @param param0 
 * @returns JSX
 */
const RakutenBooksPage = ({ bookArr }: RakutenBooksPageProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // 現在のページに表示するデータの計算
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookArr.Items.slice(indexOfFirstItem, indexOfLastItem);
    const currentLength = Math.ceil(bookArr.Items.length / itemsPerPage);

    // ページ番号を変更するための関数
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col">
                    <div className="h-1 bg-gray-200 rounded overflow-hidden">
                        <div className="w-24 h-full bg-indigo-500"></div>
                    </div>
                    <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">Space The Final Frontier</h1>
                        <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Street art subway tile salvia four dollar toast bitters selfies quinoa yuccie synth meditation iPhone intelligentsia prism tofu. Viral gochujang bitters dreamcatcher.</p>
                    </div>
                </div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                    {currentItems.map(({ Item }, index) => (
                        <RakutenBook key={index} book={Item} />
                    ))}
                </div>

                {/* ページネーションコントロール */}
                <div className="pagination flex justify-center my-8">
                    {Array.from({ length: Math.ceil(bookArr.Items.length / itemsPerPage) }, (_, index) => (
                        <div className={index + 1 < currentLength ? "border-r-2" : ""}>
                            <button
                                className="mx-4 px-4"
                                key={index + 1}
                                onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RakutenBooksPage;