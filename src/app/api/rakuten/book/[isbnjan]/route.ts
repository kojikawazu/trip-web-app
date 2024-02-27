import { NextResponse } from "next/server";
import axios from "axios";

/**
 * 楽天ブックス商品検索APIからデータ取得
 * @param request 
 * @param param1 雑誌のISBNまたはJANコード
 * @returns 楽天ブックスデータ
 */
export async function GET(
    request: Request,
    { params }: { params: { isbnjan: string } }
) {
    const isbnjan = params.isbnjan;

    try {
        const rakuten_url = `${process.env.RAKUTEN_BOOK_API}?applicationId=${process.env.RAKUTEN_APP_ID}&isbnjan=${isbnjan}`;
        const response = await axios(`${rakuten_url}`);

        //console.log(response);
        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(err);
    }
}