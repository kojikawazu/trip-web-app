import RakutenBooksPage from "@/app/components/rakuten/books/index/RakutenBooksPage";
import { RakutenBookResponseType } from "@/app/types/types";

/**
 * ホームページ
 * @returns JSX
 */
export default async function HomePage() {
  const response = await fetch(`
    ${process.env.NEXT_PUBLIC_API_URL}/rakuten/books`,
    { cache: "no-store" } // SSR
  );
  const rakutenBookDatas: RakutenBookResponseType = await response.json();

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Trip
        </h2>
        <RakutenBooksPage bookArr={rakutenBookDatas} />
      </main>
    </>
  );
}
