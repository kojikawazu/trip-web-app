type UserType = {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
};

/**
 * 楽天ブックス[型]
 */
type RakutenBookType = {
    author: string;
    itemCaption: string;
    itemPrice: number;
    itemUrl: string;
    largeImageUrl: string;
    reviewAverage: number;
    title: string;
};

/**
 * 楽天ブックスレスポンスデータ[型]
 */
type RakutenBookResponseType = {
    Items: Array<{ Item: RakutenBookType }>;
};

export type {
    UserType,
    RakutenBookType,
    RakutenBookResponseType,
};