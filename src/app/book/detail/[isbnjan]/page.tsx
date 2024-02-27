import React from 'react';
import RakutenBookDetailPage from '@/app/components/rakuten/books/detail/RakutenBookDetailPage';
import { RakutenBookResponseType } from '@/app/types/types';

const RakutenBookDetail = async ({
    params
}: {
    params: { isbnjan: string }
}) => {
    const response = await fetch(`
        ${process.env.NEXT_PUBLIC_API_URL}/rakuten/book/${params.isbnjan}`,
        { cache: "no-store" } // SSR
    );
    const rakutenBookData: RakutenBookResponseType = await response.json();
    //console.log(rakutenBookData.Items[0].Item);

    return (
        <RakutenBookDetailPage book={rakutenBookData.Items[0].Item} />
    )
}

export default RakutenBookDetail